FROM nginx:alpine
COPY dist-pro /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/

LABEL org.opencontainers.image.created="${BUILD_DATE}" \
	org.opencontainers.image.title="olive-portal" \
	org.opencontainers.image.authors="luxcgo <luxcgo@gmail.com>" \
	org.opencontainers.image.source="https://github.com/go-olive/olive-portal" \
	org.opencontainers.image.revision="${BUILD_REF}" \
	org.opencontainers.image.vendor="go-olive"