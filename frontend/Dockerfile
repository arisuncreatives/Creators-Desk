# ==========================================
# STAGE 1: Build the React Application
# ==========================================
# UPDATED: Upgraded to Node 22 to support modern Vite/React Router builds
FROM node:22-alpine as builder

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# ==========================================
# STAGE 2: Serve with Nginx
# ==========================================
FROM nginx:alpine

# Remove default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the compiled React build from Stage 1
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Expose port 80 for web traffic
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]