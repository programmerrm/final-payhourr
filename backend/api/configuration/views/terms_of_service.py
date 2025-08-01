from rest_framework.permissions import AllowAny
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from api.configuration.serializers.terms_of_service import TermsOfServiceSerializer
from configuration.models import TermsOfService

class TermsOfServiceViewSet(APIView):
    permission_classes = [AllowAny]
    parser_classes = [JSONParser]

    def get(self, request):
        instance = TermsOfService.objects.first()
        if instance:
            serializer = TermsOfServiceSerializer(instance)
            return Response(serializer.data)
        return Response({"detail": "No content found"}, status=204)
