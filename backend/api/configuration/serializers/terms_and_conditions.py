from rest_framework import serializers
from configuration.models import TermsAndConditions, TermsAndConditionsItems

class TermsAndConditionsItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TermsAndConditionsItems
        fields = '__all__'

class TermsAndConditionsSerializer(serializers.ModelSerializer):
    items = TermsAndConditionsItemsSerializer(many=True, read_only=True)

    class Meta:
        model = TermsAndConditions
        fields = '__all__'
