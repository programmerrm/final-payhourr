from rest_framework import serializers
from configuration.models import WhyUsePayhourr, WhyUsePayhourrItems

class WhyUsePayhourrItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhyUsePayhourrItems
        fields = '__all__'

class WhyUsePayhourrSerializer(serializers.ModelSerializer):
    items = WhyUsePayhourrItemsSerializer(many=True, read_only=True)

    class Meta:
        model = WhyUsePayhourr
        fields = '__all__'
