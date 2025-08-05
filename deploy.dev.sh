#!/bin/bash

set -e
set -o pipefail

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log_step() {
    echo -e "${YELLOW}➡️  $1${NC}"
}

log_done() {
    echo -e "${GREEN}✅ $1 completed successfully.${NC}"
}

log_error() {
    echo -e "${RED}❌ Error: $1${NC}"
}

trap 'log_error "Script failed at step: $BASH_COMMAND"' ERR

log_step "Step 1: Building Docker images"
docker-compose -f docker-compose.dev.yml build
log_done "Docker build"

log_step "Step 2: Starting containers in detached mode"
docker-compose -f docker-compose.dev.yml up -d
log_done "Containers started"

log_step "Step 3: Cleaning up dangling Docker images"
docker image prune -f
log_done "Image cleanup"

log_step "Step 4: Running database migrations"
docker-compose -f docker-compose.dev.yml exec backend python manage.py makemigrations --noinput
docker-compose -f docker-compose.dev.yml exec backend python manage.py migrate --noinput
log_done "Database migrations"

log_step "Step 5: Running collectstatic"
docker-compose -f docker-compose.dev.yml exec backend python manage.py collectstatic --noinput
log_done "Static files collected"

echo -e "${GREEN}🎉 Local development deployment completed successfully!${NC}"
