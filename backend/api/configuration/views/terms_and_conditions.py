from rest_framework.permissions import AllowAny
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from api.configuration.serializers.terms_and_conditions import TermsAndConditionsSerializer
from configuration.models import TermsAndConditions

class TermsAndConditionsViewSet(APIView):
    permission_classes = [AllowAny]
    parser_classes = [JSONParser]

    def get(self, request):
        instance = TermsAndConditions.objects.first()
        if instance:
            serializer = TermsAndConditionsSerializer(instance)
            return Response(serializer.data)
        return Response({"detail": "No content found"}, status=204)
