Universal React PHP App
=======================

### Installation
The installation process assumes you are running Ubuntu Linux.

```sh
mkdir MyProject
cd MyProject
git --git-dir=/dev/null clone --depth=1 git@github.com:ryan-mahoney/universal-react-php-app.git app
git --git-dir=/dev/null clone --depth=1 git@github.com:ryan-mahoney/orchestrate.git
```

### Initial Configuration
```sh
cd MyProject/orchestrate
sudo ./orchestrate.sh init-local
```

### Compose and Build Backend
```sh
cd MyProject/orchestrate
sudo ./orchestrate.sh compose-backend
sudo ./orchestrate.sh build-backend
```

### Compose and Build Frontend
```sh
cd MyProject/orchestrate
sudo ./orchestrate.sh build-frontend
```

### Running
```sh
cd MyProject/orchestrate
sudo ./orchestrate.sh permissions
sudo ./orchestrate.sh start
```

### Accessing Database
https://localhost/adminer.php

### Accessing Logs
https://localhost/log/nginx.log

https://localhost/log/fpm.log

https://localhost/log/nodejs.log

https://localhost/log/pgsql.log
