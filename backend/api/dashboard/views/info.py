from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from payments.models import Deposit, Withdraw

class DashboardInfoViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)