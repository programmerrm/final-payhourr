###############################################################
"""
Order Model Create
"""
###############################################################
from django.db import models
from django.contrib.auth import get_user_model
from decimal import Decimal
from orders.utils import ORDER_STATUS

User = get_user_model()

class Order(models.Model):
    """
    Represents an order between a sender (buyer) and receiver (seller).
    Supports delivery time extension requests and payment handling.
    """
    order_id = models.CharField(
        max_length=10,
        unique=True, 
        blank=True,
        null=True,
    )
    sender = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='sent_orders',
        db_index=True,
    )
    receiver = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='received_orders',
        db_index=True,
    )
    title = models.CharField(
        max_length=500, 
        blank=True, 
        null=True
    )
    requirement = models.TextField(
        max_length=5000, 
        blank=True, 
        null=True
    )
    payment_type = models.CharField(
        max_length=100, 
        blank=True,
        null=True
    )
    amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        blank=True,
        null=True,
        default=Decimal('0.00'),
    )
    reference_file = models.FileField(
        upload_to='orders/',
        blank=True,
        null=True,
    )
    
    is_approved = models.BooleanField(
        default=False,
    )

    status = models.CharField(
        max_length=20,
        choices=ORDER_STATUS,
        default='pending',
        db_index=True,
    )
    reminder_sent = models.BooleanField(
        default=False
    )
    delivery_time = models.DateTimeField()

    # Extension related fields
    delivery_time_extension_requested = models.BooleanField(
        default=False
    )
    requested_new_delivery_time = models.DateTimeField(
        blank=True, 
        null=True
    )
    delivery_time_extension_approved = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True, 
        db_index=True
    )
    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['status']),
            models.Index(fields=['delivery_time']),
        ]

    def __str__(self) -> str:
        return f"Order {self.id} - {self.status}"

    def approve_extension(self) -> None:
        """
        Approves the requested delivery time extension by updating the delivery_time
        and toggling the extension flags accordingly.
        """
        if self.delivery_time_extension_requested and self.requested_new_delivery_time:
            self.delivery_time = self.requested_new_delivery_time
            self.delivery_time_extension_approved = True
            self.delivery_time_extension_requested = False
            self.requested_new_delivery_time = None
            self.save(update_fields=[
                'delivery_time',
                'delivery_time_extension_approved',
                'delivery_time_extension_requested',
                'requested_new_delivery_time'
            ])
