from django.urls import path
from api.dashboard.views.info import BuyerDashboardInfoViewSet, SellerDashboardInfoViewSet

urlpatterns = [
    path(
        'buyer-info/',
        BuyerDashboardInfoViewSet.as_view({ 'get': 'list' }),
        name='buyer_dashboard_info',
    ),
    path(
        'seller-info/',
        SellerDashboardInfoViewSet.as_view({ 'get': 'list' }),
        name='seller_dashboard_info',
    ),
]
