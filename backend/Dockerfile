# Step 1: Use an official Node.js runtime as the base image
FROM node:18

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install
RUN npm install express sqlite3 cors

# Step 5: Copy the rest of the application code into the container
COPY . .

# Step 6: Expose the port that the app will run on
EXPOSE 5000

# Step 7: Start the application
CMD ["node", "server.js"]
