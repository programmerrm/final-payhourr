from django.db import models, transaction
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
import uuid

User = get_user_model()

class Deposit(models.Model):
    STATUS_PENDING = 'pending'
    STATUS_APPROVED = 'approved'
    STATUS_REJECTED = 'rejected'

    STATUS_CHOICES = (
        (STATUS_PENDING, 'Pending'),
        (STATUS_APPROVED, 'Approved'),
        (STATUS_REJECTED, 'Rejected'),
    )

    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE,
    )
    amount = models.DecimalField(
        max_digits=12, 
        decimal_places=2,
    )
    number = models.CharField(
        max_length=80,
        null=True,
        blank=True,
    )
    transaction_id = models.CharField(
        max_length=255
    )
    status = models.CharField(
        max_length=10, 
        choices=STATUS_CHOICES, 
        default=STATUS_APPROVED
    )
    created_at = models.DateTimeField(
        auto_now_add=True
    )
    updated_at = models.DateTimeField(
        auto_now_add=True
    )

    def save(self, *args, **kwargs):
        with transaction.atomic():

            if self.pk:

                old = Deposit.objects.select_for_update().get(pk=self.pk)

                if old.status != self.status:

                    if old.status != self.STATUS_APPROVED and self.status == self.STATUS_APPROVED:
                        self.user.balance = models.F('balance') + self.amount

                    elif old.status == self.STATUS_APPROVED and self.status != self.STATUS_APPROVED:
                        self.user.balance = models.F('balance') - self.amount
                        
                    self.user.save(update_fields=['balance'])

            else:
                if self.status == self.STATUS_APPROVED:
                    self.user.balance = models.F('balance') + self.amount
                    self.user.save(update_fields=['balance'])


            super().save(*args, **kwargs)


    def __str__(self):
        return f"Deposit by {self.user.username} : {self.amount} ({self.status})"

class Withdraw(models.Model):
    STATUS_PENDING = 'pending'
    STATUS_APPROVED = 'approved'
    STATUS_REJECTED = 'rejected'

    STATUS_CHOICES = (
        (STATUS_PENDING, 'Pending'),
        (STATUS_APPROVED, 'Approved'),
        (STATUS_REJECTED, 'Rejected'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    receiver_number = models.CharField(max_length=255)
    method = models.CharField(max_length=255)
    txr_number = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=STATUS_PENDING)
    created_at = models.DateTimeField(auto_now_add=True)

    def clean(self):
        is_buyer = self.user.payments_made.exists()
        is_seller = self.user.payments_received.exists()
        if not (is_buyer or is_seller):
            raise ValidationError("Only buyers or sellers can make withdrawals.")

        # Use database value of balance to avoid stale value issue
        self.user.refresh_from_db(fields=['balance'])
        if self.amount > self.user.balance:
            raise ValidationError(f"Insufficient balance. Your balance is {self.user.balance}")

    def save(self, *args, **kwargs):
        with transaction.atomic():
            if self.pk:
                old = Withdraw.objects.select_for_update().get(pk=self.pk)
                if old.status != self.status:
                    if old.status != self.STATUS_APPROVED and self.status == self.STATUS_APPROVED:
                        # Withdraw approved now - decrease balance
                        self.user.balance = models.F('balance') - self.amount
                        self.user.save(update_fields=['balance'])
                    elif old.status == self.STATUS_APPROVED and self.status != self.STATUS_APPROVED:
                        # Withdraw was approved before, now unapproved - increase balance
                        self.user.balance = models.F('balance') + self.amount
                        self.user.save(update_fields=['balance'])
            else:
                if self.status == self.STATUS_APPROVED:
                    self.user.balance = models.F('balance') - self.amount
                    self.user.save(update_fields=['balance'])

            super().save(*args, **kwargs)

    def __str__(self):
        return f"Withdraw by {self.user.username}: {self.amount} ({self.status})"

class Payment(models.Model):
    STATUS_PENDING = 'pending'
    STATUS_APPROVED = 'approved'
    STATUS_REJECTED = 'rejected'

    STATUS_CHOICES = (
        (STATUS_PENDING, 'Pending'),
        (STATUS_APPROVED, 'Approved'),
        (STATUS_REJECTED, 'Rejected'),
    )

    buyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payments_made')
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payments_received')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=STATUS_PENDING)
    created_at = models.DateTimeField(auto_now_add=True)

    def clean(self):
        if self.buyer == self.seller:
            raise ValidationError("Buyer and Seller cannot be the same user.")

        # Only buyer or admin can perform payment
        if not (self.buyer.is_staff or self.buyer == self.buyer):
            raise ValidationError("Only buyer or admin can perform payment.")

        # Check buyer balance fresh from DB
        self.buyer.refresh_from_db(fields=['balance'])
        if self.amount > self.buyer.balance:
            raise ValidationError(f"Insufficient balance for payment. Your balance is {self.buyer.balance}")

    def save(self, *args, **kwargs):
        # Here, balance adjustment depends on your business logic.
        # Example: When payment is approved, deduct buyer's balance and add seller's balance.
        with transaction.atomic():
            if self.pk:
                old = Payment.objects.select_for_update().get(pk=self.pk)
                if old.status != self.status:
                    if old.status != self.STATUS_APPROVED and self.status == self.STATUS_APPROVED:
                        # Payment approved now
                        self.buyer.balance = models.F('balance') - self.amount
                        self.buyer.save(update_fields=['balance'])
                        self.seller.balance = models.F('balance') + self.amount
                        self.seller.save(update_fields=['balance'])
                    elif old.status == self.STATUS_APPROVED and self.status != self.STATUS_APPROVED:
                        # Payment was approved before, now changed to other status
                        self.buyer.balance = models.F('balance') + self.amount
                        self.buyer.save(update_fields=['balance'])
                        self.seller.balance = models.F('balance') - self.amount
                        self.seller.save(update_fields=['balance'])
            else:
                if self.status == self.STATUS_APPROVED:
                    self.buyer.balance = models.F('balance') - self.amount
                    self.buyer.save(update_fields=['balance'])
                    self.seller.balance = models.F('balance') + self.amount
                    self.seller.save(update_fields=['balance'])

            super().save(*args, **kwargs)

    def __str__(self):
        return f"Payment from {self.buyer.username} to {self.seller.username} - {self.amount} ({self.status})"
