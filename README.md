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
This sets up a local folder to store orchestration settings.
```sh
cd MyProject/orchestrate
sudo ./orchestrate.sh init-local
```

### Compose and Build Backend
The backend is based on the Opine-PHP API framework. These commands will run composer to install PHP depenendencies and run the opine build command for caching backend configurations.
```sh
cd MyProject/orchestrate
sudo ./orchestrate.sh compose-backend
sudo ./orchestrate.sh build-backend
```

### Compose and Build Frontend
This will start a webpack process to build the frontend application and watch for changes.
```sh
cd MyProject/orchestrate
sudo ./orchestrate.sh build-frontend
```

### Running
This will start the docker container for the application server.  The permissions command ensures that your local user and the www-data user can access the same files and that files have the permissions expected by the application server. Because this command adds a group to your current logged in user, you will have to relogin to Ubuntu after running "permissions" for the first time.

```sh
cd MyProject/orchestrate
sudo ./orchestrate.sh permissions
sudo ./orchestrate.sh start
```

### Accessing Database
This section is protected by an http password. Run "orchestrate.sh htpasswd {SOMEPASSWORD}" to set the password. The username will always be "admin".

https://localhost/adminer.php

### Accessing Logs
https://localhost/log/nginx.log

https://localhost/log/fpm.log

https://localhost/log/nodejs.log

https://localhost/log/pgsql.log
