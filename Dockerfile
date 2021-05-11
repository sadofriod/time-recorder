FROM base_image;

# Using in dev
ADD ./ /home/admin/app
WORKDIR /home/admin/app
ENTRYPOINT /usr/sbin/sshd && \
ls && \
mkdir tempAsset && \
node dist/index.js 

EXPOSE 22 80 443