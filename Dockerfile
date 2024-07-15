# Usa una imagen base oficial de Python
FROM arm32v7/debian:latest

# Establece el directorio de trabajo en /app
WORKDIR /app

# Instalar dependencias y Python
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y \
    curl \
    wget \
    sudo \
    nano \
    nodejs \
    npm \
    python3 \
    python3-venv \
    python3-pip && \
    apt-get clean

# Copiar el código de la aplicación a la imagen
COPY . /app

# Instalar las dependencias de la aplicación Node.js
RUN npm install

# Asegurarse de que el script de Raspberry Pi sea ejecutable
# RUN chmod +x ./start.sh

# Exponer el puerto 3000
EXPOSE 3000

# Comando para ejecutar el script de Raspberry Pi y el servidor Node.js
# CMD ["sh", "-c", "./start.sh & exec node server.js"]                                                                                                                                                                                                                                                  
CMD ["sh", "-c", "exec node server.js"]                                                                                                                                                                                                                                                  