from storie import Storie
import os

'''
authenticate("localhost:7474", "neo4j", "root")
url = os.environ.get('graph.db', 'http://localhost:7474')
username = os.environ.get('neo4j')
password = os.environ.get('root')

graph = Graph('localhost:7474/db/data/', username=username, password=password)
'''
# -*- coding: utf-8 -*-
class Usuario:
    """
    Clase Usuario.
    Clase para el usuario de la aplicacion constara de:
     - Nombre
     - Apellidos
     - nick
     - password
     - nivel
    """

    def __init__(self, nom="", ape="", nic="", pas="", niv=""):
        self.nombre = nom
        self.apellidos = ape
        self.nick = nic
        self.password = pas
        self.nivel = niv

    def setNombre(self, t):
        self.nombre = t

    def getNombre(self):
        return self.nombre

    def setApellidos(self, t):
        self.apellidos = t

    def getApellidos(self):
        return self.apellidos

    def setNick(self, t):
        self.nick = t

    def getNick(self):
        return self.nick

    def setPassword(self, t):
        self.password = t

    def getPassword(self):
        return self.password

    def setNivel(self, t):
        self.nivel = t

    def getNivel(self):
        return self.nivel

    # def getStoriesFromUser(user):
