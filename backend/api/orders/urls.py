from django.urls import path
from api.orders.views.order_create import OrderCreateViewSet
from api.orders.views.all_orders import AllOrdersViewSet
from api.orders.views.all_orders_delete import AllOrdersDeleteViewSet
from api.orders.views.order import ReceiverOrderViewSet, OrderViewSet, SingleOrderViewSet, OrderUpdateViewSet

urlpatterns = [
    path(
        'list/',
        OrderViewSet.as_view({ 'get': 'list' }),
        name='order_list'
    ),
    path(
        'single-order/<int:pk>/',
        SingleOrderViewSet.as_view({'get': 'retrieve'}),
        name='single_order',
    ),
    path(
        'update/<int:pk>/',
        OrderUpdateViewSet.as_view({'patch': 'partial_update'}),
        name='single_order_update',
    ),
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
