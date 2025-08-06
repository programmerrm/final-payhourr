from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['password']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'user_id', 'email', 'username']
        