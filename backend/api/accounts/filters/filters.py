import django_filters
from django.db.models import Q
from django.contrib.auth import get_user_model

User = get_user_model()

class UsersFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method='filter_by_username_or_email')

    class Meta:
        model = User
        fields = ['search']
    
    def filter_by_username_or_email(self, queryset, name, value):
        return queryset.filter(
            Q(username__icontains=value) | Q(email__icontains=value)
        )

