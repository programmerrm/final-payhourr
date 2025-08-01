from rest_framework.permissions import AllowAny
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from api.configuration.serializers.faq import FaqSerializer
from configuration.models import Faq

class FaqViewSet(APIView):
    permission_classes = [AllowAny]
    parser_classes = [JSONParser]

    def get(self, request):
        instance = Faq.objects.first()
        if instance:
            serializer = FaqSerializer(instance)
            return Response(serializer.data)
        return Response({"detail": "No content found"}, status=204)
