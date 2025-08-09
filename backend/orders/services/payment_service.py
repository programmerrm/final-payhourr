from django.contrib.auth import get_user_model
from django.db import transaction

User = get_user_model()

def get_admin_user():
    admin_user = User.objects.filter(is_superuser=True).select_for_update().first()
    if not admin_user:
        raise ValueError("No admin account found.")
    return admin_user

@transaction.atomic
def process_payment_on_create(order):
    """Buyer → Admin (Escrow)"""
    admin_user = get_admin_user()
    sender = User.objects.select_for_update().get(pk=order.sender.pk)

    if sender.balance < order.amount:
        raise ValueError("Insufficient balance in buyer's account.")

    sender.balance -= order.amount
    admin_user.balance += order.amount
    sender.save()
    admin_user.save()

@transaction.atomic
def release_payment_to_seller(order):
    """Admin → Seller"""
    admin_user = get_admin_user()
    receiver = User.objects.select_for_update().get(pk=order.receiver.pk)

    if admin_user.balance < order.amount:
        raise ValueError("Admin does not have enough balance to pay seller.")

    admin_user.balance -= order.amount
    receiver.balance += order.amount
    admin_user.save()
    receiver.save()

@transaction.atomic
def refund_to_buyer(order):
    """Admin → Buyer (Refund)"""
    admin_user = get_admin_user()
    sender = User.objects.select_for_update().get(pk=order.sender.pk)

    if admin_user.balance < order.amount:
        raise ValueError("Admin does not have enough balance to refund buyer.")

    admin_user.balance -= order.amount
    sender.balance += order.amount
    admin_user.save()
    sender.save()
