from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

@csrf_exempt
def payment_callback(request):
    # Uddoktapay payment status POST kore
    data = request.POST
    # ekhane apni payment verification korben
    status = data.get('status')
    if status == 'success':
        # order confirm korun
        return HttpResponse('Payment success')
    else:
        return HttpResponse('Payment failed')
