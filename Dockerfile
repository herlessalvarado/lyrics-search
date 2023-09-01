# Usa una imagen base de Node.js
FROM node:14

# Directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el package.json y el package-lock.json para instalar dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el código de la aplicación al contenedor
COPY . ./app

# Expone el puerto en el que la aplicación Express escucha
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "app/index.js"]
