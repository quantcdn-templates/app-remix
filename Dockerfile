# Build stage - runs natively (not emulated) for faster builds
ARG NODE_VERSION=22
ARG BUILDPLATFORM=linux/amd64
FROM --platform=$BUILDPLATFORM node:${NODE_VERSION}-bookworm-slim AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm ci

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Install production dependencies only (in builder stage to avoid QEMU issues)
RUN rm -rf node_modules && npm ci --omit=dev

# Production stage
FROM ghcr.io/quantcdn-templates/app-node:${NODE_VERSION}

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3001

WORKDIR /app

# Copy package files and node_modules from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Copy built application from builder stage
COPY --from=builder /app/build ./build

# Expose the application port
EXPOSE 3001

# Start the application
CMD ["npm", "run", "start"]
