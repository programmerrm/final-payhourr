#!/bin/bash
set -e

# Load environment variables
export $(grep -v '^#' backend/.env.prod | xargs)

echo "📦 Step 1: Build Docker images..."
docker-compose -f docker-compose.prod.yml build

echo "🚀 Step 2: Start containers..."
docker-compose -f docker-compose.prod.yml up -d

echo "🧹 Step 3: Clean up dangling Docker images..."
docker image prune -f

echo "📂 Step 4: Database migrations..."
docker-compose -f docker-compose.prod.yml exec backend python manage.py makemigrations --noinput
# Skip migrations for tables that already exist
docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate --fake-initial

echo "📂 Step 5: Collect static files..."
docker-compose -f docker-compose.prod.yml exec backend python manage.py collectstatic --noinput

echo "🔑 Step 6: Create Django superuser..."
docker-compose -f docker-compose.prod.yml exec -T backend python manage.py shell <<EOF
from django.contrib.auth import get_user_model

User = get_user_model()
username = 'payhourr'
email = 'payhourr@gmail.com'
password = 'payhourr77$'
first_name = 'Pay'
last_name = 'Hourr'

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

echo "🔍 Step 7: Validate Nginx configuration..."
docker-compose -f docker-compose.prod.yml exec nginx nginx -t

echo "🔁 Step 8: Reload Nginx gracefully..."
docker-compose -f docker-compose.prod.yml exec nginx nginx -s reload

echo "✅ Production deployment completed successfully!"
