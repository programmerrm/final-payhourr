from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer
from rest_framework.permissions import AllowAny
from accounts.services.jwt_token import JWT_TOKEN
from api.accounts.serializers.login import LoginSerializer

class LoginViewSet(APIView):
    permission_classes = [AllowAny]
    parser_classes = [JSONParser]
    renderer_classes = [JSONRenderer]

    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data, context={'request': request})
        
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token = JWT_TOKEN(user)
            user_data = {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'role': user.role,
                'image': user.image.url if hasattr(user, 'image') and user.image else None,
            }
            return Response({
                'success': True,
                'message': 'User logged in successfully.',
                'data': {
                    'user': user_data,
                    'tokens': token,
                }
            }, status=status.HTTP_200_OK)
        
        return Response({
            'success': False,
            'message': 'Login failed. Please check the input.',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    