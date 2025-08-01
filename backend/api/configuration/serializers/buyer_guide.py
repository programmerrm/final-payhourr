from rest_framework import serializers
from configuration.models import BuyerGuide, BuyerGuideItems

class BuyerGuideItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuyerGuideItems
        fields = '__all__'

class BuyerGuideSerializer(serializers.ModelSerializer):
    items = BuyerGuideItemsSerializer(many=True, read_only=True)

    class Meta:
        model = BuyerGuide
        fields = '__all__'
