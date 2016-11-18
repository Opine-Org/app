#!/usr/bin/env bash

# determine this files directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

rm -rf $DIR/../vendor
rm -f $DIR/../composer.lock
docker run --rm -v "$DIR/../":/app opinephp/backendcomposer install
