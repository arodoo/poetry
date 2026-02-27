# File: poetry-frontend/Dockerfile
# Purpose: Multi-stage build for the React/Vite frontend. Stage 1 compiles
# the app, stage 2 serves static assets via Nginx. API calls are proxied
# to the Spring Boot backend running on the Windows host.
# All Rights Reserved Arodi Emmanuel

FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --silent

COPY . .
RUN npx vite build

# --- Production stage ---
FROM nginx:stable-alpine AS runner

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
