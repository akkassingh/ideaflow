# => Build container
FROM node:latest as build

WORKDIR /ideaflow-client

COPY package.json /ideaflow-client/package.json

RUN npm install

RUN npm install react-scripts -g

COPY . /ideaflow-client

RUN npm run build

# => Run container
FROM nginx:1.16.0

COPY --from=build /ideaflow-client/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

# Start Nginx server
CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]