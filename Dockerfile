FROM base_image;

# Using in dev
ADD ./ /home/admin/app
WORKDIR /home/admin/app
RUN npm install
ENTRYPOINT mkdir -p /export/Logs/node.log/ && \
cd /export/Logs/node.log/ && \
touch access.log && \
cd /home/admin/app/ && \
mkdir tempAsset && \
npm run build && \
node bundle/index.js &> /export/Logs/node.log/access.log