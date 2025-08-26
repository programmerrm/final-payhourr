#!/bin/bash
set -e

echo "🎨 Step 1: Building React frontend..."
docker-compose -f docker-compose.prod.yml run --rm frontend npm install
docker-compose -f docker-compose.prod.yml run --rm frontend npm run build

echo "📦 Step 2: Building Docker images..."
docker-compose -f docker-compose.prod.yml build

echo "🚀 Step 3: Starting containers in detached mode..."
docker-compose -f docker-compose.prod.yml up -d

echo "🧹 Step 4: Cleaning up dangling Docker images..."
docker image prune -f

echo "📂 Step 5: Running database migrations..."
docker-compose -f docker-compose.prod.yml exec backend python manage.py makemigrations --noinput
docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate --noinput

echo "📂 Step 6: Running collectstatic..."
docker-compose -f docker-compose.prod.yml exec backend python manage.py collectstatic --noinput

echo "🔑 Step 7: Creating Django superuser (if not exists)..."
docker-compose -f docker-compose.prod.yml exec -T backend python manage.py shell <<EOF
from django.contrib.auth import get_user_model
import os

User = get_user_model()
username = os.getenv('DJANGO_SUPERUSER_USERNAME', 'admin')
email = os.getenv('DJANGO_SUPERUSER_EMAIL', 'admin@example.com')
password = os.getenv('DJANGO_SUPERUSER_PASSWORD', 'adminpass')
first_name = os.getenv('DJANGO_SUPERUSER_FIRSTNAME', '')
last_name = os.getenv('DJANGO_SUPERUSER_LASTNAME', '')

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(
        username=username,
        email=email,
        password=password,
        first_name=first_name,
        last_name=last_name
    )
    print("✅ Superuser created successfully!")
else:
    print("ℹ️ Superuser already exists.")
EOF

echo "🔍 Step 8: Validating Nginx configuration..."
docker-compose -f docker-compose.prod.yml exec nginx nginx -t

echo "🔁 Step 9: Reloading Nginx gracefully..."
docker-compose -f docker-compose.prod.yml exec nginx nginx -s reload

echo "✅ Production Deployment completed successfully!"
