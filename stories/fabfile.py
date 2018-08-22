# coding: utf-8

from fabric.api import sudo, cd, env, run, shell_env
import os


def InstallApp():
    # Descargamos el repositorio
    run('git clone https://github.com/guillesiesta/ProjectX.git')

    # Instalamos herramientas
    run('sudo apt-get update')
    run('sudo apt-get -y install python2.7')
    run('sudo apt-get -y install python2.7-dev')
    run('sudo apt-get -y install python2.7-minimal')
    run('sudo apt-get -y install build-essential')
    run('sudo apt-get -y install libpq-dev')
    run('sudo apt-get -y install python-pip')
    #run('sudo pip install --upgrade pip')
    
    # Instalamos las dependencias
    run('sudo -H pip install -r ~/ProjectX/requirements.txt')

def RemoveApp():
    # Borramos directorio repo
    run('sudo rm -rf ./ProjectX')

def StartApp():
     # Iniciamos el servicio web
     run('cd ~/ProjectX/stories/ && sudo -E python storie_flask_app.py',pty=False)
