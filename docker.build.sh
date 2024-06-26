#!/bin/bash

NODE_ENV=$1 
KPI_FILE_PATH_PRODUCTION=$2  

docker build -t enlyze-kpi-app \
  --build-arg NODE_ENV="$NODE_ENV" \
  --build-arg KPI_FILE_PATH_PRODUCTION="$KPI_FILE_PATH_PRODUCTION" .

echo "Image 'enlyze-kpi-app' built successfully!"

