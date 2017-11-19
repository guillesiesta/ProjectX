# -*- coding: utf-8 -*-
import pytest
from storie import Storie
from storie_flask_app import app
import json
import urllib
import unittest


def test_setTitle():
    storie = Storie()
    storie.setTitle("Capitán América y los siete enanitos")
    assert storie.title == "Capitán América y los siete enanitos"


def test_setStorie():
    storie = Storie()
    storie.setStorie("Hace mucho tiempo una vez un montón de cosas que pasaron")
    assert storie.storie == "Hace mucho tiempo una vez un montón de cosas que pasaron"


def test_setShortStorie():
    storie = Storie()
    storie.setShortStorie("Hace mucho tiempo")
    assert storie.sh_storie == "Hace mucho tiempo"


def test_setClue():
    storie = Storie()
    storie.setClue(0, "Pista1")
    storie.setClue(1, "Pista2")
    storie.setClue(2, "Pista3")
    assert storie.getClue(0) == "Pista1"
    assert storie.getClue(1) == "Pista2"
    assert storie.getClue(2) == "Pista3"
    assert storie.getClue(8) == -1
    assert storie.setClue(8, "Pistaca") == -1

url="https://projectxguillesiesta.herokuapp.com/"
def test_pagina_recibida():
	apps = app()
	ruta=urllib.urlopen(url)
	apps.assertEqual(ruta.getcode(),200)
def test_json_status_ok():
	apps = app()	
	ruta=urllib.urlopen(url)
	data = json.load(ruta)
	apps.assertEqual(data["status"],"OK")

# Añadir tests para flask
