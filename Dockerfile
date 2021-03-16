FROM ubuntu:16.04

RUN mv /etc/apt/sources.list.d /etc/apt/sources.list.d.dom && \
  touch /etc/apt/sources.list.d&& \
  echo -e "deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic main restricted universe multiverse\n deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic main restricted universe multiverse\n deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse\n deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-updates main restricted universe multiverse\n deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse\n deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-backports main restricted universe multiverse\n deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-security main restricted universe multiverse\n deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-security main restricted universe multiverse\n deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse\n deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ bionic-proposed main restricted universe multiverse\n" >> /etc/apt/sources.list.d

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
  nodejs \
  build-essential && \
  rm -rf /var/lib/apt/lists/* /var/cache/apt/*

#
# CHROME
#
RUN wget -q -O - http://storage.jd.local/listener-env/google-chrome-stable_current_amd64.deb?Expires=3763272285&AccessKey=WVPWdeQDf37AczFN&Signature=REzKo4JmbqffXwrBy5CAZ3qo%2F8w%3D && \
  sudo dpkg -i google-chrome* && \
  sudo apt-get install -f && \
  ln -s /usr/bin/google-chrome /usr/bin/chromium-browser
  
RUN npm install pm2 -g

# Using in product
# ADD ./bundle/ /app/
# ENTRYPOINT npm run build && npm run start-pro

# Using in dev
WORKDIR /app
# ENTRYPOINT npm run start
EXPOSE 8080