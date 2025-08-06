from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from django.db.models import Q
from django.contrib.auth import get_user_model

from chat.models import Dispute
from api.chat.serializers.dispute import DisputeSerializer
from api.chat.paginators.paginators import DisputePagination
from api.chat.filters.filters import DisputeUserFilter
from rest_framework import serializers

User = get_user_model()

class DisputeViewSet(viewsets.ModelViewSet):
    serializer_class = DisputeSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = DisputePagination
    filterset_class = DisputeUserFilter

    def get_queryset(self):
        user = self.request.user

        # Base queryset based on user role
        if user.role == 'admin' or user.is_superuser:
            base_queryset = Dispute.objects.all().order_by('-created_at')
        else:
            base_queryset = Dispute.objects.filter(raised_by=user).order_by('-created_at')
        
        # Apply filters from filterset
        return self.filter_queryset(base_queryset)

    # def perform_create(self, serializer):
    #     raised_by_user = self.request.user
    #     admin_user = User.objects.filter(Q(role='admin') | Q(is_superuser=True)).first()
    #     serializer.save(raised_by=raised_by_user, admin=admin_user)
    def perform_create(self, serializer):
        raised_by_user = self.request.user
        room_name = serializer.validated_data.get("room_name")

        against_user = None

        if room_name:
            user_parts = room_name.split("_")

            for part in user_parts:
                # Skip if part matches the current user
                if part == str(raised_by_user.id) or part == raised_by_user.username:
                    continue

                # Try to resolve by ID
                if part.isdigit():
                    against_user = User.objects.filter(id=int(part)).first()
                else:
                    # Try to resolve by username
                    against_user = User.objects.filter(username=part).first()

                if against_user:
                    break  # found the opponent

        admin_user = User.objects.filter(Q(role='admin') | Q(is_superuser=True)).first()

        serializer.save(
            raised_by=raised_by_user,
            admin=admin_user,
            against_user=against_user
        )



    def update(self, request, *args, **kwargs):
        user = request.user
        instance = self.get_object()

        if 'status' in request.data and not (user.role == 'admin' or user.is_superuser):
            return Response(
                {"detail": "Only admin can update the status."},
                status=status.HTTP_403_FORBIDDEN
            )
        
        return super().update(request, *args, **kwargs)
