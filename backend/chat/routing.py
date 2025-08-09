from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path("ws/chat/<str:room_name>/", consumers.ChatConsumer.as_asgi()),
    path("ws/notifications/<int:user_id>/", consumers.NotificationConsumer.as_asgi()),
]
