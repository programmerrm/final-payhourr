from rest_framework.views import APIView
from rest_framework.response import Response
from chat.models import Chat
from api.chat.serializers.chat import ChatSerializer
from django.db.models import Q

class ChatList(APIView):
    def get(self, request, room_name, *args, **kwargs):
        participants = room_name.split("__")
        if len(participants) != 2:
            return Response({"error": "Invalid room name"}, status=400)

        user1, user2 = participants

        messages = Chat.objects.filter(
            Q(sender__username=user1, receiver__username=user2) |
            Q(sender__username=user2, receiver__username=user1)
        ).order_by("timestamp")  # Order by time ascending

        serializer = ChatSerializer(messages, many=True)
        return Response(serializer.data)

