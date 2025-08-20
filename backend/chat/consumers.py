import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from chat.models import Chat
from notifications.models import Notification

User = get_user_model()

class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user_id = self.scope['url_route']['kwargs']['user_id']
        self.group_name = f'user_{self.user_id}'

        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def send_notification(self, event):
        message = event.get('message')
        request_id = event.get('request_id')
        await self.send(text_data=json.dumps({
            'type': 'new',
            'request_id': request_id,
            'message': message
        }))

    async def remove_notification(self, event):
        request_id = event.get('request_id')
        await self.send(text_data=json.dumps({
            'type': 'remove',
            'request_id': request_id
        }))

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data_json = json.loads(text_data)
        message = data_json.get('message')
        sender_data = data_json.get('sender', {})
        receiver_data = data_json.get('receiver', {})
        sender_username = sender_data.get('username')
        receiver_username = receiver_data.get('username')
        receiver_id = receiver_data.get('id')
        message_id = data_json.get('id')

        # Save message to DB
        await self.save_message(
            sender_username=sender_username,
            receiver_username=receiver_username,
            content=message,
            room_name=self.room_name
        )

        # Broadcast chat message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': json.dumps({
                    'id': message_id,
                    'sender': sender_data,
                    'receiver': receiver_data,
                    'message': message,
                    'room': self.room_name,
                })
            }
        )

        # Send notification to the receiver
        await self.send_chat_notification(receiver_id, sender_username, message)

    async def chat_message(self, event):
        await self.send(text_data=event['message'])

    async def send_chat_notification(self, receiver_id, sender_username, message):
        if not receiver_id:
            return

        # Save Notification in DB
        await self.save_notification(receiver_id, sender_username, message)

        # Send via WebSocket
        channel_layer = get_channel_layer()
        await channel_layer.group_send(
            f'user_{receiver_id}',
            {
                'type': 'send_notification',
                'message': f'New message from {sender_username}: {message[:50]}',
            }
        )

    @database_sync_to_async
    def save_message(self, sender_username, receiver_username, content, room_name):
        try:
            sender = User.objects.get(username=sender_username)
            receiver = User.objects.get(username=receiver_username)
            Chat.objects.create(
                room_name=room_name,
                sender=sender,
                receiver=receiver,
                content=content
            )
        except:
            pass

    @database_sync_to_async
    def save_notification(self, receiver_id, sender_username, message):
        try:
            receiver = User.objects.get(id=receiver_id)
            Notification.objects.create(
                user=receiver,
                notification_type=Notification.NotificationType.MESSAGE,
                message=f"New message from {sender_username}: {message[:50]}",
                url=f"/chat/{receiver.username}/"
            )
        except:
            pass
