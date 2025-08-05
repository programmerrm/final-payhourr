from rest_framework import serializers
from chat.models import Connected
from django.contrib.auth import get_user_model
from api.accounts.serializers.users import UsersSerializer

User = get_user_model()

class ConnectedUsersSerializer(serializers.ModelSerializer):
    user = UsersSerializer()
    connected_users = UsersSerializer(many=True)

    class Meta:
        model = Connected
        fields = '__all__'
        