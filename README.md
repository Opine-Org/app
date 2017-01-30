Universal React PHP App
=======================

### Installation
The installation process assumes you are running Ubuntu Linux.

```sh
mkdir myapp
cd myapp
git clone git@github.com:Opine-Org/app.git
git clone git@github.com:Opine-Org/microserver.git
git clone git@github.com:Opine-Org/deployer.git
```

### Initial Configuration
```sh
cd myapp/orchestrate
sudo ./deploy.sh init-local
sudo ./deploy.sh id-make
sudo ./deploy.sh htpasswd <PASSWD>
```

### Compose and Build Backend
```sh
sudo myapp/app/backend/composer/run.sh build
sudo myapp/app/backend/builder/run.sh
```

### Compose and Build Frontend
```sh
sudo ~/Projects/opine/app/frontend/builder/run.sh
```

### Running
```sh
cd myapp
sudo ./run.sh
sudo docker logs opinephp-server
```

### Deploying
```sh
cd myapp/orchestrate
sudo ./orchestrate.sh id-public
sudo ./orchestrate.sh set-remote-addr <IP>
sudo ./orchestrate.sh init-remote
sudo ./orchestrate.sh deploy
```

### Accessing Database
https://localhost/adminer.php

### Accessing Logs
https://localhost/log/nginx.log

https://localhost/log/fpm.log

https://localhost/log/nodejs.log

https://localhost/log/pgsql.log
