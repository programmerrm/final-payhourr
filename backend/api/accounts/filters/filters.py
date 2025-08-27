import django_filters
from django.db.models import Q
from django.contrib.auth import get_user_model

User = get_user_model()

class UsersFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method='filter_by_username_or_email')
    role = django_filters.ChoiceFilter(choices=User._meta.get_field("role").choices)
    is_verify = django_filters.BooleanFilter(field_name="is_verify")
    is_block = django_filters.BooleanFilter(field_name="is_block")

    class Meta:
        model = User
        fields = ['search', 'role', 'is_verify', 'is_block']

    def filter_by_username_or_email(self, queryset, name, value):
        return queryset.filter(
            Q(username__icontains=value) | Q(email__icontains=value)
        )
