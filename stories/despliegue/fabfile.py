# coding: utf-8

from fabric.api import sudo, cd, env, run, shell_env
import os


def InstallApp():
    # Descargamos el repositorio
    run('git clone https://github.com/guillesiesta/ProjectX.git')

    # Instalamos herramientas
    run('sudo apt-get update')
    run('sudo apt-get -y install python2-setuptools')
    run('sudo apt-get -y install python2-dev')
    run('sudo apt-get -y install build-essential')
    run('sudo apt-get -y install libpq-dev')
    run('sudo apt-get -y install python2-pip')

    # Instalamos las dependencias
    run('pip install -r requirements.txt')

def RemoveApp():
    # Borramos directorio repo
    run('sudo rm -rf ./ProjectX')

def StartApp():
        # Iniciamos el servicio web
        run('cd ~/stories/ && sudo python storie_flask_app.py',pty=False)
