FROM base_image;

RUN apt-get -qqy install openssh-server

# Using in dev
ADD ./ /home/admin/app
WORKDIR /home/admin/app
RUN npm install
ENTRYPOINT /usr/sbin/sshd && \
mkdir tempAsset && \
npm run build && \
node bundle/index.js 

EXPOSE 22 80 443