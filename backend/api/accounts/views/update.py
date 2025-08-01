from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer, MultiPartRenderer
from permissions.admin import IsAdminUser
from permissions.user import IsRegularUser
from django.contrib.auth import get_user_model
from api.accounts.serializers.update import UpdateUserSerializer

User = get_user_model()

class AdminUpdateUserViewSet(viewsets.ViewSet):
    permission_classes = [IsAdminUser]
    renderer_classes = [JSONRenderer, MultiPartRenderer]
    parser_classes = [JSONParser]

    def update(self, request, pk=None):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({
                'success': False,
                'message': 'User not found',
            }, status=status.HTTP_404_NOT_FOUND)
        serializer = UpdateUserSerializer(user, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response({
                'success': False,
                'message': 'Validation error',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        try:
            serializer.save()
            return Response({
                'success': True,
                'message': 'User updated successfully',
                'data': serializer.data,
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'success': False,
                'message': 'Internal Server Error',
                'errors': str(e),
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class UpdateUserViewSet(viewsets.ViewSet):
    permission_classes = [IsRegularUser]
    renderer_classes = [JSONRenderer, MultiPartRenderer]
    parser_classes = [JSONParser]

    def update(self, request, pk=None):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({
                'success': False,
                'message': 'User not found',
            }, status=status.HTTP_404_NOT_FOUND)
        serializer = UpdateUserSerializer(user, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response({
                'success': False,
                'message': 'Validation error',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        try:
            serializer.save()
            return Response({
                'success': True,
                'message': 'User updated successfully',
                'data': serializer.data,
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'success': False,
                'message': 'Internal Server Error',
                'errors': str(e),
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        