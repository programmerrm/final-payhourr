from rest_framework.permissions import AllowAny
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from api.configuration.serializers.why_use_payhourr import WhyUsePayhourrSerializer
from configuration.models import WhyUsePayhourr

class WhyUsePayhourrViewSet(APIView):
    permission_classes = [AllowAny]
    parser_classes = [JSONParser]

    def get(self, request):
        instance = WhyUsePayhourr.objects.first()
        if instance:
            serializer = WhyUsePayhourrSerializer(instance)
            return Response(serializer.data)
        return Response({"detail": "No content found"}, status=204)
