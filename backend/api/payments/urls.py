from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.payments.views.payments import PaymentOptionViewSet, PaymentViewSet, WithdrawViewSet, DepositViewSet, PaymentHistoryView, BalanceView, TotalDepositAndWithdrawCountView

router = DefaultRouter()
router.register(r'payment-options', PaymentOptionViewSet, basename='paymentoption')
router.register(r'all-payments', PaymentViewSet, basename='payment')
router.register(r'withdraws', WithdrawViewSet, basename='withdraw')
router.register(r'deposits', DepositViewSet, basename='deposit')

urlpatterns = [
    path('', include(router.urls)),
    path('history/', PaymentHistoryView.as_view(), name='payment-history'),
    path('balance/', BalanceView.as_view(), name='user-balance'),
    path('counts/', TotalDepositAndWithdrawCountView.as_view(), name='payment-counts'),
]
