from rest_framework.permissions import AllowAny
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from api.configuration.serializers.our_mission import OurMissionSerializer
from configuration.models import OurMission

class OurMissionViewSet(APIView):
    permission_classes = [AllowAny]
    parser_classes = [JSONParser]

    def get(self, request):
        instance = OurMission.objects.first()
        if instance:
            serializer = OurMissionSerializer(instance)
            return Response(serializer.data)
        return Response({"detail": "No content found"}, status=204)
