from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from permissions.user import IsSellerOrBuyer
from api.orders.serializers.order_create import OrderCreateSerializer
from orders.models import Order

class OrderCreateViewSet(APIView):
    permission_classes = [IsSellerOrBuyer]

    def post(self, request):
        sender = request.user
        receiver_id = request.data.get('receiver')

        # Check if there is a pending order between this sender and receiver
        if Order.objects.filter(sender=sender, receiver_id=receiver_id, status='pending').exists():
            return Response({
                'success': False,
                'message': 'You already have a pending order with this receiver. Complete or cancel it before creating a new one.'
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            serializer = OrderCreateSerializer(data=request.data, context={'request': request})
            if serializer.is_valid():
                serializer.save()
                return Response({
                    'success': True,
                    'message': 'Order created after payment success',
                    'data': serializer.data
                }, status=status.HTTP_201_CREATED)
            return Response({
                'success': False,
                'message': 'Validation error',
                'errors': serializer.errors,   
            }, status=status.HTTP_400_BAD_REQUEST)
                
        except Exception as e:
            return Response({
                'success': False,
                'message': 'Server error',
                'errors': str(e)
            }, status=status.HTTP_503_SERVICE_UNAVAILABLE)
