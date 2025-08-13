from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from orders.models import Order
from orders.services.unique_order_id import UNIQUE_ORDER_ID_GENERATE
from orders.tasks import send_order_created_email

@receiver(pre_save, sender=Order)
def set_unique_order_id(sender, instance, **kwargs):
    if not instance.order_id:
        instance.order_id = UNIQUE_ORDER_ID_GENERATE()

@receiver(post_save, sender=Order)
def send_email_on_order_create(sender, instance, created, **kwargs):
    if created:
        send_order_created_email.delay(instance.id)
        