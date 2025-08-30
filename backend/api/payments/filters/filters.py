import django_filters
from django.db.models import Q
from payments.models import Deposit, Withdraw, Payment

class DepositFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method='filter_by_username')
    status = django_filters.ChoiceFilter(choices=Deposit.STATUS_CHOICES)

    class Meta:
        model = Deposit
        fields = ['search', 'status']

    def filter_by_username(self, queryset, name, value):
        return queryset.filter(
            Q(user__username__icontains=value) |
            Q(user__email__icontains=value)
        ).distinct()

class WithdrawFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method='filter_by_username')
    status = django_filters.ChoiceFilter(choices=Withdraw.STATUS_CHOICES)

    class Meta:
        model = Withdraw
        fields = ['search', 'status']

    def filter_by_username(self, queryset, name, value):
        return queryset.filter(
            Q(user__username__icontains=value) |
            Q(user__email__icontains=value)
        ).distinct()

class PaymentFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method='filter_by_username')
    status = django_filters.ChoiceFilter(choices=Payment.STATUS_CHOICES)
    start_date = django_filters.DateFilter(field_name="created_at", lookup_expr='gte')
    end_date = django_filters.DateFilter(field_name="created_at", lookup_expr='lte')

    class Meta:
        model = Payment
        fields = ['search', 'status', 'start_date', 'end_date']

    def filter_by_username(self, queryset, name, value):
        return queryset.filter(
            Q(buyer__username__icontains=value) |
            Q(buyer__email__icontains=value) |
            Q(seller__username__icontains=value) |
            Q(seller__email__icontains=value)
        ).distinct()
