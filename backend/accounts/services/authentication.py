"""
Custome JWT Authentication
"""
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed
from accounts.models import BlockedToken
from django.utils.translation import gettext_lazy as _

class CustomJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        result = super().authenticate(request)
        if result is None:
            return None 

        user, auth = result

        token = request.META.get('HTTP_AUTHORIZATION')
        if token and BlockedToken.objects.filter(token=token).exists():
            raise AuthenticationFailed(_('This token has been blacklisted.'))

        return user, auth
