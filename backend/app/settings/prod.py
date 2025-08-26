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
SECRET_KEY = env('DJANGO_SECRET_KEY')

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': env('DATABASE_NAME'),
        'USER': env('DATABASE_USER_NAME'),
        'PASSWORD': env('DATABASE_PASSWORD'),
        'HOST': 'db',
        'PORT': '3306',
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
        },
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

# ========== CHANNEL LAYERS ==========
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [env('CELERY_BROKER_URL')],
        },
    },
}

# ========== FRONTEND DOMAIN ==========
FRONTEND_DOMAIN = env('FRONTEND_DOMAIN', default='https://payhourr.com')
BACKEND_DOMAIN = env('BACKEND_DOMAIN', default='https://api.payhourr.com')
