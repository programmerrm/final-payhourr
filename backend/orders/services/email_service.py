from django.core.mail import send_mail
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

def send_order_email(order, subject, message, html_message=None):
    recipients = [order.sender.email, order.receiver.email]
    try:
        send_mail(
            subject,
            message,
            settings.EMAIL_HOST_USER,
            recipients,
            html_message=html_message,
            fail_silently=False,
        )
    except Exception as e:
        logger.error(f"Failed to send email for Order #{order.id}: {str(e)}")
        raise e
