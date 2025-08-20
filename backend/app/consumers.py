# app/consumers.py
import json
from channels.generic.websocket import AsyncWebsocketConsumer

online_users = set()

class OnlineStatusConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        user = self.scope["user"]
        print("WebSocket connect, user:", user)

        if user.is_authenticated:
            online_users.add(user.username)

        await self.accept()
        await self.send_online_users()

    async def disconnect(self, close_code):
        user = self.scope["user"]
        print("WebSocket disconnect, user:", user)

        if user.is_authenticated and user.username in online_users:
            online_users.remove(user.username)

    async def send_online_users(self):
        await self.send(text_data=json.dumps({"online_users": list(online_users)}))
