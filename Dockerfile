# Fetching the latest node image on apline linux
FROM node:alpine AS builder

# Set the working directory
WORKDIR /

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the application
RUN npm run build

# Fetching the latest nginx image
FROM nginx

# Copy the built application files from the Node.js image to the NGINX HTML directory
COPY --from=builder /dist /usr/share/nginx/html

# Copy the new NGNIX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port that NGINX will run on
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
