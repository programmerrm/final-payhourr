from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from chat.models import ConnectionRequest, Connected, Dispute
from notifications.models import Notification

User = get_user_model()

# ===============================
# ConnectionRequest Signal
# ===============================
@receiver(post_save, sender=ConnectionRequest)
def send_connection_notification(sender, instance, created, **kwargs):
    channel_layer = get_channel_layer()
    sender_user = instance.sender
    receiver_user = instance.receiver
    sender_group = f"user_{sender_user.id}"
    receiver_group = f"user_{receiver_user.id}"

    if instance.accepted:
        sender_connected, _ = Connected.objects.get_or_create(user=sender_user)
        receiver_connected, _ = Connected.objects.get_or_create(user=receiver_user)
        sender_connected.connected_users.add(receiver_user)
        receiver_connected.connected_users.add(sender_user)

        async_to_sync(channel_layer.group_send)(
            receiver_group,
            {
                "type": "remove_notification",
                "request_id": instance.id,
            }
        )

        Notification.objects.filter(
            user=receiver_user,
            from_user=sender_user,
            related_object_id=instance.id,
            notification_type=Notification.NotificationType.CONNECTION_REQUEST
        ).delete()

        if sender_user.role == "buyer":
            url = f"/dashboard/{sender_user.username}/my-connected-seller/"
        else:
            url = f"/dashboard/{sender_user.username}/my-connected-buyer/"

        Notification.objects.create(
            user=sender_user,
            from_user=receiver_user,
            notification_type=Notification.NotificationType.CONNECTION_ACCEPTED,
            message=f"{receiver_user.username} accepted your connection request.",
            related_object_id=instance.id,
            url=url
        )

        async_to_sync(channel_layer.group_send)(
            sender_group,
            {
                "type": "send_notification",
                "request_id": instance.id,
                "message": f"{receiver_user.username} accepted your connection request.",
            }
        )
        return

    if created and not instance.is_read:
        Notification.objects.create(
            user=receiver_user,
            from_user=sender_user,
            notification_type=Notification.NotificationType.CONNECTION_REQUEST,
            message=f"{sender_user.username} sent you a connection request.",
            related_object_id=instance.id,
            url=f"/dashboard/{receiver_user.username}/incoming-connection-requests/"
        )

        async_to_sync(channel_layer.group_send)(
            receiver_group,
            {
                "type": "send_notification",
                "request_id": instance.id,
                "message": f"{sender_user.username} sent you a connection request.",
            }
        )

@receiver(post_save, sender=Dispute)
def send_dispute_notification(sender, instance, created, **kwargs):
    if not created:
        return

    channel_layer = get_channel_layer()
    raised_by = instance.raised_by

    # ====================
    # 1. Admin Notification
    # ====================
    if instance.admin:
        admins = [instance.admin]
    else:
        admins = User.objects.filter(role="admin")

    for admin in admins:
        admin_group = f"user_{admin.id}"

        Notification.objects.create(
            user=admin,
            from_user=raised_by,
            notification_type=Notification.NotificationType.DISPUTE,
            message=f"{raised_by.username} raised a dispute: {instance.title}",
            related_object_id=instance.id,
            url=f"/dashboard/{admin.username}/dispute-managment/"
        )

        async_to_sync(channel_layer.group_send)(
            admin_group,
            {
                "type": "send_notification",
                "request_id": instance.id,
                "message": f"{raised_by.username} raised a dispute: {instance.title}",
            }
        )

    # =========================
    # 2. Against User Notification
    # =========================
    if instance.against_user:
        against_user = instance.against_user
        against_group = f"user_{against_user.id}"

        Notification.objects.create(
            user=against_user,
            from_user=raised_by,
            notification_type=Notification.NotificationType.DISPUTE,
            message=f"{raised_by.username} raised a dispute against you: {instance.title}",
            related_object_id=instance.id,
            url=f"/dashboard/{against_user.username}/dispute/"
        )

        async_to_sync(channel_layer.group_send)(
            against_group,
            {
                "type": "send_notification",
                "request_id": instance.id,
                "message": f"{raised_by.username} raised a dispute against you: {instance.title}",
            }
        )
