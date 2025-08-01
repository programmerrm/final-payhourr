#!/bin/sh

echo "🚀 Starting Django migrations..."

python manage.py makemigrations
python manage.py migrate

echo "✅ Migrations done. Starting Gunicorn..."

exec gunicorn your_project_name.wsgi:application --bind 0.0.0.0:8000 --workers 3
