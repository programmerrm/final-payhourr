from celery import shared_task
from django.utils import timezone
from orders.models import Order
from orders.services.email_service import send_order_email
import logging

logger = logging.getLogger(__name__)

@shared_task(bind=True, max_retries=3, default_retry_delay=60)
def send_delivery_reminder_emails(self):
    now = timezone.now()
    pending_orders = Order.objects.filter(status='pending', reminder_sent=False)

    for order in pending_orders:
        try:
            total_duration = (order.delivery_time - order.created_at).total_seconds()
            time_left = (order.delivery_time - now).total_seconds()

            # Check if time_left is close to 1/4th of total_duration (within 1 minute)
            if abs(time_left - total_duration / 4) < 60:
                send_order_email(
                    order,
                    subject=f"Reminder: Order #{order.id} nearing delivery time",
                    message=(
                        f"Dear User,\n\n"
                        f"Your order '{order.title}' is approaching its delivery deadline.\n"
                        f"Delivery Time: {order.delivery_time}\n\n"
                        f"Please ensure all work is completed on time.\n\nThank you!"
                    ),
                )
                order.reminder_sent = True
                order.save(update_fields=['reminder_sent'])
        except Exception as exc:
            logger.error(f"Error sending reminder for Order #{order.id}: {str(exc)}")
            self.retry(exc=exc)
