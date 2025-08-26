from celery import shared_task
from django.utils import timezone
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from orders.models import Order
from orders.services.email_service import send_order_email
import logging

logger = logging.getLogger(__name__)

@shared_task(bind=True, max_retries=3, default_retry_delay=60)
def send_order_created_email(self, order_id):
    try:
        order = Order.objects.get(id=order_id)

        context = {
            "USER_NAME": order.sender.username,
            "ORDER_NUMBER": order.order_id or f"ORD-{order.id}",
            "ORDER_DATE": order.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            "TOTAL_AMOUNT": f"{order.amount:.2f}",
            "SERVICE_NAME": order.title,
            "YEAR": timezone.now().year,
        }

        html_message = render_to_string("emails/new-order.html", context)
        plain_message = strip_tags(html_message) 

        send_order_email(
            order,
            subject=f"New Order Created {order.title}",
            message=plain_message,
            html_message=html_message
        )

    except Order.DoesNotExist:
        logger.error(f"Order with id {order_id} does not exist.")
    except Exception as exc:
        logger.error(f"Error sending created email for Order #{order_id}: {str(exc)}")
        self.retry(exc=exc)

@shared_task(bind=True, max_retries=3, default_retry_delay=60)
def send_delivery_reminder_emails(self):
    now = timezone.now()
    pending_orders = Order.objects.filter(status='pending', reminder_sent=False)
    for order in pending_orders:
        try:
            total_duration = (order.delivery_time - order.created_at).total_seconds()
            time_left = (order.delivery_time - now).total_seconds()
            if abs(time_left - total_duration / 4) < 60:
                html_message = render_to_string('emails/order-reminder.html', {
                    'user_name': order.sender.username,
                    'order_number': order.order_id or f"ORD-{order.id}",
                    'order_date': order.created_at.strftime('%Y-%m-%d %H:%M:%S'),
                    'service_name': order.title,
                    'year': now.year,
                })
                plain_message = strip_tags(html_message)
                send_order_email(
                    order,
                    subject=f"Reminder: Order '{order.title}' nearing delivery time",
                    message=plain_message,
                    html_message=html_message
                )
                order.reminder_sent = True
                order.save(update_fields=['reminder_sent'])
        except Exception as exc:
            logger.error(f"Error sending reminder for Order #{order.id}: {str(exc)}")
            self.retry(exc=exc)

@shared_task(bind=True, max_retries=3, default_retry_delay=60)
def send_order_cancel_expired_email(self):
    now = timezone.now()
    expired_orders = Order.objects.filter(status='pending', delivery_time__lte=now)
    for order in expired_orders:
        try:
            order.status = 'cancelled'
            order.save(update_fields=['status'])
            
            html_message = render_to_string('emails/order-cancel.html', {
                'user_name': order.sender.username,
                'order_number': order.order_id or f"ORD-{order.id}",
                'order_date': order.created_at.strftime('%Y-%m-%d %H:%M:%S'),
                'service_name': order.title,
                'year': now.year,
            })
            plain_message = strip_tags(html_message)
            send_order_email(
                order,
                subject=f"Order Cancelled: {order.title}",
                message=plain_message,
                html_message=html_message
            )
            logger.info(f"Order {order.title} auto-cancelled and email sent.")
        except Exception as exc:
            logger.error(f"Failed to cancel or send email for Order #{order.id}: {exc}")
            self.retry(exc=exc)

@shared_task(bind=True, max_retries=3, default_retry_delay=60)
def send_order_status_email(self, order_id, status):
    try:
        order = Order.objects.get(id=order_id)
        subject = f"Order {order.title} {status.capitalize()}"
        message = f"Order Title: {order.title}\nAmount: {order.amount}\nStatus: {status.capitalize()}"
        send_order_email(order, subject=subject, message=message)
    except Order.DoesNotExist:
        logger.error(f"Order with id {order_id} does not exist.")
    except Exception as exc:
        logger.error(f"Error sending status email for Order #{order_id}: {str(exc)}")
        self.retry(exc=exc)
