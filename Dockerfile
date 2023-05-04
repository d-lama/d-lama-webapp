# Use the official Node.js base image
FROM node:latest AS build

# Set the working directory
WORKDIR /

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Use the official Nginx base image
FROM nginx:stable-alpine

# Copy the React app build output to the Nginx container
COPY --from=build /dist /usr/share/nginx/html

# Copy Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ./nginx-browserslist.map /etc/nginx/



# Expose port 4343 for HTTPS -> 443 in Kubernetes
EXPOSE 80
EXPOSE 443


# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
