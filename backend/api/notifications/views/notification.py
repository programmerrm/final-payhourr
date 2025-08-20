from rest_framework import viewsets, status
from rest_framework.response import Response
from notifications.models import Notification
from chat.models import ConnectionRequest
from api.notifications.serializers.notification import NotificationSerializer
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated

class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user).order_by('-created_at')

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            "success": True,
            "message": "Notifications retrieved successfully",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    def mark_as_read(self, request, pk=None):
        notification = get_object_or_404(Notification, pk=pk, user=request.user)
        notification.is_read = True
        notification.save()
        serializer = self.get_serializer(notification)
        return Response({
            "success": True,
            "message": "Notification marked as read",
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    def unread_count(self, request):
        count = Notification.objects.filter(user=request.user, is_read=False).count()
        return Response({
            "success": True,
            "message": "Unread notification count",
            "data": {"count": count}
        }, status=status.HTTP_200_OK)

class MarkRequestReadView(viewsets.ViewSet):
    def post(self, request, request_id):
        user = request.user
        try:
            req = ConnectionRequest.objects.get(id=request_id, receiver=user)
            req.is_read = True
            req.save()
            return Response({
                'success': True,
                'status': 'success',
                'message': 'Connection request marked as read.'
            }, status=status.HTTP_200_OK)
        except ConnectionRequest.DoesNotExist:
            return Response({
                'success': False,
                'status': 'error',
                'message': 'Connection request not found.'
            }, status=status.HTTP_404_NOT_FOUND)
