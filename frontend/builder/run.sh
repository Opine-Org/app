#!/usr/bin/env bash

# determine this files directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# set default value of config
if [ -z $1 ]
    then
        CONFIG="webpack.dev.client.js"
else
    CONFIG="$1"
fi

docker run \
    --rm \
    -t \
    -i \
    --name opinephp-frontend-dev \
    -v "$DIR/..":/app \
    opinephp/webpack \
    $CONFIG
