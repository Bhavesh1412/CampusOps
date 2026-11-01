FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
COPY backend/package*.json ./backend/
WORKDIR /app/backend
RUN npm ci --omit=dev
COPY backend/src ./src
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "src/server.js"]
