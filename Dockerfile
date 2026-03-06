FROM node:18-alpine

WORKDIR /app

# Copy package files early to leverage Docker layer caching
COPY package*.json ./

# Set production environment and install exact dependencies using lockfile
ENV NODE_ENV=production
RUN npm ci --omit=dev

# Copy application code
COPY src ./src
COPY test ./test
COPY public ./public

# Expose API port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Default command: start API server
CMD ["npm", "run", "api"]
