from rest_framework import serializers
from api.orders.serializers.user import UserSerializer
from orders.models import Order
from django.contrib.auth import get_user_model

User = get_user_model()

class OrderCreateSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    receiver = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True)
    receiver_user = UserSerializer(source='receiver', read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def validate(self, attrs):
        sender = self.context['request'].user
        receiver = attrs.get('receiver')

        if sender == receiver:
            raise serializers.ValidationError("Sender and Receiver cannot be the same user.")

        existing_pending_order = Order.objects.filter(
            sender=sender,
            receiver=receiver,
            status='pending'
        ).exists()

        if existing_pending_order:
            raise serializers.ValidationError(
                "You already have a pending order with this receiver. Complete or cancel it before creating a new one."
            )

        return attrs

    def create(self, validated_data):
        validated_data['sender'] = self.context['request'].user
        return Order.objects.create(**validated_data)
