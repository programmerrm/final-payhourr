from rest_framework import viewsets, response, permissions
from django.db.models import Sum, Q
from orders.models import Order
from chat.models import Connected, Dispute
from payments.models import Deposit, Withdraw, Payment

class BuyerDashboardInfoViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        user = request.user
        # Total Balance
        total_balance = user.balance
        # Total Spent
        total_spent = Deposit.objects.filter(user=user, status='approved').aggregate(
            total=Sum('amount')
        )['total'] or 0
        # Orders
        total_orders = Order.objects.filter(sender=user).count()
        pending_orders = Order.objects.filter(sender=user, status='pending').count()
        completed_orders = Order.objects.filter(sender=user, status='completed').count()
        cancelled_orders = Order.objects.filter(sender=user, status='cancel').count()
        # Total Transactions (Payments + Deposits + Withdraws)
        payment_count = Payment.objects.filter(Q(buyer=user) | Q(seller=user)).count()
        deposit_count = Deposit.objects.filter(user=user).count()
        withdraw_count = Withdraw.objects.filter(user=user).count()
        total_transactions = payment_count + deposit_count + withdraw_count

        # Total withdraw
        total_withdraw = Withdraw.objects.filter(user=user).aggregate(
            total=Sum('amount')
        )['total'] or 0

        # Total deposits
        total_deposit = Deposit.objects.filter(user=user).aggregate(
    total=Sum('amount')
)['total'] or 0


        # Connected Sellers
        connected = Connected.objects.filter(user=user).first()
        connected_sellers = connected.connected_users.count() if connected else 0
        # Total Disputes
        total_disputes = Dispute.objects.filter(
            Q(raised_by=user) | Q(against_user=user)
        ).count()

        data = {
            'total_balance': total_balance,
            'total_spent': total_spent,
            'total_orders': total_orders,
            'pending_orders': pending_orders,
            'completed_orders': completed_orders,
            'cancelled_orders': cancelled_orders,
            'total_withdraw': total_withdraw,
            'total_deposit': total_deposit,
            'total_transactions': total_transactions,
            'connected_sellers': connected_sellers,
            'total_disputes': total_disputes
        }

        return response.Response(data)
