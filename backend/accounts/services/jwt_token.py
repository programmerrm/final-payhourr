from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.functional import SimpleLazyObject

def JWT_TOKEN(user):
    print("JWT_TOKEN received user:", user, type(user))

    if isinstance(user, SimpleLazyObject):
        user = user._wrapped

    refresh = RefreshToken.for_user(user)
    return {
        'refresh_token': str(refresh),
        'access_token': str(refresh.access_token),
    }
