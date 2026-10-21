# ---- Build stage ----
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build Angular app (production)
RUN npm run build

# ---- Runtime stage ----
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built Angular app to nginx
COPY --from=build /app/dist/bio-generator/browser /usr/share/nginx/html

# FIX: Set correct permissions so the nginx user can read the files
RUN chmod -R 755 /usr/share/nginx/html && chown -R nginx:nginx /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
