from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator
from django.utils.translation import gettext_lazy as _
from django.db.models.signals import post_save
from django.dispatch import receiver

def validate_file_size(value):
    limit = 100 * 1024 * 1024 
    if value.size > limit:
        raise ValidationError('File size must be under 100 MB.')

User = settings.AUTH_USER_MODEL

# =========================
# Connection Request Model
# =========================
class ConnectionRequest(models.Model):
    sender = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="sent_requests",
        db_index=True
    )
    receiver = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="received_requests",
        db_index=True
    )
    accepted = models.BooleanField(
        default=False, 
        db_index=True
    )
    created_at = models.DateTimeField(
        auto_now_add=True, 
        db_index=True
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["sender", "receiver"],
                name="unique_connection_request"
            )
        ]
        indexes = [
            models.Index(fields=["accepted"]),
            models.Index(fields=["created_at"]),
        ]

    def clean(self):
        if self.sender == self.receiver:
            raise ValidationError(_("You cannot send a connection request to yourself."))

    def __str__(self):
        return f"{self.sender} → {self.receiver} | Accepted: {self.accepted}"

# =========================
# Connected Users Model
# =========================
class Connected(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="connections",
        db_index=True
    )
    connected_users = models.ManyToManyField(
        User,
        related_name="connected_with",
        blank=True
    )
    created_at = models.DateTimeField(
        auto_now_add=True, 
        db_index=True
    )

    def __str__(self):
        return f"{self.user}'s connections"

# Signal: When a request is accepted, add to Connected
@receiver(post_save, sender=ConnectionRequest)
def add_to_connected(sender, instance, created, **kwargs):
    if instance.accepted:
        connected_obj, _ = Connected.objects.get_or_create(user=instance.sender)
        connected_obj.connected_users.add(instance.receiver)

        connected_obj_receiver, _ = Connected.objects.get_or_create(user=instance.receiver)
        connected_obj_receiver.connected_users.add(instance.sender)

# =========================
# Chat Model
# =========================
class Chat(models.Model):
    room_name = models.CharField(
        max_length=255, 
        db_index=True
    )
    sender = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="sent_messages",
        db_index=True
    )
    receiver = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="received_messages",
        db_index=True
    )
    content = models.TextField(
        blank=True, 
        null=True
    )
    attachment = models.FileField(
        upload_to="attachments/",
        blank=True,
        null=True,
        validators=[
            FileExtensionValidator(allowed_extensions=["jpg", "jpeg", "png", "mp4", "pdf"]),
            validate_file_size
        ]
    )
    is_read = models.BooleanField(
        default=False, 
        db_index=True
    )
    is_deleted = models.BooleanField(
        default=False, 
        db_index=True
    )
    edited_at = models.DateTimeField(
        null=True, 
        blank=True
    )
    timestamp = models.DateTimeField(
        auto_now_add=True, 
        db_index=True
    )

    class Meta:
        indexes = [
            models.Index(fields=["room_name"]),
            models.Index(fields=["is_read"]),
            models.Index(fields=["timestamp"]),
        ]
        ordering = ["-timestamp"]

    def clean(self):
        if self.sender == self.receiver:
            raise ValidationError(_("Sender and receiver cannot be the same."))

    def __str__(self):
        return f"{self.sender} → {self.receiver} ({self.timestamp})"

# =========================
# Dispute Model
# =========================
class Dispute(models.Model):

    class Priority(models.TextChoices):
        EASY = "easy", _("Easy")
        MEDIUM = "medium", _("Medium")
        HIGH = "high", _("High")

    class Status(models.TextChoices):
        PENDING = "pending", _("Pending")
        COMPLETED = "completed", _("Completed")
        NOT_COMPLETED = "not_completed", _("Not Completed")

    room_name = models.CharField(
        max_length=255, 
        db_index=True
    )
    raised_by = models.ForeignKey(
        User,
        related_name="disputes_raised",
        on_delete=models.CASCADE,
        db_index=True
    )
    against_user = models.ForeignKey(
        User,
        related_name="disputes_against",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        db_index=True
    )
    admin = models.ForeignKey(
        User,
        related_name="disputes_handled",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        db_index=True
    )
    subject = models.CharField(
        max_length=255
    )
    description = models.TextField(
        max_length=5000
    )
    priority = models.CharField(
        max_length=20, 
        choices=Priority.choices, 
        db_index=True
    )
    status = models.CharField(
        max_length=20, 
        choices=Status.choices, 
        default=Status.PENDING, 
        db_index=True
    )
    created_at = models.DateTimeField(
        auto_now_add=True, 
        db_index=True
    )

    class Meta:
        indexes = [
            models.Index(fields=["priority"]),
            models.Index(fields=["status"]),
            models.Index(fields=["created_at"]),
        ]
        ordering = ["-created_at"]

    def __str__(self):
        return f"Dispute: {self.subject} ({self.priority})"
