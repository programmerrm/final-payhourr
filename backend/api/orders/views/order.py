from rest_framework.response import Response
from rest_framework import status, viewsets
from django.shortcuts import get_object_or_404
from orders.models import Order
from permissions.user import IsSellerOrBuyer
from permissions.or_permission import IsRegularOrAdminUser
from api.orders.serializers.order import OrderSerializer
from api.orders.filters.filters import OrdersFilter
from api.orders.paginators.paginators import OrdersPagination
from django_filters.rest_framework import DjangoFilterBackend

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsSellerOrBuyer]
    filter_backends = [DjangoFilterBackend]
    filterset_class = OrdersFilter
    pagination_class = OrdersPagination

    def get_queryset(self):
        user = self.request.user
        return Order.objects.filter(sender=user) | Order.objects.filter(receiver=user)
    







class SingleOrderViewSet(viewsets.ViewSet):
    permission_classes = [IsRegularOrAdminUser]

    def retrieve(self, request, pk=None):
        order = get_object_or_404(Order, pk=pk)
        serializer = OrderSerializer(order)
        return Response({
            'success': True,
            'message': 'Single order fetched successfully',
            'data': serializer.data,
        }, status=status.HTTP_200_OK)
    
class OrderUpdateViewSet(viewsets.ViewSet):
    permission_classes = [IsRegularOrAdminUser]

    def partial_update(self, request, pk=None):
        order = get_object_or_404(Order, pk=pk)
        serializer = OrderSerializer(
            order, 
            data=request.data, 
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response({
                'success': True,
                'message': 'Order update successfully',
                'data': serializer.data,
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
    