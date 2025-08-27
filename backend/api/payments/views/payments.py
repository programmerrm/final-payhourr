from rest_framework import viewsets
from payments.models import Payment, Withdraw, Deposit
from api.payments.serializers.payments import PaymentSerializer, WithdrawSerializer, DepositSerializer
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from permissions.admin import IsAdminUser
from permissions.user import IsSellerOrBuyer
from rest_framework.permissions import IsAuthenticated

from api.payments.serializers.payments import DepositHistorySerializer, WithdrawHistorySerializer
from api.payments.paginators.paginators import PaymentHistoryPagination, CombinedTransactionPagination
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from api.payments.serializers.payments import BalanceSerializer

from api.payments.filters.filters import DepositFilter, WithdrawFilter
from api.payments.paginators.paginators import DepositPagination, WithdrawPagination
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q

class DepositViewSet(viewsets.ModelViewSet):
    serializer_class = DepositSerializer
    permission_classes = [IsAdminUser]
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

class WithdrawViewSet(viewsets.ModelViewSet):
    serializer_class = WithdrawSerializer
    permission_classes = [IsAdminUser]
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

class PaymentHistoryView(GenericAPIView):
    permission_classes = [IsSellerOrBuyer]
    pagination_class = PaymentHistoryPagination

    def get(self, request):
        user = request.user
        deposits = Deposit.objects.filter(user=user)
        withdraws = Withdraw.objects.filter(user=user)

        deposit_data = DepositHistorySerializer(deposits, many=True).data
        withdraw_data = WithdrawHistorySerializer(withdraws, many=True).data

        # Combine and sort all records by created_at (descending)
        combined = sorted(deposit_data + withdraw_data, key=lambda x: x['created_at'], reverse=True)

        # Paginate combined data
        page = self.paginate_queryset(combined)
        if page is not None:
            return self.get_paginated_response(page)

        return Response(combined)

class PaymentViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Payment.objects.all()
        return Payment.objects.filter(buyer=user) | Payment.objects.filter(seller=user)

    def perform_create(self, serializer):
        serializer.save(buyer=self.request.user)

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

class BalanceView(RetrieveAPIView):
    serializer_class = BalanceSerializer
    permission_classes = [IsSellerOrBuyer]

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
