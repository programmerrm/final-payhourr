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

        print(f"[CONNECT] User connected to room: {self.room_name}")

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        print(f"[DISCONNECT] User disconnected from room: {self.room_name}")
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        print(f"[RECEIVE] Raw data received: {text_data}")
        data_json = json.loads(text_data)
        print(f"[RECEIVE] Parsed data: {data_json}")

        message = data_json.get('message')
        sender_data = data_json.get('sender', {})
        receiver_data = data_json.get('receiver', {})
        sender_username = sender_data.get('username')
        receiver_username = receiver_data.get('username')
        message_id = data_json.get('id')

        # Save message to DB
        await self.save_message(
            sender_username=sender_username,
            receiver_username=receiver_username,
            content=message,
            room_name=self.room_name
        )

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

    async def chat_message(self, event):
        print(f"[CHAT MESSAGE] Sending message to WebSocket: {event['message']}")
        await self.send(text_data=event['message'])

    @database_sync_to_async
    def save_message(self, sender_username, receiver_username, content, room_name):
        try:
            sender = User.objects.get(username=sender_username)
            receiver = User.objects.get(username=receiver_username)
            chat = Chat.objects.create(
                room_name=room_name,
                sender=sender,
                receiver=receiver,
                content=content
            )
            print(f"[DB] Message saved: {chat}")
        except User.DoesNotExist:
            print(f"[ERROR] Sender or receiver not found: {sender_username}, {receiver_username}")
        except Exception as e:
            print(f"[ERROR] Failed to save message: {e}")
