from django.db import transaction
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.contrib.auth import get_user_model
from orders.models import Order
from chat.models import Chat
from notifications.models import Notification
from orders.services.unique_order_id import UNIQUE_ORDER_ID_GENERATE
from orders.tasks import send_order_created_email
from django.conf import settings

User = get_user_model()
channel_layer = get_channel_layer()

# ============================
# Unique Order ID Generate
# ============================
@receiver(pre_save, sender=Order)
def set_unique_order_id(sender, instance, **kwargs):
    if not instance.order_id:
        instance.order_id = UNIQUE_ORDER_ID_GENERATE()

# ============================
# Helper - Dynamic Room Name
# ============================
def get_room_name(order: Order) -> str:
    """
    Always keep room_name format as seller_buyer
    """
    return f"{order.receiver.username}_{order.sender.username}"

# ============================
# Chat Messages on Order Create
# ============================
@receiver(post_save, sender=Order)
def create_order_chat_message(sender, instance, created, **kwargs):
    if created:
        room_name = get_room_name(instance)

        delivery_time_str = (
            instance.delivery_time.strftime('%Y-%m-%d %H:%M')
            if hasattr(instance.delivery_time, "strftime") and instance.delivery_time
            else str(instance.delivery_time) if instance.delivery_time else "N/A"
        )

        order_msg = f"""
            <div>
                <h1><strong>You Have New Order</strong></h1>
                <p><strong>Title:</strong> {instance.title or 'N/A'}</p>
                <p><strong>Requirement:</strong> {instance.requirement or 'N/A'}</p>
                <p><strong>Amount:</strong> {instance.amount}</p>
                <p><strong>Delivery Time:</strong> {delivery_time_str}</p>
                {f"<p><strong>Reference File:</strong> <a href='{settings.BACKEND_DOMAIN}{instance.reference_file.url}' target='_blank'>Download</a></p>" if instance.reference_file else ""}
            </div>
        """

        Chat.objects.create(
            room_name=room_name,
            sender=instance.sender,
            receiver=instance.receiver,
            content=order_msg,
            order=instance,
        )

# ============================
# Email on Order Create
# ============================
@receiver(post_save, sender=Order)
def send_email_on_order_create(sender, instance, created, **kwargs):
    if created:
        transaction.on_commit(
            lambda: send_order_created_email.delay(instance.id)
        )

# ============================
# Notification Helper
# ============================
def notify_user(user, from_user, order, message, notif_type, url):
    """Create notification + send websocket event"""
    Notification.objects.create(
        user=user,
        from_user=from_user,
        notification_type=notif_type,
        message=message,
        related_object_id=order.id,
        url=url
    )

    async_to_sync(channel_layer.group_send)(
        f"user_{user.id}",
        {
            "type": "send_notification",
            "request_id": order.id,
            "message": message,
        }
    )

# ============================
# Notifications based on Status
# ============================
@receiver(post_save, sender=Order)
def order_notifications(sender, instance, created, **kwargs):
    sender_user = instance.sender
    receiver_user = instance.receiver
    admins = User.objects.filter(role="admin")

    if created and instance.status == "pending":
        msg = f"New order created by {sender_user.username}: {instance.title}"
        url = f"/dashboard/{receiver_user.username}/order/{instance.id}/"

        # Seller notification
        notify_user(
            receiver_user, sender_user, instance, msg,
            Notification.NotificationType.ORDER_CREATED, url
        )

        # Admin notifications
        for admin in admins:
            notify_user(
                admin, sender_user, instance, msg,
                Notification.NotificationType.ORDER_CREATED,
                f"/dashboard/{admin.username}/orders/{instance.id}/"
            )

    # 🔴 Order Cancelled
    elif not created and instance.status == "cancelled":
        msg = f"Order cancelled: {instance.title}"
        url = f"/dashboard/{receiver_user.username}/order/{instance.id}/"

        notify_user(
            receiver_user, sender_user, instance, msg,
            Notification.NotificationType.ORDER_CANCELLED, url
        )

        for admin in admins:
            notify_user(
                admin, sender_user, instance, msg,
                Notification.NotificationType.ORDER_CANCELLED,
                f"/dashboard/{admin.username}/orders/{instance.id}/"
            )

    # ✅ Order Completed
    elif not created and instance.status == "completed":
        msg = f"Order completed: {instance.title}"
        url = f"/dashboard/{receiver_user.username}/order/{instance.id}/"

        notify_user(
            receiver_user, sender_user, instance, msg,
            Notification.NotificationType.ORDER_COMPLETED, url
        )

        for admin in admins:
            notify_user(
                admin, sender_user, instance, msg,
                Notification.NotificationType.ORDER_COMPLETED,
                f"/dashboard/{admin.username}/work-completed-pending-approvals/{instance.id}/"
            )
