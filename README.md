# fruppeltier

Fruppeltier Website

## Development
#### If needed generate node_modules. But styles and stuff is in git.
#### Use Docker for creating node_modules and remove container afterwards if needed
```
docker-compose up node_modules && docker-compose rm -f
```
#### Use npm for node_modules on your system
```
npm ci
```
#### Webserver if needed
```
docker-compose up nginx_dev
```

## Production
#### Designed for running with letsencrypt and jwilder nginx reverse proxy
##### Important: jwilder reverse proxy need to be in the same network!!
```
docker-compose up -d nginx_prod
```
#### Docker build command
```
docker build -t fruppeltier_nginx_prod .
```
#### Docker run command when jwilder reverse proxy is running in user space network
```
docker run --name nginx_fruppeltier -d \
    --hostname fruppeltier.de \
    --restart always \
    -e VIRTUAL_HOST=fruppeltier.de \
    -e LETSENCRYPT_HOST=fruppeltier.de" \
    -e LETSENCRYPT_EMAIL=someonesmail@butnotmy.com" \
    fruppeltier
```