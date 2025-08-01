from rest_framework import serializers
from configuration.models import TermsOfService, TermsOfServiceItems

class TermsOfServiceItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TermsOfServiceItems
        fields = '__all__'

class TermsOfServiceSerializer(serializers.ModelSerializer):
    items = TermsOfServiceItemsSerializer(many=True, read_only=True)

    class Meta:
        model = TermsOfService
        fields = '__all__'
