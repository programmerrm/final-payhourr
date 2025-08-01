from rest_framework.permissions import AllowAny
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from api.configuration.serializers.seller_guide import SellerGuideSerializer
from configuration.models import SellerGuide

class SellerGuideViewSet(APIView):
    permission_classes = [AllowAny]
    parser_classes = [JSONParser]

    def get(self, request):
        instance = SellerGuide.objects.first()
        if instance:
            serializer = SellerGuideSerializer(instance)
            return Response(serializer.data)
        return Response({"detail": "No content found"}, status=204)
