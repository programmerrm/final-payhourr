"""
User Logout View
"""
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from accounts.models import BlockedToken

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get('refresh_token')
        if not refresh_token:
            return Response({
                'success': False,
                'message': 'Refresh token must need user logout',
                'errors': 'Refresh token is required'
            }, status=status.HTTP_400_BAD_REQUEST)
        try:
            BlockedToken.objects.create(token=refresh_token)
            try:
                token = RefreshToken()
                token.blacklist()
            except Exception as e:
                return Response({
                    'success': False,
                    'message': '',
                    'errors': str(e),
                }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({
                'success': False,
                'message': 'Server error',
                'errors': str(e),
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
