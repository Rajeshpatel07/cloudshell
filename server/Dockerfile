# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

# Build the TypeScript application
RUN yarn build

# Stage 2: Production image
FROM node:18-alpine

WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock
COPY --from=builder /app/prisma ./prisma

# Install only production dependencies
RUN yarn install --production --frozen-lockfile

# Set the user and group to a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Set environment variables (using ARG and ENV for build-time and runtime)
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ARG PORT
ENV PORT=${PORT}
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV:-production}

# Generate prisma client
RUN yarn prisma generate

# Expose the port
EXPOSE $PORT

# Start the application
CMD ["yarn", "start"]
