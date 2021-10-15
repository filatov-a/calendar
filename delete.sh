#!/bin/bash

echo "before delete\n"
docker images
echo "\n"
docker ps -a
echo "\n"

echo "deleting...\n"
docker-compose down
docker rm -f calendar_db calendar_nodejs
docker rmi -f calendar_nodejs mysql

echo "after delete\n"
docker images
echo "\n"
docker ps -a
echo "\n"
