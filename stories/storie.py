# -*- coding: utf-8 -*-
class Storie:
    """
    Clase Storie.
    Clase para crear la dark storie, constara de:
    Titulo
    Storie
    Muy breve Storie
    3 Pistas iniciales
    """

    def __init__(self, tit="", stor="", sh_stor="", c=["", "", ""]):
        self.title = tit
        self.storie = stor
        self.sh_storie = sh_stor
        self.clue = [c[0], c[1], c[2]]

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
        if(num < 3):
            self.clue[num] = t
        else:
            return -1

    def getClue(self, num):
        if(num < 3):
            return self.clue[num]
        else:
            return -1
