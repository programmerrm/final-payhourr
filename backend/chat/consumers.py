import json
import logging
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist

# Setup logging
logger = logging.getLogger(__name__)

# User model
User = get_user_model()

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Authentication check for user before allowing the connection
        user = self.scope.get('user')
        if not user.is_authenticated:
            await self.close()
            return

        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'

        # Join the room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave the room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        try:
            # Parse message data
            text_data_json = json.loads(text_data)
            message = text_data_json['message']
            action = text_data_json.get('action', None)  # For actions like add/remove user
            
            # If user wants to add admin
            if action == 'add_admin':
                user_id = text_data_json.get('user_id')
                success = await self.add_admin_to_group(user_id)
                if not success:
                    await self.send(text_data=json.dumps({'error': 'User is not an admin or does not exist.'}))
            else:
                # Send message to room group
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        'type': 'chat_message',
                        'message': message
                    }
                )
        except json.JSONDecodeError as e:
            logger.error(f"Invalid message format: {e}")
            await self.send(text_data=json.dumps({'error': 'Invalid message format.'}))
        except Exception as e:
            logger.error(f"Error processing message: {e}")
            await self.send(text_data=json.dumps({'error': 'An error occurred while processing the message.'}))

    @database_sync_to_async
    def add_admin_to_group(self, user_id):
        try:
            user = User.objects.get(id=user_id)

            # Check if the user is an admin
            if user.role == 'admin':
                self.channel_layer.group_add(self.room_group_name, self.channel_name)
                return True
            else:
                logger.warning(f"User with ID {user_id} is not an admin.")
                return False
        except ObjectDoesNotExist:
            logger.warning(f"User with ID {user_id} does not exist.")
            return False
        except Exception as e:
            logger.error(f"Error adding user with ID {user_id} to group: {e}")
            return False

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))
