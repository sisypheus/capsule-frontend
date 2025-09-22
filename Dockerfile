FROM node:24-alpine AS builder

WORKDIR /app

ARG VITE_BACKEND_URL

COPY package*.json ./
RUN npm install

COPY . .

RUN echo "VITE_BACKEND_URL=${VITE_BACKEND_URL}" > .env

RUN npm run build

RUN echo "--- Searching for the API URL in the built files... ---"
RUN grep -r "${VITE_API_BASE_URL}" dist/ || true

FROM nginx:alpine AS runner

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
