# 1. Build Stage
FROM node:20 AS builder

WORKDIR /app

# Nur package.json und package-lock.json kopieren
COPY noten-manager-frontend/package*.json ./
RUN npm install

# Quellcode kopieren
COPY noten-manager-frontend .

# Production Build erzeugen
RUN npm run build

# 2. Serve Stage
FROM nginx:alpine

# Standard html Ordner leeren
RUN rm -rf /usr/share/nginx/html/*

# Build Output kopieren
COPY --from=builder /app/dist /usr/share/nginx/html

# optional nginx.conf kopieren falls SPA routing nötig ist
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
