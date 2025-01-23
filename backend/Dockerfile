# Use the official Node.js image as a base image
FROM node:16

# Set the working directory inside the container
WORKDIR /backend

# Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . ./backend

# Expose the port that your server will run on
EXPOSE 3000

# Command to start the server
CMD ["npm", "start"]
