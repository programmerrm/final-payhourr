from rest_framework import viewsets
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from permissions.user import IsSellerOrBuyer
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from payments.models import Payment, Withdraw, Deposit
from api.payments.serializers.payments import PaymentSerializer, WithdrawSerializer, DepositSerializer
from api.payments.serializers.payments import DepositHistorySerializer, WithdrawHistorySerializer
from api.payments.filters.filters import DepositFilter, WithdrawFilter, PaymentFilter
from api.payments.paginators.paginators import PaymentHistoryPagination, CombinedTransactionPagination, DepositPagination, WithdrawPagination

# DEPOSIT ADMIN ROLE ALL DEPOSITE ACCESS AND INDIVIDUAL USER ACCESS
class DepositViewSet(viewsets.ModelViewSet):
    serializer_class = DepositSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = DepositFilter
    pagination_class = DepositPagination

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Deposit.objects.all().order_by('-created_at')
        return Deposit.objects.filter(user=user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# WITHDRAW ADMIN ROLE ALL WITHDRAW ACCESS AND INDIVIDUAL USER ACCESS
class WithdrawViewSet(viewsets.ModelViewSet):
    serializer_class = WithdrawSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = WithdrawFilter
    pagination_class = WithdrawPagination

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Withdraw.objects.all().order_by('-created_at')
        return Withdraw.objects.filter(user=user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# PAYMENT ADMIN ROLE ALL PAYMENT ACCESS AND INDIVIDUAL USER ACCESS
class PaymentViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = PaymentFilter
    pagination_class = PaymentHistoryPagination

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Payment.objects.all()
        return Payment.objects.filter(buyer=user) | Payment.objects.filter(seller=user)

    def perform_create(self, serializer):
        serializer.save(buyer=self.request.user)

# PAYMENT HISTORY VIEW
class PaymentHistoryView(GenericAPIView):
    permission_classes = [IsSellerOrBuyer]
    filter_backends = [DjangoFilterBackend]
    pagination_class = PaymentHistoryPagination

    def get(self, request):
        user = request.user
        status = request.query_params.get("status")

        deposits = Deposit.objects.filter(user=user)
        withdraws = Withdraw.objects.filter(user=user)
        if status:
            deposits = deposits.filter(status=status)
            withdraws = withdraws.filter(status=status)
        deposit_data = DepositHistorySerializer(deposits, many=True).data
        withdraw_data = WithdrawHistorySerializer(withdraws, many=True).data
        combined = sorted(
            deposit_data + withdraw_data,
            key=lambda x: x['created_at'],
            reverse=True
        )
        page = self.paginate_queryset(combined)
        if page is not None:
            return self.get_paginated_response(page)

        return Response(combined)

# TOTAL DEPOSIT AND WITHDRAW COUNT VIEW
class TotalDepositAndWithdrawCountView(APIView):
    permission_classes = [IsSellerOrBuyer]

    def get(self, request):
        user = request.user
        deposit_count = Deposit.objects.filter(user=user).count()
        withdraw_count = Withdraw.objects.filter(user=user).count()

        return Response({
            "deposit_count": deposit_count,
            "withdraw_count": withdraw_count,
        })

# ALL TRANSACTIONS VIEW
class AllTransactionsViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    pagination_class = CombinedTransactionPagination

    def list(self, request):
        search = request.query_params.get('search', '').strip()

        deposit_queryset = Deposit.objects.all()
        withdraw_queryset = Withdraw.objects.all()

        if search:
            filter_query = Q(user__username__icontains=search) | Q(user__email__icontains=search)
            deposit_queryset = deposit_queryset.filter(filter_query)
            withdraw_queryset = withdraw_queryset.filter(filter_query)

        deposit_data = DepositHistorySerializer(deposit_queryset, many=True).data
        for item in deposit_data:
            item['type'] = 'deposit'

        withdraw_data = WithdrawHistorySerializer(withdraw_queryset, many=True).data
        for item in withdraw_data:
            item['type'] = 'withdraw'

        combined = sorted(deposit_data + withdraw_data, key=lambda x: x['created_at'], reverse=True)

        paginator = self.pagination_class()
        page = paginator.paginate_queryset(combined, request)
        return paginator.get_paginated_response(page)
