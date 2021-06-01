FROM base_image;

#虎符安装
RUN apt-get -y install wget openssh*
RUN mkdir -p /opt
ADD ./shell/hf_docker_install.sh /opt

# Using in dev
ADD ./ /home/admin/app
WORKDIR /home/admin/app
RUN npm install
ENTRYPOINT /usr/sbin/sshd && \
mkdir tempAsset && \
mkdir -p /export/logs && \
touch /export/logs/error.log && \
touch /export/logs/access.log && \
bash /opt/hf_docker_install.sh && \
npm run build && \
node bundle/index.js >> /export/logs/access.log 

EXPOSE 22 80 443