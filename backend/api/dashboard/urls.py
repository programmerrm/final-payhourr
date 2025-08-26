from django.urls import path
from api.dashboard.views.info import BuyerDashboardInfoViewSet

urlpatterns = [
    path(
        'buyer-info/',
        BuyerDashboardInfoViewSet.as_view({ 'get': 'list' }),
        name='seller_dashboard_info',
    ),
]
