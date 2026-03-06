FROM node:18

WORKDIR /app

# Copy all files
COPY . .

# Install dependencies including devDeps if any, then prune
RUN npm install
RUN npm prune --production

# Expose API port
EXPOSE 3000

# Start API server
CMD ["npm", "run", "api"]
