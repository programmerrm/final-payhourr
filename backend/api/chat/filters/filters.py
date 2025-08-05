import django_filters
from django.db.models import Q
from chat.models import ConnectionRequest, Connected

class ConnectionRequestsFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method='filter_by_sender_or_receiver')

    class Meta:
        model = ConnectionRequest
        fields = ['search']

    def filter_by_sender_or_receiver(self, queryset, name, value):
        return queryset.filter(
            Q(sender__username__icontains=value) |
            Q(sender__email__icontains=value) |
            Q(receiver__username__icontains=value) |
            Q(receiver__email__icontains=value)
        ).distinct()

class ConnectedUserFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method='filter_by_connected_user')

    class Meta:
        model = Connected
        fields = ['search']

    def filter_by_connected_user(self, queryset, name, value):
        return queryset.filter(
            Q(connected_users__username__icontains=value) |
            Q(connected_users__email__icontains=value)
        ).distinct()