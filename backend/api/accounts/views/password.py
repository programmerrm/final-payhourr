from rest_framework import status, viewsets
from rest_framework.response import Response
from permissions.or_permission import IsRegularOrAdminUser
from api.accounts.serializers.password import PasswordChangeSerializer

class PasswordChangeViewSet(viewsets.ViewSet):
    permission_classes = [IsRegularOrAdminUser]

    def update(self, request):
        serializer = PasswordChangeSerializer(data=request.data, context={'request': request})
        if not serializer.is_valid():
            return Response({
                'success': False,
                'message': 'Validation error',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        try:
            if serializer.is_valid():
                serializer.save()
                return Response({
                    'success': True,
                    'message': 'Password updated successfully'
                }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'success': False,
                'message': 'Internal Server Error',
                'errors': str(e),
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
