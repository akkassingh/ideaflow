# Stage-1 & spacify a name 'builder'
FROM  node:latest AS builder

# Create a directory  and go to directory 
WORKDIR /app

# Copy the package.json file to my current directory for install necessary dependence  
COPY package.json .

# Install the dependence
RUN npm install

# Copy other file to my current directory
COPY . .

# Build optimise static file
RUN npm run build

# Stage-2
FROM ngnix:1.25.2-alpine-slim

# Copy static file to my nignx folder for serve static contain
COPY --from=builder /app/build /usr/share/ngnix/html

# Open the port for react
EXPOSE 80
EXPOSE 5101
EXPOSE 3000

# Run ngnix in foreground
CMD ["ngnix", "-g", "daemon off;"]