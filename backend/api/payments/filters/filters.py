import django_filters
from django.db.models import Q
from payments.models import Deposit, Withdraw, Payment

class DepositFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method='filter_by_username')

    class Meta:
        model = Deposit
        fields = ['search']

    def filter_by_username(self, queryset, name, value):
        return queryset.filter(
            Q(user__username__icontains=value) |
            Q(user__email__icontains=value)
        ).distinct()
    
class WithdrawFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method='filter_by_username')

    class Meta:
        model = Withdraw
        fields = ['search']

    def filter_by_username(self, queryset, name, value):
        return queryset.filter(
            Q(user__username__icontains=value) |
            Q(user__email__icontains=value)
        ).distinct()

