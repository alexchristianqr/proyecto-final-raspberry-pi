# proyecto-final-raspberry-pi
 
Sitio web meteorológico informativo en Raspberry Pi sobre la temperatura y humedad con (DHT11)

## Empezar
```bash
docker build --platform linux/arm/v7 -t myraspbian .
docker run -dp 3000:3000 myraspbian
docker run -it --name myraspbian-container myraspbian
docker start -i myraspbian-container
```

[GitHub / apuntes-docker](https://github.com/alexchristianqr/apuntes-docker)