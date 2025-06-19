# Stage 1: Build Angular frontend
FROM node:20-alpine AS build-frontend
WORKDIR /app
COPY package*.json ./
COPY src ./src
COPY angular.json ./
COPY tsconfig*.json ./
RUN npm ci
RUN npm run build -- --configuration=production
RUN ls -l /app/dist && ls -l /app/dist/surveyjs || true && ls -l /app/dist/browser || true

# Stage 2: Build backend
FROM node:20-alpine AS build-backend
WORKDIR /app
COPY server/package*.json ./server/
RUN cd server && npm ci --only=production

# Stage 3: Final image
FROM node:20-alpine
WORKDIR /app
COPY --from=build-frontend /app/dist/surveyjs/browser ./public
COPY --from=build-backend /app/server/node_modules ./server/node_modules
COPY server ./server
ENV NODE_ENV=production
ENV PORT=10000
EXPOSE 10000
CMD ["node", "server/index.js"]
