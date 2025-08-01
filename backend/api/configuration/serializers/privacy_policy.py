from rest_framework import serializers
from configuration.models import PrivacyPolicy, PrivacyPolicyItems

class PrivacyPolicyItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrivacyPolicyItems
        fields = '__all__'

class PrivacyPolicySerializer(serializers.ModelSerializer):
    items = PrivacyPolicyItemsSerializer(many=True, read_only=True)

    class Meta:
        model = PrivacyPolicy
        fields = '__all__'
