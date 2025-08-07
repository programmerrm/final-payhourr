from django.db import models
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
import uuid

User = get_user_model()

class PaymentOption(models.Model):
    name = models.CharField(max_length=255)
    number = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.name} - {self.number}"

class Balance(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    def __str__(self):
        return f"{self.user.username} Balance: {self.amount}"

class Deposit(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Fixed field names
    sender_number = models.CharField(max_length=255,)
    receiver_number = models.CharField(max_length=255,)
    
    payment_option = models.ForeignKey(PaymentOption, on_delete=models.CASCADE)
    txr_number = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        old_status = None
        if self.pk:
            old_status = Deposit.objects.get(pk=self.pk).status

        super().save(*args, **kwargs)

        if self.status == 'approved' and old_status != 'approved':
            balance, _ = Balance.objects.get_or_create(user=self.user)
            balance.amount += self.amount
            balance.save()

    def __str__(self):
        return f"Deposit by {self.user.username}: {self.amount} via {self.payment_option.name} ({self.status})"

class Withdraw(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    receiver_number = models.CharField(max_length=255,)
    method = models.CharField(max_length=255)
    txr_number = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        old_status = None
        if self.pk:
            old_status = Withdraw.objects.get(pk=self.pk).status

        super().save(*args, **kwargs)

        if self.status == 'approved' and old_status != 'approved':
            balance, _ = Balance.objects.get_or_create(user=self.user)
            if balance.amount >= self.amount:
                balance.amount -= self.amount
                balance.save()
            else:
                raise ValidationError("Insufficient balance to approve this withdrawal.")

    def __str__(self):
        return f"Withdraw by {self.user.username}: {self.amount} via ({self.status})"

class Payment(models.Model):
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payments_made')
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payments_received')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def clean(self):
        if self.buyer == self.seller:
            raise ValidationError("Buyer and Seller cannot be the same user.")

    def save(self, *args, **kwargs):
        old_status = None
        if self.pk:
            old_status = Payment.objects.get(pk=self.pk).status

        super().save(*args, **kwargs)

        if self.status == 'approved' and old_status != 'approved':
            buyer_balance, _ = Balance.objects.get_or_create(user=self.buyer)
            if buyer_balance.amount < self.amount:
                raise ValidationError("Buyer does not have sufficient balance.")
            buyer_balance.amount -= self.amount
            buyer_balance.save()

            seller_balance, _ = Balance.objects.get_or_create(user=self.seller)
            seller_balance.amount += self.amount
            seller_balance.save()

    def __str__(self):
        return f"Payment from {self.buyer.username} to {self.seller.username} - {self.amount} ({self.status})"
