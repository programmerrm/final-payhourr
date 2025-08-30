import django_filters
from django.db.models import Q
from orders.models import Order

class OrdersFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method='filter_by_sender_or_receiver_username_or_email')
    status = django_filters.ChoiceFilter(choices=Order.STATUS_CHOICES)

    class Meta:
        model = Order
        fields = ['search', 'status']

    def filter_by_sender_or_receiver_username_or_email(self, queryset, name, value):
        return queryset.filter(
            Q(sender__username__icontains=value) | 
            Q(sender__email__icontains=value) |
            Q(receiver__username__icontains=value) |
            Q(receiver__email__icontains=value)
        )
