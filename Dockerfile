# Use the official Node.js image as the base image
FROM node:14 AS build

# Set the working directory
WORKDIR /

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the application
RUN npm run build -- --outDir dist

# Use the official NGINX image as the base image for the second stage
FROM nginx:stable-alpine

# Remove the default NGINX configuration
RUN rm /etc/nginx/nginx.conf

# Copy the new NGNIX configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built application files from the Node.js image to the NGINX HTML directory
COPY --from=0 /dist/ /var/www/d-lama-webapp/

# Copy the custom NGINX configuration file for the application
COPY d-lama-webapp /etc/nginx/sites-available/

# Create a symlink to enable the site
RUN mkdir -p /etc/nginx/sites-enabled/ && ln -s /etc/nginx/sites-available/d-lama-webapp /etc/nginx/sites-enabled/

# Expose the port that NGINX will run on
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
