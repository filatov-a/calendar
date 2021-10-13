#!/bin/bash

echo "Starting...\n"

docker-compose up -d --build

sleep 2

echo "docker images\n"
docker images
echo "\n"

echo "docker ps -a\n"
docker ps -a
echo "\n"

docker logs -f calendar_nodejs
