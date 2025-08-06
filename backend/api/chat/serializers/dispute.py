from rest_framework import serializers
from chat.models import Dispute
from api.accounts.serializers.users import UserSerializer

class DisputeSerializer(serializers.ModelSerializer):
    raised_by = UserSerializer(read_only=True)
    against_user = UserSerializer(read_only=True)
    admin = UserSerializer(read_only=True)
    
    class Meta:
        model = Dispute
        fields = '__all__'
        read_only_fields = ['raised_by', 'against_user', 'status', 'created_at', 'admin']
