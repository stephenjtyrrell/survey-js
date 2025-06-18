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

# Stage 3: Production image
FROM node:20-slim
WORKDIR /app

# Copy server code
COPY --from=build-server /app/server ./server
COPY server/index.js ./server/index.js
COPY server/index-sqlite.js ./server/index-sqlite.js
COPY server/migrate-to-sqlite.js ./server/migrate-to-sqlite.js
COPY server/survey.db ./server/survey.db
COPY server/responses.html ./server/responses.html
COPY server/responses.json ./server/responses.json

# Copy built frontend
COPY --from=build-frontend /app/dist ./public
COPY public/favicon.ico ./public/favicon.ico

# Expose port (adjust if your server uses a different port)
EXPOSE 3000

# Start the server
CMD ["node", "server/index.js"]
