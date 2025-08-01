from rest_framework.views import APIView
from rest_framework.response import Response
from chat.models import Message
from api.chat.serializers.chat import MessageSerializer

class MessageList(APIView):
    def get(self, request, *args, **kwargs):
        messages = Message.objects.all()
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
