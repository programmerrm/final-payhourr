from rest_framework.permissions import AllowAny
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from api.configuration.serializers.refund_policy import RefundPolicySerializer
from configuration.models import RefundPolicy

class RefundPolicyViewSet(APIView):
    permission_classes = [AllowAny]
    parser_classes = [JSONParser]

    def get(self, request):
        instance = RefundPolicy.objects.first()
        if instance:
            serializer = RefundPolicySerializer(instance)
            return Response(serializer.data)
        return Response({"detail": "No content found"}, status=204)
