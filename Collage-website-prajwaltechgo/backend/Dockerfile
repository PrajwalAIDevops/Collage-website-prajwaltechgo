FROM node:lts-alpine3.24 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


FROM node:lts-alpine3.24

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

RUN addgroup -S app2 && \
    adduser -S -G app2 app2 && \
    chown -R app2:app2 /app

USER app2

EXPOSE 5000

CMD ["node", "dist/server.js"]