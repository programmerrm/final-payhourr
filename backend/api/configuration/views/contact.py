from rest_framework.permissions import AllowAny
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from api.configuration.serializers.contact import ContactSerializer
from configuration.models import Contact

class ContactViewSet(APIView):
    permission_classes = [AllowAny]
    parser_classes = [JSONParser]

    def get(self, request):
        instance = Contact.objects.first()
        if instance:
            serializer = ContactSerializer(instance)
            return Response(serializer.data)
        return Response({"detail": "No content found"}, status=204)
