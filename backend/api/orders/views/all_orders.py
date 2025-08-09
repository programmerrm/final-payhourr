from rest_framework import viewsets
from permissions.admin import IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from orders.models import Order
from api.orders.serializers.all_orders import AllOrderSerializer
from api.orders.paginators.paginators import OrdersPagination
from api.orders.filters.filters import OrdersFilter

class AllOrdersViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = Order.objects.all()
    serializer_class = AllOrderSerializer
    pagination_class = OrdersPagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = OrdersFilter
