FROM node:lts-alpine3.24 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

RUN addgroup -S app1 && \
    adduser -S -G app1 app1 && \
    chown -R app1:app1 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]