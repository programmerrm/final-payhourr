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
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY')

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

SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'] = timedelta(minutes=5)
SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'] = timedelta(days=1)

# ========== CELERY ==========
CELERY_BROKER_URL = env('CELERY_BROKER_URL')
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = 'Asia/Dhaka'

CELERY_RESULT_BACKEND = env('CELERY_RESULT_BACKEND')

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [(env('CELERY_BROKER_URL_HOST', 'redis'), 6379)],
        },
    },
}

# ========== FRONTEND DOMAIN ==========
FRONTEND_DOMAIN = env('FRONTEND_DOMAIN', default='https://payhourr.com')
BACKEND_DOMAIN = env('BACKEND_DOMAIN', default='https://api.payhourr.com')
