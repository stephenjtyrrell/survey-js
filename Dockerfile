# Stage 1: Build Angular frontend
FROM node:20 AS build-frontend
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY ./src ./src
COPY angular.json tsconfig*.json ./
RUN npm run build -- --output-path=dist

# Stage 2: Build server
FROM node:20 AS build-server
WORKDIR /app
COPY server/package.json server/package-lock.json ./server/
RUN cd server && npm ci --omit=dev
COPY server ./server

# Stage 3: Production image
FROM node:20-slim
LABEL maintainer="Stephen Tyrrell stetyrrell132@gmail.com"
LABEL description="Optimized SurveyJS full stack app"
WORKDIR /app

# Copy server code and only production dependencies
COPY --from=build-server /app/server ./server

# Copy built frontend (from dist/browser to public)
COPY --from=build-frontend /app/dist/browser ./public

# Add a non-root user
RUN useradd -m appuser && chown -R appuser /app
USER appuser

# Expose port
EXPOSE 3001

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD curl -f http://localhost:3001/api/response || exit 1

# Start the server
CMD ["node", "server/index.js"]
