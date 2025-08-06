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
    room_name = models.CharField(
        max_length=500,
        db_index=True
    )
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

class Dispute(models.Model):
    room_name = models.CharField(
        max_length=500,
    )
    raised_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        related_name='disputes_raised', 
        on_delete=models.CASCADE,
    )
    against_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='disputes_against',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    admin = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        related_name='disputes_handled', 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
    )
    subject = models.CharField(
        max_length=500,
    )
    description = models.TextField(
        max_length=5000,
    )
    priority = models.CharField(
        max_length=20,
        choices=[
            ('easy', 'Easy'), 
            ('medium', 'Medium'),
            ('high', 'High'),
        ],
    )
    status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'Pending'),
            ('completed', 'Completed'),
            ('not_completed', 'Not Completed'),
        ],
        default='pending'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    def __str__(self):
        return f"Dispute in {self.room_name} by {self.raised_by.username}"
    