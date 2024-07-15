#!/bin/bash

# Script de Raspberry Pi
echo "Ejecutando script de Raspberry Pi..."
# Aquí puedes agregar las líneas de tu script

# Llamar al script Python
python3 ./src/dht11_raspberry.py

# Ejemplo de un bucle infinito para mantener el script corriendo
while true; do
  echo "Script de Raspberry Pi sigue corriendo..."
  sleep 60
done