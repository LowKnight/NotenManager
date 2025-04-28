# 1. Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

# Nur package.json und package-lock.json kopieren
COPY package*.json ./

# Dependencies installieren
RUN npm install

# Restlichen Code kopieren
COPY . .

# Production Build erstellen
RUN npm run build

# 2. Serve Stage
FROM nginx:stable-alpine

# Standard nginx Ordner leeren
RUN rm -rf /usr/share/nginx/html/*

# Build Output kopieren
COPY --from=builder /app/build /usr/share/nginx/html

# nginx.conf kopieren
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
