from rest_framework import serializers
from configuration.models import OurMission

class OurMissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = OurMission
        fields = '__all__'
