SHELL := /bin/bash

VERSION := 0.5.0

dev: 
	pnpm run dev

build:
	pnpm run build:pro
	docker build \
		-t olive-portal:latest \
		-t olive-portal:$(VERSION) \
		--build-arg BUILD_REF=$(VERSION) \
		--build-arg BUILD_DATE=`date -u +"%Y-%m-%dT%H:%M:%SZ"` \
		.

push:
	# docker buildx create \
	# 	--name mybuilder \
	# 	--driver docker-container \
	# 	--bootstrap \
	# 	--use

	pnpm run build:pro

	docker buildx build \
		--platform linux/amd64,linux/arm64 \
		-t luxcgo/olive-portal:latest \
		-t luxcgo/olive-portal:$(VERSION) \
		--build-arg BUILD_REF=$(VERSION) \
		--build-arg BUILD_DATE=`date -u +"%Y-%m-%dT%H:%M:%SZ"` \
		--push \
		.