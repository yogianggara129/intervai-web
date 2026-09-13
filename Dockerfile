FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
ARG VITE_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL
COPY . .
RUN npm run build

FROM pierrezemb/gostatic:latest
COPY --from=builder /app/dist /srv/http
EXPOSE 8043
CMD ["-fallback", "index.html"]