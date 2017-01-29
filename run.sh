#!/usr/bin/env bash

# determine this files directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

ENV="local"
if [ $# -eq 1 ]
then
    ENV=$1
fi

PERSISTENT_DIR="$DIR/../persistent"
if [ $ENV != "local" ]
then
    docker pull opinephp/application
    mkdir -p /app/persistent
    PERSISTENT_DIR="/app/persistent"
else
    mkdir -p "$PERSISTENT_DIR"/log
fi

docker run \
    --name opinephp-server \
    -p 80:80 \
    -p 443:443 \
    -v "$DIR":/app \
    -v "$PERSISTENT_DIR":/media/persistent \
    -e OPINE_ENV="$ENV" \
    -d opinephp/application
