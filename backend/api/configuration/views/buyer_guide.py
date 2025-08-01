from rest_framework.permissions import AllowAny
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from api.configuration.serializers.buyer_guide import BuyerGuideSerializer
from configuration.models import BuyerGuide

class BuyerGuideViewSet(APIView):
    permission_classes = [AllowAny]
    parser_classes = [JSONParser]

    def get(self, request):
        instance = BuyerGuide.objects.first()
        if instance:
            serializer = BuyerGuideSerializer(instance)
            return Response(serializer.data)
        return Response({"detail": "No content found"}, status=204)
