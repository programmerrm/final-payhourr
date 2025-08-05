from django.db import models
from django.conf import settings

class ConnectionRequest(models.Model):
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='sent_requests',
    )
    receiver = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='received_requests',
    )
    accepted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('sender', 'receiver')

    def __str__(self):
        return f"{self.sender.username} → {self.receiver.username}"

class Connected(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='connections',
    )
    connected_users = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name='connected_to',
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}'s connections"

class Chat(models.Model):
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='sent_messages',
    )
    receiver = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='received_messages',
    )
    content = models.TextField(
        blank=True, 
        null=True,
    )
    attachment = models.FileField(
        upload_to='attachments/', 
        blank=True, 
        null=True,
    )
    is_read = models.BooleanField(
        default=False,
    )
    is_deleted = models.BooleanField(
        default=False,
    )
    edited_at = models.DateTimeField(
        null=True, 
        blank=True,
    )
    timestamp = models.DateTimeField(
        auto_now_add=True,
    )

    def __str__(self):
        return f"{self.sender.username} to {self.receiver.username} at {self.timestamp}"
