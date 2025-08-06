from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import JSONParser
from api.chat.serializers.connected_users import ConnectedUsersSerializer
from django_filters.rest_framework import DjangoFilterBackend
from api.chat.filters.filters import ConnectedUserFilter
from api.chat.paginators.paginators import ConnectedUserPagination
from chat.models import Connected

class ConnectedUsersView(viewsets.ModelViewSet):
    queryset = Connected.objects.all()
    serializer_class = ConnectedUsersSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [JSONParser]
    filter_backends = [DjangoFilterBackend]
    filterset_class = ConnectedUserFilter
    pagination_class = ConnectedUserPagination

    def get_queryset(self):
        return Connected.objects.filter(user=self.request.user)

class ConnectedUsersWithOutPaginationView(viewsets.ModelViewSet):
    queryset = Connected.objects.all()
    serializer_class = ConnectedUsersSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [JSONParser]
    filter_backends = [DjangoFilterBackend]
    filterset_class = ConnectedUserFilter

    def get_queryset(self):
        return Connected.objects.filter(user=self.request.user)
    