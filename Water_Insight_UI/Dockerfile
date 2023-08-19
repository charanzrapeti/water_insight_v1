# Use the official Node.js image as the base image
FROM node:18

# Set the working directory
WORKDIR /waterinsight_frontend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# ENV BACKEND_URL="http://localhost:4000/api"

# Build the React app
RUN npm run build

# Expose port 5000
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]