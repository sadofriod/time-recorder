FROM ubuntu:16.04

# Add ffmpeg repository
RUN apt-get -qqy update && \
  apt-get -qqy install software-properties-common && \
  add-apt-repository ppa:jonathonf/ffmpeg-4 && \
  apt-get -qqy install ffmpeg

#
# BASE PACKAGES
RUN apt-get -qqy --no-install-recommends install \
  bzip2 \
  ca-certificates \
  unzip \
  wget \
  curl \
  git \
  jq \
  zip \
  xvfb \
  x11-utils \
  pulseaudio \
  dbus \
  dbus-x11 \
  build-essential && \
  rm -rf /var/lib/apt/lists/* /var/cache/apt/*

#
# NODEJS
#
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - && \
  apt-get update -qqy && apt-get -qqy install -y nodejs && \
  rm -rf /var/lib/apt/lists/* /var/cache/apt/*

#
# CHROME
#
ARG CHROME_VERSION="google-chrome-stable"
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
  echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list && \
  apt-get update -qqy && apt-get -qqy install ${CHROME_VERSION:-google-chrome-stable} && \
  rm /etc/apt/sources.list.d/google-chrome.list && \
  rm -rf /var/lib/apt/lists/* /var/cache/apt/* && \
  ln -s /usr/bin/google-chrome /usr/bin/chromium-browser

WORKDIR /home/admin/app
RUN git clone https://github.com/sadofriod/time-recorder.git ./
RUN npm install
ENTRYPOINT /usr/sbin/sshd && \
  mkdir tempAsset && \
  npm run build && \
  node /home/admin/app/bundle/index.js >> /home/admin/app/server.log 

EXPOSE 22 80 443