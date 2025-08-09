###############################################################
"""
Order Model Create
"""
###############################################################
from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from decimal import Decimal
from typing import Optional
from orders.utils import ORDER_STATUS
from orders.services.email_service import send_order_email
from orders.services.payment_service import process_payment_on_create, release_payment_to_seller, refund_to_buyer

User = get_user_model()

class Order(models.Model):
    """
    Represents an order between a sender (buyer) and receiver (seller).
    Supports delivery time extension requests and payment handling.
    """
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
    number = models.CharField(
        max_length=100, 
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
        verbose_name = 'Order'
        verbose_name_plural = 'Orders'

    def __str__(self) -> str:
        return f"Order #{self.id} - {self.status}"

    def save(self, *args, **kwargs) -> None:
        """
        Custom save method handles:
          - Auto-cancel order if delivery time expired and status still pending.
          - Payment processing on new order creation.
          - Email notifications on status change.
          - Payment release/refund on completion/cancellation.
        """
        try:
            is_new = self._state.adding
            old_status: Optional[str] = None
            if not is_new:
                old_status = Order.objects.filter(pk=self.pk).values_list('status', flat=True).first()

            # Auto-cancel if past delivery time and still pending
            if self.delivery_time < timezone.now() and self.status == 'pending':
                self.status = 'cancel'

            super().save(*args, **kwargs)

            if is_new:
                if self.amount and self.status == 'pending':
                    process_payment_on_create(self)
                    send_order_email(
                        self,
                        subject=f"New Order Created (#{self.id})",
                        message=(
                            f"Order Title: {self.title}\n"
                            f"Amount: {self.amount}\n"
                            f"Status: Pending\n"
                            f"Delivery: {self.delivery_time}"
                        )
                    )
            else:
                if old_status != self.status:
                    if self.status == 'completed':
                        release_payment_to_seller(self)
                        send_order_email(
                            self,
                            subject=f"Order #{self.id} Completed",
                            message=f"Order Title: {self.title}\nAmount: {self.amount}\nStatus: Completed"
                        )
                    elif self.status == 'cancel':
                        refund_to_buyer(self)
                        send_order_email(
                            self,
                            subject=f"Order #{self.id} Cancelled",
                            message=f"Order Title: {self.title}\nAmount: {self.amount}\nStatus: Cancelled"
                        )
        except Exception as e:
            # Log the error or raise for debugging - recommended to integrate with logging system
            print(f"Error in Order.save(): {e}")
            raise

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
