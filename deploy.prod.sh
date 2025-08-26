#!/bin/bash
set -e

export $(grep -v '^#' backend/.env.prod | xargs)

echo "📦 Step 1: Build Docker images..."
docker-compose -f docker-compose.prod.yml build

echo "🚀 Step 2: Start containers..."
docker-compose -f docker-compose.prod.yml up -d

echo "🧹 Step 3: Clean up dangling Docker images..."
docker image prune -f

echo "📂 Step 4: Database migrations..."
docker-compose -f docker-compose.prod.yml exec backend python manage.py makemigrations --noinput
docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate --noinput

echo "📂 Step 5: Collect static files..."
docker-compose -f docker-compose.prod.yml exec backend python manage.py collectstatic --noinput

echo "🔍 Step 6: Validate Nginx configuration..."
docker-compose -f docker-compose.prod.yml exec nginx nginx -t

echo "🔁 Step 7: Reload Nginx gracefully..."
docker-compose -f docker-compose.prod.yml exec nginx nginx -s reload

echo "✅ Production deployment completed successfully!"
