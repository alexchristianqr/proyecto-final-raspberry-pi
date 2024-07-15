FROM arm32v7/debian:latest

LABEL maintainer="alexchristianqr@gmail.com"
LABEL version="1.0.0"
LABEL description="Docker container with Raspbian for Raspberry Pi"

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y \
    curl \
    wget \
    sudo \
    nano \
    git \
    nodejs \
    npm \
    python3 \
    python3-pip && \
    apt-get clean

# Crear una carpeta para la aplicación y establecerla como el directorio de trabajo
WORKDIR /app

# Copiar el código de la aplicación a la imagen
COPY . /app

# Instalar las dependencias de la aplicación
RUN npm install

# Asegurarse de que el script de Raspberry Pi sea ejecutable
RUN chmod +x ./start.sh

# Exponer el puerto 3000
EXPOSE 3000

# Comando para ejecutar el script de Raspberry Pi y el servidor Node.js
CMD ["sh", "-c", "./start.sh & node ./server.js"]