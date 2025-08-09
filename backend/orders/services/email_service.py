import os
from django.core.mail import send_mail
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

def send_order_email(order, subject, message):
    recipients = [order.sender.email, order.receiver.email]
    try:
        send_mail(
            subject,
            message,
            settings.EMAIL_HOST_USER,
            recipients,
            fail_silently=False,
        )
    except Exception as e:
        logger.error(f"Failed to send email for Order #{order.id}: {str(e)}")
        # Depending on requirements, you can raise or pass
        raise e
