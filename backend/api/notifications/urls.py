from rest_framework.routers import DefaultRouter
from django.urls import path
from api.notifications.views.notification import MarkRequestReadView, NotificationViewSet

router = DefaultRouter()
router.register(r'all', NotificationViewSet, basename='notifications')

urlpatterns = router.urls + [
    path(
        '<int:pk>/mark-read/', 
        NotificationViewSet.as_view({'post': 'mark_as_read'}), 
        name='mark_notification_read'
    ),
    path(
        'unread-count/', 
        NotificationViewSet.as_view({'get': 'unread_count'}), 
        name='unread_count'
    ),
    path(
        "mark-request-read/",
        MarkRequestReadView.as_view({ 'post': 'post' }),
        name='mark_request_read',
    ),
]
