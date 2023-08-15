FROM node:18.17.0 as deps
USER 1000:1000
WORKDIR /home/node/deps
COPY package.json .
COPY package-lock.json .
RUN npm ci

FROM node:18.17.0 as build
USER 1000:1000
WORKDIR /home/node/build
COPY --from=deps /home/node/deps .
COPY . .
RUN npm run build

# Bundle app source
FROM nginx:alpine
ENV NGINX_ENVSUBST_OUTPUT_DIR /etc/nginx
WORKDIR /app/static
COPY --from=build /home/node/build/.out_webpack .out_webpack
COPY --from=build /home/node/build/index.html index.html
COPY nginx.conf.template  /etc/nginx/templates/nginx.conf.template
EXPOSE 3000
