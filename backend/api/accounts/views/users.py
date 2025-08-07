from rest_framework import viewsets, status
from rest_framework.response import Response
from permissions.admin import IsAdminUser
from permissions.or_permission import IsRegularOrAdminUser
from rest_framework.parsers import JSONParser
from django.contrib.auth import get_user_model
from django_filters.rest_framework import DjangoFilterBackend
from api.accounts.serializers.users import UsersSerializer
from api.accounts.filters.filters import UsersFilter
from api.accounts.paginators.paginators import UsersPagination
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticated

User = get_user_model()

class UsersViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    parser_classes = [JSONParser]
    serializer_class = UsersSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = UsersFilter
    pagination_class = UsersPagination

    def get_queryset(self):
        return User.objects.exclude(role='admin')
    
class UserViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    parser_classes = [JSONParser]
    serializer_class = UsersSerializer

    def retrieve(self, request, pk=None):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise NotFound(detail="User not found")

        serializer = self.serializer_class(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    