from rest_framework import serializers
from configuration.models import SellerGuide, SellerGuideItems

class SellerGuideItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellerGuideItems
        fields = '__all__'

class SellerGuideSerializer(serializers.ModelSerializer):
    items = SellerGuideItemsSerializer(many=True, read_only=True)

    class Meta:
        model = SellerGuide
        fields = '__all__'
