# Alpine OS specific version + Node.js specific version
FROM node:18-alpine3.16

# Global installations needed by our app
RUN npm i -g ts-node
RUN npm i -g nodemon

# Create the application folder
WORKDIR /app

# Copy only package.json and package-lock.json into /app
COPY package*.json /app

# Run npm i before copying the entire code to restore node_modules
RUN npm i

# Copy our application from current folder (.) to image working dir (/app)
COPY . /app

# Execute command
ENTRYPOINT npm run start:HotReloading
