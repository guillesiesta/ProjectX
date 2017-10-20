"""
Gestor de errores - Error manager
Aqui se encuentran las excepciones tratadas por la aplicación
"""

class AllCluesFull(Exception):
	def __init__(self):
		self.mensaje = "Ya se han añadido todas las pistas"
		self.errorCode = -1

class IndexOfClueNotValid(Exception):
	def __init__(self):
		self.mensaje = "Indice no válido"
		self.errorCode = -2