from rest_framework.permissions import AllowAny
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from api.configuration.serializers.privacy_policy import PrivacyPolicySerializer
from configuration.models import PrivacyPolicy

class PrivacyPolicyViewSet(APIView):
    permission_classes = [AllowAny]
    parser_classes = [JSONParser]

    def get(self, request):
        instance = PrivacyPolicy.objects.first()
        if instance:
            serializer = PrivacyPolicySerializer(instance)
            return Response(serializer.data)
        return Response({"detail": "No content found"}, status=204)
