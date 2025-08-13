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

echo "🔍 Step 7: Validating Nginx configuration..."
docker-compose -f docker-compose.prod.yml exec nginx nginx -t

echo "🔁 Step 8: Reloading Nginx gracefully..."
docker-compose -f docker-compose.prod.yml exec nginx nginx -s reload

echo "✅ Production Deployment completed successfully!"
