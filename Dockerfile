# Use a Node.js image as the base
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Set environment variables
ENV VITE_HOST=https://midterm-2itxykb6ra-et.a.run.app
ENV VITE_WS_HOST=ws://midterm-2itxykb6ra-et.a.run.app

# Copy package.json and yarn.lock to the working directory
COPY package.json ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the app's source code to the working directory
COPY . .

# Build the app
RUN yarn build

# Use a lighter-weight image to serve the app
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the built app from the previous stage
COPY --from=build /app/dist /app

# Expose port 8080
EXPOSE 8080

# Command to run the app
CMD ["npx", "serve", "-s", "-l", "8080"]
