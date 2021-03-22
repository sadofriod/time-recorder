FROM base_image;

# Using in dev
WORKDIR /app
RUN npm install
ENTRYPOINT npm run build && node bundle/index.js