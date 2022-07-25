FROM ruby:3.1.2-slim

RUN apt-get update -qq && \
  apt-get install -qq -y --no-install-recommends \
  apt-transport-https \
  build-essential \
  curl \
  gnupg2 \
  libpq-dev \
  wget && \
  rm -rf /var/lib/apt/lists/*

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY Gemfile      /usr/src/app/Gemfile
COPY Gemfile.lock /usr/src/app/Gemfile.lock

RUN bundle install
COPY . /usr/src/app
