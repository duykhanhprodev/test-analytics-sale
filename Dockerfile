# Use the official Node.js image as the base image
FROM node:22-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy only package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies without generating unnecessary files (optional for production builds)
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Use a multi-stage build to reduce the final image size
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public
COPY --from=build /app/package*.json /app/
COPY --from=build /app/.env /app/.env
COPY --from=build /app/server.js /app/server.js

# Install only production dependencies
RUN npm install

# Expose the port on which your Next.js app runs
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
