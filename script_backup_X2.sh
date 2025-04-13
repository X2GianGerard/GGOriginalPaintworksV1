import os
import shutil
import paramiko
from datetime import datetime
import subprocess

# Configuración de rutas y credenciales
origenes = [("/var/www", "www"), ("/etc/apache2", "apache2")]
ldap_exportado = "/tmp/ldap.ldif"
carpeta_temporal = "/tmp/backup_temp"
destino_local = "/server_backup"

def preparar_directorio_temporal(fecha):
    if os.path.exists(carpeta_temporal):
        shutil.rmtree(carpeta_temporal)
    os.makedirs(carpeta_temporal, exist_ok=True)

    for origen, nombre in origenes:
        shutil.copytree(origen, os.path.join(carpeta_temporal, nombre))

    # Exportar datos de LDAP
    with open(ldap_exportado, "w") as f:
        subprocess.run(["slapcat"], stdout=f)
    shutil.copy(ldap_exportado, os.path.join(carpeta_temporal, "ldap.ldif"))
    os.remove(ldap_exportado)

def crear_copia_comprimida(fecha):
    nombre_copia = f"backup_{fecha}.tar.gz"
    ruta_copia = os.path.join(destino_local, nombre_copia)
    shutil.make_archive(ruta_copia.replace(".tar.gz", ""), "gztar", carpeta_temporal)
    print(f"Copia local creada en: {ruta_copia}")
    return ruta_copia

def main():
    fecha = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    preparar_directorio_temporal(fecha)
    ruta_copia = crear_copia_comprimida(fecha)
    shutil.rmtree(carpeta_temporal)

if __name__ == "__main__":
    main()