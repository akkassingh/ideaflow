FROM nginx:stable-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx.conf /etc/nginx/conf.d

# Start nginx server
CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]