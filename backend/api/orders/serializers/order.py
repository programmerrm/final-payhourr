from rest_framework import serializers
from api.orders.serializers.user import UserSerializer
from orders.models import Order

class OrderSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    receiver = UserSerializer(read_only=True)
    class Meta:
        model = Order
        fields = '__all__'
        