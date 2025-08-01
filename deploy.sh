#!/bin/bash

set -e

echo "📦 Step 1: Building Docker images..."
docker-compose -f docker-compose.prod.yml build

echo "🚀 Step 2: Starting containers in detached mode..."
docker-compose -f docker-compose.prod.yml up -d

echo "🧹 Step 3: Cleaning up dangling Docker images..."
docker image prune -f

echo "📂 Step 4: Running database migrations..."
docker-compose -f docker-compose.prod.yml exec backend python manage.py makemigrations --noinput
docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate --noinput

echo "📂 Step 5: Running collectstatic..."
docker-compose -f docker-compose.prod.yml exec backend python manage.py collectstatic --noinput

echo "🔍 Step 6: Validating Nginx configuration..."
docker-compose -f docker-compose.prod.yml exec nginx nginx -t

echo "🔁 Step 7: Reloading Nginx gracefully..."
docker-compose -f docker-compose.prod.yml exec nginx nginx -s reload

echo "✅ Deployment completed successfully!"
