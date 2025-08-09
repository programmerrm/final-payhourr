from rest_framework import serializers
from api.orders.serializers.user import UserSerializer
from orders.models import Order

class OrderCreateSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    receiver = UserSerializer(read_only=True)
    class Meta:
        model = Order
        fields = '__all__'

    def validate(self, attrs):
        if attrs.get('sender') == attrs.get('receiver'):
            raise serializers.ValidationError("Sender and Receiver cannot be the same user.")
        return attrs

    def create(self, validated_data):
        return Order.objects.create(**validated_data)
