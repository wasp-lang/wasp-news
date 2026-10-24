FROM caddy:2.11.7-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY public/news.json /srv/news.json
