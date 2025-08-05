from channels.generic.websocket import AsyncWebsocketConsumer
import json
from django.contrib.auth import get_user_model
from .models import Chat
from channels.db import database_sync_to_async

User = get_user_model()

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()
        print(f"[CONNECT] User connected to room: {self.room_name}")

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        print(f"[DISCONNECT] User disconnected from room: {self.room_name}")

    async def receive(self, text_data):
        print(f"[RECEIVE] Message received in room {self.room_name}: {text_data}")
        data_json = json.loads(text_data)
        message = data_json.get('message')
        sender_username = data_json.get('sender')
        receiver_username = data_json.get('receiver')

        await self.save_message(sender_username, receiver_username, message)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': json.dumps({
                    'sender': sender_username,
                    'message': message,
                    'room': self.room_name,
                })
            }
        )

    async def chat_message(self, event):
        await self.send(text_data=event['message'])

    @database_sync_to_async
    def save_message(self, sender_username, receiver_username, message):
        try:
            sender = User.objects.get(username=sender_username)
            receiver = User.objects.get(username=receiver_username)
            Chat.objects.create(sender=sender, receiver=receiver, content=message)
        except User.DoesNotExist:
            print("Sender or receiver does not exist")
