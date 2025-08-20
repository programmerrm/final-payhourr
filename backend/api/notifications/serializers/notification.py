from rest_framework import serializers
from django.contrib.auth import get_user_model
from notifications.models import Notification

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'image']


class NotificationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    from_user = UserSerializer(read_only=True)
    class Meta:
        model = Notification
        fields = '__all__'
        