# Stage 1 - the build process
FROM node:16-alpine as build-deps
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn
COPY . ./
ENV GENERATE_SOURCEMAP false
RUN yarn build

# Stage 2 - the production environment
FROM nginx:1.21.0-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html

COPY prod.default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]