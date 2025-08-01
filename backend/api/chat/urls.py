from django.urls import path
from api.chat.views.chat import MessageList

urlpatterns = [
    path('messages/', MessageList.as_view(), name='message_list'),
]
