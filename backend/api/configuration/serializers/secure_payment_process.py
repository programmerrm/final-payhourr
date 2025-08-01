from rest_framework import serializers
from configuration.models import SecurePaymentProcess, SecurePaymentProcessItems

class SecurePaymentProcessItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SecurePaymentProcessItems
        fields = '__all__'

class SecurePaymentProcessSerializer(serializers.ModelSerializer):
    items = SecurePaymentProcessItemsSerializer(many=True, read_only=True)

    class Meta:
        model = SecurePaymentProcess
        fields = '__all__'
