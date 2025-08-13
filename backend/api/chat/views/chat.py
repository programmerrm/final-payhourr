from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from chat.models import Chat
from api.chat.serializers.chat import ChatSerializer
from api.chat.serializers.attachment import AttachmentSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class FileUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        # Create a mutable dict for serializer input
        data = {}

        # Copy all non-file data (strings, ints, etc)
        for key, value in request.data.items():
            # Skip files here; files are in request.FILES
            if key not in request.FILES:
                data[key] = value

        # Add files from request.FILES explicitly
        for file_key in request.FILES:
            data[file_key] = request.FILES[file_key]

        # Add/override additional fields
        data['sender'] = request.user.id  # or request.user.pk

        receiver_username = data.get('receiver')
        if receiver_username:
            try:
                receiver_user = User.objects.get(username=receiver_username)
                data['receiver'] = receiver_user.id
            except User.DoesNotExist:
                return Response({"receiver": "User not found"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"receiver": "Receiver is required"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = AttachmentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChatList(APIView):
    def get(self, request, room_name, *args, **kwargs):
        messages = Chat.objects.filter(room_name=room_name).order_by("timestamp")
        serializer = ChatSerializer(messages, many=True)
        return Response(serializer.data)
        