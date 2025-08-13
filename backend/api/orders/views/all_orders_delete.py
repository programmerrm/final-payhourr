from rest_framework import viewsets, status
from rest_framework.response import Response
from permissions.admin import IsAdminUser
from orders.models import Order

class AllOrdersDeleteViewSet(viewsets.ViewSet):
    permission_classes = [IsAdminUser]

    def destroy_all(self, request):
        deleted_count, _ = Order.objects.all().delete()
        return Response({
            'success': True,
            'message': f'{deleted_count} orders deleted.',
        }, status=status.HTTP_200_OK)

    