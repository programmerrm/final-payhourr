import requests
from django.conf import settings
from django.shortcuts import redirect
from django.http import HttpResponse

def start_payment(request):
    data = {
        'merchant_id': settings.UDDOKTAPAY_MERCHANT_ID,
        'amount': 500,  # Payment amount
        'order_id': 'ORDER123',
        'callback_url': request.build_absolute_uri('/payments/callback/'),
    }

    response = requests.post('https://uddoktapay.com/api/initiate', json=data)
    if response.status_code == 200:
        payment_url = response.json().get('payment_url')
        return redirect(payment_url)
    else:
        return HttpResponse("Payment initiate korte problem hoyeche.")
