# Etapa 1: build
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: nginx (runtime)
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html  # Si usas Vite
# COPY --from=build /app/build /usr/share/nginx/html  # Si usas Create React App

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
