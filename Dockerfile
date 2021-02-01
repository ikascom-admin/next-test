# Use the official lightweight Node.js 12 image.
# https://hub.docker.com/_/node
FROM node:14-alpine

# Create and change to the app directory.
WORKDIR /app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./
COPY yarn.lock ./

# Install production dependencies.
RUN yarn install --production=true

# Copy local code to the container image.
COPY . ./

RUN yarn build
RUN apk --no-cache add curl



# Run the web service on container startup.
CMD [ "yarn", "start" ]
