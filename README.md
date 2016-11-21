App Demo
========
# Installation
The installation process assumes you are running Ubuntu Linux.

```sh
mkdir -p ~/Projects
mkdir -p ~/Projects/opine
cd ~/Projects/opine
git clone git@github.com:Opine-Org/app.git
git clone git@github.com:Opine-Org/microserver.git
git clone git@github.com:Opine-Org/deployer.git
```

# Initial Configuration
```sh
cd ~/Project/opine/deployer
sudo ./deploy.sh init-local
sudo ./deploy.sh id-make
sudo ./deploy.sh htpasswd <PASSWD>
```

# Compose and Build Backend
```sh
sudo ~/Projects/opine/app/backend/composer/run.sh build
sudo ~/Projects/opine/app/backend/builder/run.sh
```

# Compose and Build Frontend
```sh
sudo ~/Projects/opine/app/frontend/builder/run.sh
```

# Running
```sh
cd ~/Projects/opine/app
sudo ./run.sh
sudo docker logs opinephp-server
```

# Deploying
```sh
cd ~/Project/opine/deployer
sudo ./deploy.sh id-public
sudo ./deploy.sh set-remote-addr <IP>
sudo ./deploy.sh init-remote
sudo ./deploy.sh deploy
```

# Access DB
https://localhost/adminer.php

# Access Logs
https://localhost/log/nginx.log

https://localhost/log/fpm.log

https://localhost/log/nodejs.log

https://localhost/log/pgsql.log
