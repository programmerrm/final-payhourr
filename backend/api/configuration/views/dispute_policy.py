from rest_framework.permissions import AllowAny
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from api.configuration.serializers.dispute_policy import DisputePolicySerializer
from configuration.models import DisputePolicy

class DisputePolicyViewSet(APIView):
    permission_classes = [AllowAny]
    parser_classes = [JSONParser]

    def get(self, request):
        instance = DisputePolicy.objects.first()
        if instance:
            serializer = DisputePolicySerializer(instance)
            return Response(serializer.data)
        return Response({"detail": "No content found"}, status=204)
