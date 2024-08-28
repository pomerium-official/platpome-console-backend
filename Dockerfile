FROM public.ecr.aws/docker/library/node:18-alpine AS base
WORKDIR /base

ARG BUILD_ENV

# install additional linux packages
RUN apk add --no-cache libc6-compat

# Install pnpm
RUN npm install -g pnpm

# Make env files
COPY .env .env.* ./
RUN rm -rf .env
RUN if [ -z "$BUILD_ENV" ] ; then \
    echo "dev"; \
    rm -rf .env.production; \
    mv .env.development .env ; \
  else \
    echo "prd"; \
    rm -rf .env.development; \
    mv .env.production .env ; \
    rm public/swagger.json; \
    echo "HIDE_API_DOCS=true" >> .env; \
  fi


FROM base AS dependencies
WORKDIR /dep

COPY package.json pnpm-lock.yaml ./
#COPY prisma ./prisma
COPY patches ./patches
COPY --from=base /base/.env ./

#RUN ls -al
RUN pnpm install


FROM base AS build
WORKDIR /build

# 빌드에 필요한 파일을 복사합니다.
COPY tsconfig.json tsoa.json package.json ./
COPY patches ./patches
COPY prisma ./prisma
COPY src ./src
COPY --from=dependencies /dep/node_modules ./node_modules
COPY --from=base /base/.env ./

RUN pnpm run build
RUN pnpm prune --prod

#ARG CACHEBUST=1
#RUN ls -al


FROM base AS deploy
WORKDIR /app

COPY --from=build /build/dist/ ./dist/
COPY --from=build /build/public/ ./public/
COPY --from=build /build/node_modules ./node_modules
COPY --from=base /base/.env ./
COPY package.json babel.config.js ./

#ARG CACHEBUST=1
#RUN ls -al


EXPOSE 8200
CMD ["pnpm", "start"]
