urlrepositorio="https://github.com/X2GianGerard/GGOriginalPaintworksV1"
directorio="/home/super/Escritorio/script"

#Revisar si directorio existe
if [ -d "$directorio/.git" ]; then
    #Si existe hace un pull para descargar solo lo nuevo
    cd $directorio
    git pull origin main
else
    #Si no existe lo clona
    git clone $urlrepositorio $directorio
fi