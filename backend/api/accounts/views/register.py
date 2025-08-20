from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser, MultiPartParser
from rest_framework.permissions import AllowAny
from api.accounts.serializers.register import RegisterSerializer

class RegisterViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]
    parser_classes = [JSONParser, MultiPartParser]
    renderer_classes = [JSONRenderer]

    def create(self, request, *args, **kwargs):
        if not request.data:
            return Response({
                'success': False,
                'message': 'No data provided',
            }, status=status.HTTP_400_BAD_REQUEST)

        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({
                'success': True,
                'message': 'Registered successfully',
                'data': serializer.data,
            }, status=status.HTTP_201_CREATED)

        return Response({
            'success': False,
            'message': 'Validation errors',
            'errors': serializer.errors,
        }, status=status.HTTP_400_BAD_REQUEST)
