from rest_framework import serializers
from configuration.models import DisputePolicy, DisputePolicyItems

class DisputePolicyItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DisputePolicyItems
        fields = '__all__'

class DisputePolicySerializer(serializers.ModelSerializer):
    items = DisputePolicyItemsSerializer(many=True, read_only=True)

    class Meta:
        model = DisputePolicy
        fields = '__all__'
