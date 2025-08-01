from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from permissions.admin import IsAdminUser
from permissions.or_permission import IsRegularOrAdminUser
from django.contrib.auth import get_user_model

User = get_user_model()

class AdminAllUserDeleteViewSet(viewsets.ViewSet):
    permission_classes = [IsAdminUser]
    parser_classes = [JSONParser]

    def delete(self, request, *args, **kwargs):
        try:
            users_to_delete = User.objects.exclude(role='admin')
            deleted_count, _ = users_to_delete.delete()
            return Response({
                'success': True,
                'message': f'{deleted_count} users deleted successfully'
            }, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({
                'success': False,
                'message': 'An error occurred while deleting users',
                'errors': str(e),
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AdminUsersDeleteViewSet(viewsets.ViewSet):
    permission_classes = [IsAdminUser]
    parser_classes = [JSONParser]

    def delete(self, request, *args, **kwargs):
        ids = request.query_params.get('ids', '')
        ids_list = ids.split(',')

        if not ids_list:
            return Response({
                'success': False,
                'message': 'No user IDs provided'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            users_to_delete = User.objects.filter(id__in=ids_list).exclude(role='admin')
            deleted_count, _ = users_to_delete.delete()

            if deleted_count:
                return Response({
                    'success': True,
                    'message': f'{deleted_count} users deleted successfully'
                }, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({
                    'success': False,
                    'message': 'No users found for the provided IDs'
                }, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({
                'success': False,
                'message': 'Internal Server Error',
                'errors': str(e),
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserDeleteViewSet(viewsets.ViewSet):
    permission_classes = [IsRegularOrAdminUser]
    parser_classes = [JSONParser]

    def delete(self, request, pk=None):
        try:
            user = User.objects.get(pk=pk)
            user.delete()
            return Response({
                'success': True,
                'message': 'User deleted successfully',
            }, status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response({
                'success': False,
                'message': 'User not found',
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({
                'success': False,
                'message': 'An error occurred while deleting the user',
                'errors': str(e),
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        