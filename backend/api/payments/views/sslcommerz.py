import uuid
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from django.conf import settings
from permissions.user import IsSellerOrBuyer

class InitPaymentView(APIView):
    permission_classes = [IsSellerOrBuyer]

    def post(self, request):
        amount = request.data.get("amount")
        username = request.user.username
        email = request.data.get("email")
        currency = request.data.get("currency")
        title = request.data.get("title")
        tran_id = str(uuid.uuid4())

        phone = request.data.get("phone", "01234567890")

        payload = {
            "store_id": settings.SSLCZ_STORE_ID,
            "store_passwd": settings.SSLCZ_STORE_PASS,
            "total_amount": amount,
            "currency": currency,
            "tran_id": tran_id,
            "success_url": f"{settings.FRONTEND_DOMAIN}/dashboard/{username}/payment-success/{tran_id}",
            "fail_url": f"{settings.FRONTEND_DOMAIN}/dashboard/{username}/payment-fail",
            "cancel_url": f"{settings.FRONTEND_DOMAIN}/dashboard/{username}/payment-cancel",
            "emi_option": 0,
            "cus_name": username,
            "cus_email": email,
            "cus_phone": phone,
            "cus_add1": "Dhaka",
            "cus_city": "Dhaka",
            "cus_country": "Bangladesh",
            "shipping_method": "NO",
            "num_of_item": 1,
            "product_name": title,
            "product_category": "Service",
            "product_profile": "general",
        }

        try:
            response = requests.post(
                "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
                data=payload,
                timeout=10,
            )
            res_json = response.json()
            print("SSLCOMMERZ response:", res_json)

        except requests.RequestException as e:
            return Response({
                "success": False,
                "error": f"Payment initiation failed: {str(e)}"
            }, status=503)

        if res_json.get("status") == "SUCCESS":
            return Response({
                "payment_url": res_json.get("GatewayPageURL"),
                "tran_id": tran_id
            }, status=200)
        else:
            return Response({
                "success": False,
                "error": "Failed to initiate payment",
                "details": res_json
            }, status=400)
