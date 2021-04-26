FROM base_image;

# Using in dev
ADD ./ /home/admin/app
WORKDIR /home/admin/app
RUN npm install
ENTRYPOINT touch /export/logs/error.log && \
mkdir tempAsset && \
npm run build && \
node bundle/index.js &> /export/logs/error.log