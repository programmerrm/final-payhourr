#########################################################
"""
Development settings configuration
"""
#########################################################
from app.settings.base import *
from datetime import timedelta

DEBUG =True
ALLOWED_HOSTS = ['*']
SECRET_KEY = 'django-insecure-ie75-++_k&c+)2$#)5hl*g^kwy$5mjj+%318%%wfe3!(yb#3i#'

INSTALLED_APPS += [
    'drf_spectacular',
    'drf_spectacular_sidecar',
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

CSRF_TRUSTED_ORIGINS = [
    'http://localhost:5173',
    'http://localhost:3001',
    'http://127.0.0.1:8000',
    'https://payhourr.com',
    'https://api.payhourr.com',
]

CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://localhost:3001',
    'http://127.0.0.1:8000',
    'https://payhourr.com',
    'https://api.payhourr.com',
]

REST_FRAMEWORK['DEFAULT_SCHEMA_CLASS'] = 'drf_spectacular.openapi.AutoSchema'

SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'] = timedelta(days=7)
SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'] = timedelta(days=30)

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels.layers.InMemoryChannelLayer',
    },
}

SPECTACULAR_SETTINGS = {
    'TITLE': 'Payhour Project API',
    'DESCRIPTION': 'This is the API documentation for the development version of the Payhour project. '
                   'It provides endpoints for authentication, user management, and business logic that power '
                   'the dashboard and client-facing features during the development phase.',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
    'SWAGGER_UI_DIST': 'SIDECAR',
    'SWAGGER_UI_FAVICON_HREF': 'SIDECAR',
    'REDOC_DIST': 'SIDECAR',
}
