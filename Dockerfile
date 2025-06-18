# Stage 1: Build Angular frontend
FROM node:20 AS build-frontend
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY ./src ./src
COPY angular.json tsconfig*.json ./
RUN npm run build -- --output-path=dist

# Stage 2: Build server
FROM node:20 AS build-server
WORKDIR /app
COPY server/package.json server/package-lock.json ./server/
RUN cd server && npm install
COPY server ./server

# Stage 3: Production image
FROM node:20-slim
WORKDIR /app

# Copy server code
COPY --from=build-server /app/server ./server

# Copy built frontend (from dist/browser to public)
COPY --from=build-frontend /app/dist/browser ./public

# Expose port
EXPOSE 3001

# Start the server
CMD ["node", "server/index.js"]
