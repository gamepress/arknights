# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=22.6.0
FROM node:${NODE_VERSION}-alpine as base

LABEL fly_launch_runtime="Payload"

# Remix app lives here
WORKDIR /app

ENV NODE_ENV="production"
ENV PORT="3000"
ARG YARN_VERSION=1.22.22
RUN npm install -g yarn@$YARN_VERSION --force


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apk update && \
    apk add build-base gyp pkgconfig python3

# Install node modules
COPY package.json yarn.lock ./
COPY ./patches ./patches
RUN yarn install --frozen-lockfile --production=false

# Copy application code
COPY . .

# Build application
RUN yarn run build:custom

# Remove development dependencies
RUN yarn install --production=true

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 4000
CMD ["yarn", "run", "start:custom"]
