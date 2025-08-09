from django.urls import path
from api.orders.views.order_create import OrderCreateViewSet
from api.orders.views.all_orders import AllOrdersViewSet

urlpatterns = [
    path(
        'create/',
        OrderCreateViewSet.as_view({ 'post': 'create' }),
        name='order_create',
    ),
    path(
        'all/',
        AllOrdersViewSet.as_view({ 'get': 'list' }),
        name='all_orders',
    ),
]
