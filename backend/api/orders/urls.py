from django.urls import path
from api.orders.views.order_create import OrderCreateViewSet
from api.orders.views.all_orders import AllOrdersViewSet
from api.orders.views.all_orders_delete import AllOrdersDeleteViewSet
from api.orders.views.order import ReceiverOrderViewSet
from api.payments.views.sslcommerz import InitPaymentView

urlpatterns = [
    path(
        'create/',
        OrderCreateViewSet.as_view(),
        name='order_create',
    ),
    path(
        'all/',
        AllOrdersViewSet.as_view({ 'get': 'list' }),
        name='all_orders',
    ),
    path(
        'all/delete/',
        AllOrdersDeleteViewSet.as_view({'delete': 'destroy_all'}),
        name='all_orders_delete',
    ),
    path(
        'receiver-order/',
        ReceiverOrderViewSet.as_view({ 'get': 'list' }),
        name='receiver_orders',
    ),
]
