from rest_framework.response import Response
from rest_framework import status, viewsets
from orders.models import Order
from permissions.user import IsSellerOrBuyer
from api.orders.serializers.order import OrderSerializer

class ReceiverOrderViewSet(viewsets.ViewSet):
    permission_classes = [IsSellerOrBuyer]

    def list(self, request):
        user = request.user
        receiver_id = request.query_params.get('receiver')

        queryset = Order.objects.filter(sender=user).order_by('-created_at')
        if receiver_id:
            queryset = queryset.filter(receiver__id=receiver_id)

        latest_order = queryset.first()
        data = OrderSerializer(latest_order).data if latest_order else None

        if data:
            return Response({
                "success": True,
                "message": "Latest order fetched successfully" if latest_order else "No order found",
                "data": data
            }, status=status.HTTP_200_OK)
        return Response({
            'success': True,
            'message': 'No data found',
        }, status=status.HTTP_200_OK)
    
