#!/bin/bash

# Deploy script for web-studio
# Usage: ./deploy.sh [production|staging]

set -e

ENV=${1:-production}

echo "🚀 Starting deployment for $ENV environment..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check if docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed${NC}"
    exit 1
fi

# Check if docker-compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Pulling latest changes...${NC}"
git pull origin main

echo -e "${YELLOW}🛑 Stopping existing containers...${NC}"
docker-compose -f docker-compose.prod.yml down

echo -e "${YELLOW}🔨 Building new image...${NC}"
docker-compose -f docker-compose.prod.yml build --no-cache

echo -e "${YELLOW}🚀 Starting containers...${NC}"
docker-compose -f docker-compose.prod.yml up -d

echo -e "${YELLOW}🧹 Cleaning up old images...${NC}"
docker image prune -f

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${GREEN}🌐 Application is running at http://localhost${NC}"

echo -e "${YELLOW}📊 Container status:${NC}"
docker-compose -f docker-compose.prod.yml ps

echo -e "${YELLOW}📝 View logs:${NC}"
echo "docker-compose -f docker-compose.prod.yml logs -f"
