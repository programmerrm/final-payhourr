from rest_framework import serializers
from chat.models import Chat

class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ['attachment', 'sender', 'receiver']
        