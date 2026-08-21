# Etapa 1: instalar solo las dependencias de produccion
FROM node:20-alpine AS deps

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

# Etapa 2: imagen final
FROM node:20-alpine

WORKDIR /app

# Copiar dependencias ya instaladas desde la etapa anterior
COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
COPY app.js server.js ./

# Ejecutar como usuario sin privilegios (buena practica de seguridad)
USER node

EXPOSE 3000

CMD ["node", "server.js"]
