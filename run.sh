#!/usr/bin/env bash

# determine this files directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

ENV="local"
if [ $# -eq 1 ]
  then
    ENV=$1
fi

docker run \
    --name opinephp-server \
    -p 80:80 \
    -p 443:443 \
    -v "$DIR":/app \
    -v "$DIR/../persistent":/media/persistent \
    -e OPINE_ENV="$ENV" \
    -d opinephp/application
