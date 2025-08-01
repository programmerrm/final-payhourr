from rest_framework.permissions import AllowAny
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from api.configuration.serializers.secure_payment_process import SecurePaymentProcessSerializer
from configuration.models import SecurePaymentProcess

class SecurePaymentProcessViewSet(APIView):
    permission_classes = [AllowAny]
    parser_classes = [JSONParser]

    def get(self, request):
        instance = SecurePaymentProcess.objects.first()
        if instance:
            serializer = SecurePaymentProcessSerializer(instance)
            return Response(serializer.data)
        return Response({"detail": "No content found"}, status=204)
