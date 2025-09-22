FROM node:24-alpine AS builder

WORKDIR /app

ARG VITE_BACKEND_URL

COPY package*.json ./
RUN npm install

COPY . .

RUN echo "VITE_BACKEND_URL=${VITE_BACKEND_URL}" > .env.production.local
RUN echo "--- .env.production.local content ---" && cat .env.production.local

RUN npm run build

FROM nginx:alpine AS runner

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
