FROM ubuntu:16.04

#
# BASE PACKAGES
# docker run --name listener-test -v D:\back-end\jdvlistene:/app -p 8080:8080 -it jdvlistener bash
RUN apt-get -qqy update \
  && apt-get -qqy --no-install-recommends install \
  bzip2 \
  ca-certificates \
  unzip \
  wget \
  curl \
  git \
  jq \
  zip \
  xvfb \
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

RUN npm install pm2 -g

# Using in product
# ADD ./bundle/ /app/
# ENTRYPOINT npm run build && npm run start-pro

# Using in dev
WORKDIR /app
# ENTRYPOINT npm run start
EXPOSE 8080