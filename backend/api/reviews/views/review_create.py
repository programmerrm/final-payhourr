from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class ReviewCreateViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        return Response({
            'success': True,
            'message': 'Review create successfully',
            'data': 'ok',
        }, status=status.HTTP_201_CREATED)
    