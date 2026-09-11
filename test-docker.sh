#!/bin/bash

# Local testing script
# Usage: ./test-docker.sh

set -e

echo "🧪 Testing Docker build locally..."

echo "🔨 Building Docker image..."
docker build -t web-studio-test .

echo "🚀 Starting container..."
docker run -d --name web-studio-test -p 3000:3000 web-studio-test

echo "⏳ Waiting for container to be healthy..."
sleep 10

echo "🌐 Testing application..."
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Application is responding!"
else
    echo "❌ Application is not responding"
    docker logs web-studio-test
fi

echo "🛑 Stopping and removing test container..."
docker stop web-studio-test
docker rm web-studio-test

echo "🧹 Removing test image..."
docker rmi web-studio-test

echo "✅ Test completed!"
