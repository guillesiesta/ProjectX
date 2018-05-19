# -*- coding: utf-8 -*-
class Storie:
    """
    Clase Storie.
    Clase para crear la dark storie, constara de:
     - Titulo
     - Storie
     - Muy breve Storie
     - 3 Pistas iniciales
     - Estado
    """

    def __init__(self, tit="", stor="", sh_stor="", c=["", "", ""], est=""):
        self.title = tit
        self.storie = stor
        self.sh_storie = sh_stor
        self.clue = [c[0], c[1], c[2]]
        self.maxClues = 3  # pistas
        self.estado = est

    def setTitle(self, t):
        self.title = t

    def getTitle(self):
        return self.title

    def setStorie(self, t):
        self.storie = t

    def getStorie(self):
        return self.storie

    def setShortStorie(self, t):
        self.sh_storie = t

    def getShortStorie(self):
        return self.sh_storie

    def setClue(self, num, t):
        if(num < self.maxClues):
            self.clue[num] = t
        else:
            return -1

    def getClue(self, num):
        if(num < self.maxClues):
            return self.clue[num]
        else:
            return -1

    def setEstado(self, t):
        self.estado = t

    def getEstado(self):
        return self.estado
