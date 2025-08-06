from rest_framework import serializers
from accounts.models import Rating
from api.accounts.serializers.users import UserSerializer
from django.contrib.auth import get_user_model
User = get_user_model()

class RatingSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    user = UserSerializer(read_only=True)
    username = serializers.SlugRelatedField(
        slug_field='username',
        queryset=User.objects.all(),
        write_only=True,
        source='user'
    )

    class Meta:
        model = Rating
        fields = ['username', 'rate', 'description', 'sender', 'user', 'created_at']
