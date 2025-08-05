from rest_framework import serializers
from chat.models import Chat
from api.accounts.serializers.users import UserSerializer

class ChatSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    receiver = UserSerializer(read_only=True)
    class Meta:
        model = Chat
        fields = '__all__'
