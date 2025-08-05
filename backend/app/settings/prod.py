#########################################################
"""
Production settings configuration
"""
#########################################################
from app.settings.base import *
from datetime import timedelta

DEBUG = False
ALLOWED_HOSTS = [
    'payhourr.com', 
    'api.payhourr.com'
]
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', None)

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

CSRF_TRUSTED_ORIGINS = [
    'https://payhourr.com',
    'https://api.payhourr.com',
]

CORS_ALLOWED_ORIGINS = [
    'https://payhourr.com',
    'https://api.payhourr.com',
]

SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'] = timedelta(min=5)
SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'] = timedelta(days=1)

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [('127.0.0.1', 6379)],
        },
    },
}
