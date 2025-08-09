from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.db.models.signals import post_save
from django.dispatch import receiver
from chat.models import ConnectionRequest

@receiver(post_save, sender=ConnectionRequest)
def send_connection_notification(sender, instance, created, **kwargs):
    if instance.accepted:
        channel_layer = get_channel_layer()

        async_to_sync(channel_layer.group_send)(
            f'user_{instance.sender.id}',
            {
                'type': 'send_notification',
                'message': f'{instance.receiver} accepted your connection request.',
            }
        )

        async_to_sync(channel_layer.group_send)(
            f'user_{instance.receiver.id}',
            {
                'type': 'send_notification',
                'message': f'You are now connected with {instance.sender}.',
            }
        )
