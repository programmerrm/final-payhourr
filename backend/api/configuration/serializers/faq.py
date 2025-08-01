from rest_framework import serializers
from configuration.models import Faq, FaqItems

class FaqItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FaqItems
        fields = '__all__'

class FaqSerializer(serializers.ModelSerializer):
    items = FaqItemsSerializer(many=True, read_only=True)

    class Meta:
        model = Faq
        fields = '__all__'
