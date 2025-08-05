from rest_framework import serializers
from chat.models import ConnectionRequest
from django.contrib.auth import get_user_model
from api.accounts.serializers.users import UsersSerializer

User = get_user_model()

class ConnectionRequestSerializer(serializers.ModelSerializer):
    sender = UsersSerializer(read_only=True)
    receiver = UsersSerializer(read_only=True)

    class Meta:
        model = ConnectionRequest
        fields = '__all__'
