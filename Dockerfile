# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /arbicloud

# Copy package.json and package-lock.json to the container
COPY arbicloud/package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code to the container
COPY arbicloud .

# Build the React Vite app
RUN npx vite build

# Expose port 30 to the outside world
EXPOSE 30

# Command to run the application
CMD ["npx", "vite", "preview", "--host", "0.0.0.0"]

