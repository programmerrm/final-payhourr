from rest_framework.permissions import BasePermission
from django.utils.translation import gettext_lazy as _

class IsSellerOrBuyer(BasePermission):
    """
    ✅ Allow access only to users with role 'seller' or 'buyer'
    """
    message = _('You must be a seller or buyer to perform this action.')

    def has_permission(self, request, view):
        return bool(
            request.user and 
            request.user.is_authenticated and 
            request.user.role in ['seller', 'buyer']
        )
