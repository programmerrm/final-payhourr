from rest_framework import serializers
from configuration.models import RefundPolicy, RefundPolicyItems

class RefundPolicyItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = RefundPolicyItems
        fields = '__all__'

class RefundPolicySerializer(serializers.ModelSerializer):
    items = RefundPolicyItemsSerializer(many=True, read_only=True)

    class Meta:
        model = RefundPolicy
        fields = '__all__'
