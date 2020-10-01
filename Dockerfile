FROM nginx

RUN rm -rf node_modules/
COPY ./public /usr/share/nginx/html
RUN chown -R nginx:nginx /usr/share/nginx/html