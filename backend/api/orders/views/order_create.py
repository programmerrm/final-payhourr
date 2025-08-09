from rest_framework import viewsets, status
from rest_framework.response import Response
from permissions.user import IsSellerOrBuyer
from api.orders.serializers.order_create import OrderCreateSerializer

class OrderCreateViewSet(viewsets.ViewSet):
    permission_classes = [IsSellerOrBuyer]

    def create(self, request, *args, **kwargs):
        serializer = OrderCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        return Response({
            'success': True,
            'message': 'Order created successfully',
            'data': OrderCreateSerializer(order).data,
        }, status=status.HTTP_201_CREATED)
    