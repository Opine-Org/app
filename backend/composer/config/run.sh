#!/usr/bin/env bash

runuser -s /bin/bash www-data -c "composer --ansi $1"
