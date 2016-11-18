FROM opinephp/application

# add sample application
ADD backend /app/backend
ADD frontend /app/frontend

RUN chown www-data /app/* -R

EXPOSE 80
EXPOSE 443

ENTRYPOINT ["/usr/bin/supervisord", "--nodaemon"]
