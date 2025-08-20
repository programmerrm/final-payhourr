from django.urls import path
from app.consumers import OnlineStatusConsumer
from chat.consumers import ChatConsumer, NotificationConsumer

websocket_urlpatterns = [
    path("ws/online-status/", OnlineStatusConsumer.as_asgi()),
    path("ws/chat/<str:room_name>/", ChatConsumer.as_asgi()),
    path("ws/notifications/<int:user_id>/", NotificationConsumer.as_asgi()),
]
