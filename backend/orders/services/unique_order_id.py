import random
from orders.models import Order

def UNIQUE_ORDER_ID_GENERATE():
    while True:
        order_id = ''.join(random.choices('0123456789', k=10))
        if not Order.objects.filter(order_id=order_id).exists():
            return order_id
        