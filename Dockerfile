# syntax=docker/dockerfile:1

# ---- Estágio 1: build ----
FROM node:22-alpine AS build
WORKDIR /app

# Instala dependências a partir do lockfile (camada cacheável).
COPY package.json package-lock.json ./
RUN npm ci

# Copia o restante e gera o build de produção (typecheck + vite build).
COPY . .
RUN npm run build

# ---- Estágio 2: serve ----
FROM nginx:alpine AS runtime
# Config de SPA (fallback para index.html).
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
