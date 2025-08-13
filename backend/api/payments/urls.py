from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.payments.views.payments import PaymentViewSet, WithdrawViewSet, DepositViewSet, PaymentHistoryView, BalanceView, TotalDepositAndWithdrawCountView, AllTransactionsViewSet
from api.payments.views.sslcommerz import InitPaymentView

router = DefaultRouter()
router.register(r'all-payments', PaymentViewSet, basename='payment')
router.register(r'withdraws', WithdrawViewSet, basename='withdraw')
router.register(r'deposits', DepositViewSet, basename='deposit')
router.register(r'all-transactions', AllTransactionsViewSet, basename='all-transactions')

urlpatterns = [
    path(
        'history/',
        PaymentHistoryView.as_view(), 
        name='payment-history',
    ),
    path(
        'balance/', 
        BalanceView.as_view(), 
        name='user-balance',
    ),
    path(
        'counts/', 
        TotalDepositAndWithdrawCountView.as_view(), 
        name='payment-counts',
    ),
    path(
        'init-payment/',
        InitPaymentView.as_view(),
        name='init_payment',
    ),
    path(
        '', 
        include(router.urls),
    ),
]
