# syntax=docker/dockerfile:1.6

FROM php:8.3-fpm

ARG WWWGROUP=1000
ARG WWWUSER=1000
ARG NODE_VERSION=20

WORKDIR /var/www/html

ENV PATH="/var/www/html/vendor/bin:$PATH"

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        build-essential \
        ca-certificates \
        curl \
        git \
        gnupg \
        libbz2-dev \
        mariadb-client \
        libcurl4-openssl-dev \
        libfreetype6-dev \
        libgmp-dev \
        libicu-dev \
        libjpeg62-turbo-dev \
        libmagickwand-dev \
        libmemcached-dev \
        libonig-dev \
        libpng-dev \
        libpq-dev \
        libreadline-dev \
        libsqlite3-dev \
        libssl-dev \
        libxml2-dev \
        libxslt1-dev \
        libzip-dev \
        pkg-config \
        unzip \
        zip \
    && curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
        bcmath \
        exif \
        gd \
        intl \
        pcntl \
        pdo_mysql \
        zip \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

RUN groupadd --force -g ${WWWGROUP} sail \
    && useradd -ms /bin/bash --no-user-group -g ${WWWGROUP} -u ${WWWUSER} sail || true

RUN mkdir -p storage bootstrap/cache \
    && chown -R ${WWWUSER}:${WWWGROUP} /var/www/html

COPY docker/php/conf.d/laravel.ini /usr/local/etc/php/conf.d/laravel.ini

USER sail

CMD ["php-fpm"]
