from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from accounts.models import Rating
from api.accounts.serializers.rating import RatingSerializer

class RatingViewSet(viewsets.ModelViewSet):
    serializer_class = RatingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Rating.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)

