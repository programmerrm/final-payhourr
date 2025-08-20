from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class Notification(models.Model):
    class NotificationType(models.TextChoices):
        CONNECTION_REQUEST = "connection_request", "Connection Request",
        CONNECTION_ACCEPTED = "connection_accepted", "Connection Accepted",
        CONNECTION_ADDED = "connection_added", "Connection Added",
        MESSAGE = "message", "Message"
        DISPUTE = "dispute", "Dispute"
        SYSTEM = "system", "System"

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="notifications",
        db_index=True
    )
    from_user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="sent_notifications",
        db_index=True,
    )
    notification_type = models.CharField(
        max_length=50,
        choices=NotificationType.choices,
        db_index=True,
    )
    message = models.TextField()
    
    related_object_id = models.PositiveIntegerField(
        null=True,
        blank=True,
    )
    url = models.CharField(
        max_length=1000,
        blank=True,
        null=True,
    )
    is_read = models.BooleanField(
        default=False, 
        db_index=True,
    )
    created_at = models.DateTimeField(
        auto_now_add=True, 
        db_index=True,
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Notification for {self.user} - {self.notification_type}"
