import uuid
import requests
from django.conf import settings
from django.db import transaction
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from payments.models import Deposit
from orders.models import Order
from permissions.user import IsSellerOrBuyer
from django.contrib.auth import get_user_model

User = get_user_model()

class InitPaymentView(APIView):
    permission_classes = [IsAuthenticated, IsSellerOrBuyer]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        user = request.user
        data = request.data

        # User input
        receiver_id = data.get("receiver")
        title = data.get("title")
        requirement = data.get("requirement")
        delivery_time = data.get("delivery_time")
        reference_file = request.FILES.get("reference_file")
        amount = data.get("amount")
        currency = data.get("currency", "BDT")
        email = data.get("email")

        tran_id = str(uuid.uuid4())

        try:
            receiver = User.objects.get(id=receiver_id)
        except User.DoesNotExist:
            return Response({
                "success": False,
                "error": "Receiver not found."
            }, status=400)

        # ------------------- Create PENDING Deposit & Order ------------------- #
        try:
            with transaction.atomic():
                deposit = Deposit.objects.create(
                    user=user,
                    amount=amount,
                    status=Deposit.STATUS_PENDING,
                    transaction_id=tran_id
                )

                order = Order.objects.create(
                    sender=user,
                    receiver=receiver,
                    title=title,
                    requirement=requirement,
                    amount=amount,
                    payment_type="sslcommerz",
                    delivery_time=delivery_time,
                    reference_file=reference_file,
                    status='pending'
                )
        except Exception as e:
            return Response({
                "success": False,
                "error": f"Failed to create deposit/order: {str(e)}"
            }, status=500)

        # ------------------- Prepare SSLCommerz payload ------------------- #
        payload = {
            "store_id": settings.SSLCZ_STORE_ID,
            "store_passwd": settings.SSLCZ_STORE_PASS,
            "total_amount": amount,
            "currency": currency,
            "tran_id": tran_id,
            "success_url": f"{settings.FRONTEND_DOMAIN}/dashboard/{user.username}/payment-success/{tran_id}/?amount={amount}&receiver_id={receiver_id}",
            "fail_url": f"{settings.FRONTEND_DOMAIN}/dashboard/{user.username}/payment-fail/",
            "cancel_url": f"{settings.FRONTEND_DOMAIN}/dashboard/{user.username}/payment-cancel/",
            "emi_option": 0,
            "cus_name": user.username,
            "cus_email": email,
            "cus_phone": "01XXXXXXXXX",
            "cus_add1": "Dhaka",
            "cus_city": "Dhaka",
            "cus_country": "Bangladesh",
            "shipping_method": "NO",
            "num_of_item": 1,
            "product_name": title,
            "product_category": "Service",
            "product_profile": "general",
        }

        # ------------------- Call SSLCommerz API ------------------- #
        try:
            response = requests.post(
                "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
                data=payload,
                timeout=10
            )
            res_json = response.json()
        except requests.RequestException as e:
            return Response({
                "success": False,
                "error": f"Payment initiation failed: {str(e)}"
            }, status=503)

        if res_json.get("status") != "SUCCESS":
            # Payment initiation failed
            deposit.status = Deposit.STATUS_FAILED
            order.status = Order.STATUS_FAILED
            deposit.save()
            order.save()

            return Response({
                "success": False,
                "error": "Payment initiation failed",
                "details": res_json
            }, status=400)

        # Payment initiated successfully
        # Deposit & Order remain PENDING until user completes payment
        print(f"Payment INITIATED successfully for tran_id: {tran_id}")

        return Response({
            "success": True,
            "message": "Payment initiation successful. Please complete payment at GatewayPageURL",
            "payment_url": res_json.get("GatewayPageURL"),
            "tran_id": tran_id,
            "deposit_id": deposit.id,
            "order_id": order.id
        }, status=200)
