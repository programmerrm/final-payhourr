from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.

class Message(models.Model):
    sender = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='sent_messages',
    )
    receiver = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='received_messages',
    )
    content = models.TextField(
        blank=True, 
        null=True
    )
    attachment = models.FileField(
        upload_to='attachments/', 
        blank=True, 
        null=True,
    )
    timestamp = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.sender.username} to {self.receiver.username} - {self.timestamp}"
