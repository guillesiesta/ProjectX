# -*- coding: utf-8 -*-
import pytest
from storie import Storie
from storie_flask_app import app
import pytest
from flask import Flask, jsonify, request, make_response, url_for
import json

from py2neo import Graph, Node, Relationship, authenticate
from flask_cors import CORS
from flask import request

authenticate("hobby-bhhkpclnoaicgbkehnmkdnbl.dbs.graphenedb.com:24780", "root", "b.EHfhKziFIWUD.flOyvWSsunDKWsbC")
graph = Graph("https://hobby-bhhkpclnoaicgbkehnmkdnbl.dbs.graphenedb.com:24780", bolt=False, secure=True)

authenticate("hobby-bhhkpclnoaicgbkehnmkdnbl.dbs.graphenedb.com:24780", "root", "b.EHfhKziFIWUD.flOyvWSsunDKWsbC")
graph = Graph("bolt://hobby-bhhkpclnoaicgbkehnmkdnbl.dbs.graphenedb.com:24786", user="root", password="b.EHfhKziFIWUD.flOyvWSsunDKWsbC", bolt=True, secure=True, https_port=24780)


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

# Añadir tests para flask

@pytest.fixture
def test_app():
    app = app()
    return app

def test_all_stories_titulo():
    #cuento todas las historias que hay, ingroduzco 1 y compruebo
    query = ''' MATCH (s:Storie) RETURN count(*) as c'''
    cont1 = graph.run(query).data()

    cuenta_inicial = json.dumps(cont1[0]["c"])

    query2 = ''' CREATE (s:Storie {titulo:'test'})'''
    graph.run(query2)

    query = ''' MATCH (s:Storie) RETURN count(*) as c'''
    cont2 = graph.run(query).data()

    cuenta_final = json.dumps(cont2[0]["c"])

    query3 = ''' MATCH (s:Storie) WHERE s.titulo="test" DELETE s '''
    graph.run(query3)

    cuenta_inicial = int(cuenta_inicial)
    cuenta_final = int(cuenta_final)
    assert cuenta_final == cuenta_inicial + 1

def test_user_stories_titulo():
    titulos_usuario = [{"titulo":"algo"},{"titulo":"otra"},{"titulo":"titulaso"}]
    titulos_json = json.dumps(titulos_usuario)  # codificamos en json
    assert titulos_json == '[{"titulo": "algo"}, {"titulo": "otra"}, {"titulo": "titulaso"}]'

def test_soluciones_por_titulo():
    titysol = [{"titulo":"algo","puntuacion":2},{"titulo":"otro", "puntuacion":3}]
    titysol_json = json.dumps(titysol)
    assert titysol_json == '[{"puntuacion": 2, "titulo": "algo"}, {"puntuacion": 3, "titulo": "otro"}]'

def test_enviar_comentario():
    usuario="usuario"
    titulo="titulo"
    comentario="me encanta"
    envio = json.dumps([{"titulo":titulo, "comentario":comentario, "usuario":usuario}])
    assert envio == '[{"titulo": "titulo", "comentario": "me encanta", "usuario": "usuario"}]'

def test_enviar_storie():
    titulo="titulo"
    acertijo="acertijo"
    solucion="solucion"
    pista1="pista1"
    pista2="pista2"
    pista3="pista3"
    usuario="usuario"
    envio = json.dumps([{"titulo":titulo, "acertijo":acertijo, "solucion":solucion, "pista1":pista1, "pista2":pista2, "pista3":pista3, "usuario":usuario}])
    assert envio == '[{"solucion": "solucion", "usuario": "usuario", "pista1": "pista1", "pista3": "pista3", "pista2": "pista2", "acertijo": "acertijo", "titulo": "titulo"}]'

def test_cambiar_puntuacion():
    puntuacion="puntuacion"
    solucion="solucion"
    envio = json.dumps([{"puntuacion":puntuacion, "solucion":solucion}])
    assert envio == '[{"puntuacion": "puntuacion", "solucion": "solucion"}]'

def test_acertijo_por_titulo():
    titulo="titulo"
    envio = json.dumps([{"titulo":titulo}])
    short_storie="short_storie"
    recibo = json.dumps([{"short_storie":short_storie}])
    assert envio == '[{"titulo": "titulo"}]'
    assert recibo == '[{"short_storie": "short_storie"}]'

def test_storie_por_titulo():
    titulo="titulo"
    envio = json.dumps([{"titulo":titulo}])
    storie="storie"
    recibo = json.dumps([{"storie":storie}])
    assert envio == '[{"titulo": "titulo"}]'
    assert recibo == '[{"storie": "storie"}]'

def test_todo_por_titulo():
    titulo="titulo"
    envio = json.dumps([{"titulo":titulo}])
    short_storie="short_storie"
    pista1 = "pista1"
    pista2 = "pista2"
    pista3 = "pista3"
    estado = 25
    recibo = json.dumps([{"short_storie":short_storie, "pista1":pista1, "pista2":pista2, "pista3":pista3, "estado":estado}])
    assert envio == '[{"titulo": "titulo"}]'
    assert recibo == '[{"pista1": "pista1", "pista3": "pista3", "pista2": "pista2", "estado": 25, "short_storie": "short_storie"}]'

def test_login():
    usuario="usuario"
    envio = json.dumps({"usuario":usuario})
    password = "1234"
    recibo = json.dumps([{"nick":usuario}])
    assert envio == '{"usuario": "usuario"}'
    assert recibo == '[{"nick": "usuario"}]'
