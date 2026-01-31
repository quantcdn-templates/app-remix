# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM ghcr.io/quantcdn-templates/app-node:latest

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3001

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Copy built application from builder stage
COPY --from=builder /app/build ./build

# Expose the application port
EXPOSE 3001

# Start the application
CMD ["npm", "run", "start"]
