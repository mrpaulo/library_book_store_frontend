# set the base image
FROM node:12.22.9
# set working directory
# this is the working folder in the container
# from which the app will be running from
WORKDIR /app
# copy everything to /app directory
# as opposed to on dev, in prod everything is copied to docker
COPY package.json yarn.lock tsconfig.json ./
# install and cache dependencies
RUN yarn install 

COPY public public
COPY src src
RUN yarn build
# expose port 3000 to the outer world
EXPOSE 3000
# Run the application
CMD ["yarn", "start"]