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
    '''cuento todas las historias que hay, ingroduzco 1 y compruebo'''

    query = ''' MATCH (s:Storie) RETURN count(*) as c'''
    cont1 = graph.run(query).data()

    cuenta_inicial = json.dumps(cont1[0]["c"])

    query2 = ''' CREATE (s:Storie {titulo:'teststorie'})'''
    graph.run(query2)

    query = ''' MATCH (s:Storie) RETURN count(*) as c'''
    cont2 = graph.run(query).data()

    cuenta_final = json.dumps(cont2[0]["c"])

    query3 = ''' MATCH (s:Storie) WHERE s.titulo="teststorie" DELETE s '''
    graph.run(query3)
    cuenta_inicial = int(cuenta_inicial)
    cuenta_final = int(cuenta_final)
    assert cuenta_final == cuenta_inicial + 1

def test_user_stories_titulo():
    ''' creo historia, creo usuario, lo relaciono y compruebo que
    ese usuario ha escrito esa historia'''

    querycreateuser = ''' CREATE (u:Usuario {nick:'testuser'})'''
    graph.run(querycreateuser)

    querycreatestorie = ''' CREATE (s:Storie {titulo:'test'})'''
    graph.run(querycreatestorie)

    querycreaterelation = ''' MATCH (u:Usuario), (s:Storie)
                              WHERE u.nick="testuser" AND s.titulo="test"
                              CREATE (u)-[:ESCRIBE]->(s) '''

    graph.run(querycreaterelation)

    query = ''' MATCH (a:Usuario)-[r:ESCRIBE]->(s:Storie)
                WHERE a.nick="testuser"
                RETURN s.titulo as titulo'''

    tit = graph.run(query).data()
    titulo = json.dumps(tit[0]["titulo"])

    query2 = '''MATCH (u:Usuario)-[r:ESCRIBE]->(s:Storie)
                WHERE s.titulo="test" AND u.nick="testuser"
                DELETE u,s,r'''
    graph.run(query2)

    assert titulo == '"test"'

def test_soluciones_por_titulo():

    querycreateuser = ''' CREATE (u:Usuario {nick:'testuser'})'''
    graph.run(querycreateuser)

    querycreatestorie = ''' CREATE (s:Storie {titulo:'test'})'''
    graph.run(querycreatestorie)

    querycreaterelation = ''' MATCH (u:Usuario), (s:Storie)
                              WHERE u.nick="testuser" AND s.titulo="test"
                              CREATE (u)-[r:PROPONE{solucion:"testsolucion", puntuacion:1}]->(s) '''

    graph.run(querycreaterelation)

    query = '''
            MATCH ()-[r:PROPONE]->(s:Storie)
            WHERE s.titulo="test"
            RETURN r.solucion as solucion , r.puntuacion as puntuacion
    '''
    info = graph.run(query).data()
    solucion = json.dumps(info[0]["solucion"])
    puntuacion = json.dumps(info[0]["puntuacion"])

    query2 = '''MATCH (u:Usuario)-[r:PROPONE]->(s:Storie)
                WHERE s.titulo="test" AND u.nick="testuser"
                DELETE u,s,r'''
    graph.run(query2)

    assert solucion=='"testsolucion"'
    assert puntuacion=='1'

def test_enviar_comentario():
    querycreateuser = ''' CREATE (u:Usuario {nick:'testuser'})'''
    graph.run(querycreateuser)

    querycreatestorie = ''' CREATE (s:Storie {titulo:'test'})'''
    graph.run(querycreatestorie)

    querycreaterelation = ''' MATCH (u:Usuario), (s:Storie)
                              WHERE u.nick="testuser" AND s.titulo="test"
                              CREATE (u)-[r:PROPONE{solucion:"testsolucion", puntuacion:1}]->(s) '''

    graph.run(querycreaterelation)

    query = '''
            MATCH (u:Usuario)-[r:PROPONE]->(s:Storie)
            WHERE s.titulo="test" AND u.nick="testuser"
            RETURN r.solucion as solucion , r.puntuacion as puntuacion
    '''
    info = graph.run(query).data()
    solucion = json.dumps(info[0]["solucion"])
    puntuacion = json.dumps(info[0]["puntuacion"])

    query2 = '''MATCH (u:Usuario)-[r:PROPONE]->(s:Storie)
                WHERE s.titulo="test" AND u.nick="testuser"
                DELETE u,s,r'''
    graph.run(query2)

    assert solucion=='"testsolucion"'
    assert puntuacion=='1'

def test_enviar_storie():
    ''' creo historia, creo usuario, lo relaciono y compruebo que
    ese usuario ha escrito esa historia'''

    querycreateuser = ''' CREATE (u:Usuario {nick:'testuser'})'''
    graph.run(querycreateuser)

    querycreatestorie = ''' CREATE (s:Storie {titulo:'test', short_storie:'test', storie:'test', pista1:'p1',pista2:'p2', pista3:'p3', estado:0})'''
    graph.run(querycreatestorie)

    querycreaterelation = ''' MATCH (u:Usuario), (s:Storie)
                              WHERE u.nick="testuser" AND s.titulo="test"
                              CREATE (u)-[:ESCRIBE]->(s) '''

    graph.run(querycreaterelation)

    query = ''' MATCH (a:Usuario)-[r:ESCRIBE]->(s:Storie)
                WHERE a.nick="testuser"
                RETURN s.titulo as titulo, s.short_storie as short_storie,
                       s.storie as storie, s.pista1 as pista1,
                       s.pista2 as pista2, s.pista3 as pista3,
                       s.estado as estado'''

    tit = graph.run(query).data()
    titulo = json.dumps(tit[0]["titulo"])
    short_storie = json.dumps(tit[0]["short_storie"])
    storie = json.dumps(tit[0]["storie"])
    pista1 = json.dumps(tit[0]["pista1"])
    pista2 = json.dumps(tit[0]["pista2"])
    pista3 = json.dumps(tit[0]["pista3"])
    estado = json.dumps(tit[0]["estado"])

    query2 = '''MATCH (u:Usuario)-[r:ESCRIBE]->(s:Storie)
                WHERE s.titulo="test" AND u.nick="testuser"
                DELETE u,s,r'''
    graph.run(query2)

    assert titulo == '"test"'
    assert short_storie == '"test"'
    assert storie == '"test"'
    assert pista1 == '"p1"'
    assert pista2 == '"p2"'
    assert pista3 == '"p3"'
    assert estado == '0'

def test_cambiar_puntuacion():

    querycreateuser = ''' CREATE (u:Usuario {nick:'testuser'})'''
    graph.run(querycreateuser)

    querycreatestorie = ''' CREATE (s:Storie {titulo:'test'})'''
    graph.run(querycreatestorie)

    querycreaterelation = ''' MATCH (u:Usuario), (s:Storie)
                              WHERE u.nick="testuser" AND s.titulo="test"
                              CREATE (u)-[r:PROPONE{solucion:"testsolucion", puntuacion:1}]->(s) '''

    graph.run(querycreaterelation)

    query= '''
        MATCH (u:Usuario {nick:'testuser'})-[r:PROPONE]->(s:Storie {titulo:'test'})
        WHERE r.solucion="testsolucion"
        SET r.puntuacion=4
        RETURN r.puntuacion as puntuacion
    '''

    info = graph.run(query).data()
    puntuacion = json.dumps(info[0]["puntuacion"])

    query2 = '''MATCH (u:Usuario)-[r:PROPONE]->(s:Storie)
                WHERE s.titulo="test" AND u.nick="testuser"
                DELETE r,u,s'''
    graph.run(query2)

    assert puntuacion == '4'

def test_acertijo_por_titulo():

    querycreatestorie = '''CREATE (s:Storie {titulo:'test', short_storie:'test'})'''
    graph.run(querycreatestorie)

    query = '''
            MATCH (s:Storie)
            WHERE s.titulo="test"
            RETURN s.short_storie as short_storie
    '''

    info = graph.run(query).data()
    short_storie = json.dumps(info[0]["short_storie"])

    query2 = ''' MATCH (s:Storie) WHERE s.titulo="test" DELETE s '''
    graph.run(query2)

    assert short_storie == '"test"'

def test_storie_por_titulo():

    querycreatestorie = '''CREATE (s:Storie {titulo:'test', storie:'test'})'''
    graph.run(querycreatestorie)

    query = '''
            MATCH (s:Storie)
            WHERE s.titulo="test"
            RETURN s.storie as storie
    '''
    info = graph.run(query).data()
    storie = json.dumps(info[0]["storie"])

    query2 = ''' MATCH (s:Storie) WHERE s.titulo="test" DELETE s '''
    graph.run(query2)

    assert storie == '"test"'

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
