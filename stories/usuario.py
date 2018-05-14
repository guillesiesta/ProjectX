# -*- coding: utf-8 -*-
class Usuario:
    """
    Clase Usuario.
    Clase para el usuario de la aplicación constara de:
     - Nombre
     - Apellidos
     - nick
     - password
     - nivel
     - id
    """

    def __init__(self, nom="", ape="", nic="", pas="", niv="", id=""):
        self.nombre = nom
        self.apellidos = ape
        self.nick = nic
        self.password = pas
        self.nivel = niv
        self.id = id

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

    def setId(self, t):
        self.id = t

    def getId(self):
        return self.id
