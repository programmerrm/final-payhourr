from rest_framework.permissions import AllowAny
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from api.configuration.serializers.what_is_payhourr import WhatIsPayhourrSerializer
from configuration.models import WhatIsPayhourr

class WhatIsPayhourrViewSet(APIView):
    permission_classes = [AllowAny]
    parser_classes = [JSONParser]

    def get(self, request):
        instance = WhatIsPayhourr.objects.first()
        if instance:
            serializer = WhatIsPayhourrSerializer(instance)
            return Response(serializer.data)
        return Response({"detail": "No content found"}, status=204)
