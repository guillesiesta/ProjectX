#!/usr/bin/env python
# -*- encoding: utf-8 -*-
from flask import Flask, jsonify, request, make_response, url_for
import json
import os
from storie import Storie
from usuario import Usuario
from first_storie import firststorie
from first_user import fu
from flask import Flask, render_template, session, redirect, url_for, escape
from flask_cors import CORS
from flask import request

from py2neo import Graph, Node, Relationship, authenticate

'''
SECRET_KEY = 'guille'

app = Flask(__name__)
app.config.from_object(__name__)'''

'''SESSION_TYPE = 'redis'
app.config.from_object(__name__)
Session(app)'''

app = Flask(__name__)
CORS(app)

# local
'''authenticate("localhost:7474", "neo4j", "root")
url = os.environ.get('graph.db', 'http://localhost:7474')
username = os.environ.get('neo4j')
password = os.environ.get('root')
graph = Graph('localhost:7474/db/data/', username=username, password=password)'''

# graphenedb
# root b.EHfhKziFIWUD.flOyvWSsunDKWsbC
authenticate("hobby-bhhkpclnoaicgbkehnmkdnbl.dbs.graphenedb.com:24780", "root", "b.EHfhKziFIWUD.flOyvWSsunDKWsbC")
graph = Graph("https://hobby-bhhkpclnoaicgbkehnmkdnbl.dbs.graphenedb.com:24780", bolt = False)

authenticate("hobby-bhhkpclnoaicgbkehnmkdnbl.dbs.graphenedb.com:24780", "root", "b.EHfhKziFIWUD.flOyvWSsunDKWsbC")
graph = Graph("bolt://hobby-bhhkpclnoaicgbkehnmkdnbl.dbs.graphenedb.com:24786", user="root", password="b.EHfhKziFIWUD.flOyvWSsunDKWsbC", bolt=True, secure = True, https_port = 24780)

#add-on heroku graphenedb
url = "https://app106476859-oDYBiX:b.yZomb8jqH5ok.LFZlLVKkXTNB9HIZ@hobby-ikjkoapniflegbkekhfodnbl.dbs.graphenedb.com:24780"
url_without_auth = urlunparse((url.scheme, "{0}:{1}".format(url.hostname, url.port), '', None, None, None))
user = url.username
password = url.password

authenticate(url_without_auth, user, password)
graph = Graph(url_without_auth, bolt = False)

graphenedb_url = os.environ.get("GRAPHENEDB_BOLT_URL")
graphenedb_user = os.environ.get("GRAPHENEDB_BOLT_USER")
graphenedb_pass = os.environ.get("GRAPHENEDB_BOLT_PASSWORD")
graph = Graph(graphenedb_url, user=graphenedb_user, password=graphenedb_pass, bolt = True, secure = True, http_port = 24789, https_port = 24780)
# app.config.from_object(__name__)


@app.route('/all_stories_titulo')
def all_stories_titulo():
    # results = graph.cypher.execute(''' MATCH (u:Usuario) RETURN u.nick''')
    query = ''' MATCH (s:Storie) RETURN s.titulo as titulo'''
    return jsonify(graph.run(query).data())

@app.route('/user_stories_titulo', methods=['GET', 'POST'])
def user_stories_titulo():
    usuario = request.get_json()
    # results = graph.cypher.execute(''' MATCH (u:Usuario) RETURN u.nick''')
    query = ''' MATCH (a:Usuario)-[r:ESCRIBE]->(s:Storie)
                WHERE a.nick={u}
                RETURN s.titulo as titulo'''

    query2 = ''' MATCH (s:Storie) RETURN s.titulo as titulo'''
    return jsonify(graph.run(query, u=usuario).data())
    # return jsonify(username="OK")

@app.route('/', methods=['GET', 'POST'])
def run():
    # usuario = session['usuario'] = 'root'
    # return 'Logged in as ' + usuario + '<br>'
    # return redirect(url_for('index'))
    return jsonify(status="OK")

@app.route("/soluciones_por_titulo", methods=['GET','POST'])
def soluciones_por_titulo():
    titulo = request.get_json()
    query = '''
            MATCH ()-[r:PROPONE]->(s:Storie)
            WHERE s.titulo={t}
            RETURN r.solucion as solucion , r.puntuacion as puntuacion
    '''
    return jsonify(graph.run(query, t=titulo).data())

@app.route("/enviar_comentario", methods=['GET','POST'])
def enviar_comentario():
    datos = request.get_json()  # cojo el json
    # cojo cosas del json
    titulo= datos.get('titulo')
    comentario=datos.get('comentario')
    usuario=datos.get('usuario')

    query= '''
        MATCH (u:Usuario), (s:Storie)
        WHERE u.nick={u} AND s.titulo={t}
        CREATE (u)-[r:PROPONE{solucion:{c}, puntuacion:1}]->(s)
    '''
    return jsonify(graph.run(query, t=titulo,u=usuario,c=comentario).data())

@app.route("/enviar_storie", methods=['GET','POST'])
def enviar_storie():
    datos = request.get_json()  # cojo el json
    # cojo cosas del json
    t= datos.get('titulo')
    a=datos.get('acertijo')
    s=datos.get('solucion')
    p1=datos.get('pista1')
    p2=datos.get('pista2')
    p3=datos.get('pista3')
    u=datos.get('usuario')

    # Creo storie
    storie = Node("Storie", titulo=t, short_storie=a, storie=s, pista1=p1, pista2=p2, pista3=p3, estado=0)
    graph.create(storie)

    # uno con el usuario
    union = ''' MATCH (u:Usuario), (s:Storie)
                WHERE u.nick={nick} AND s.titulo={titulo}
                CREATE (u)-[:ESCRIBE]->(s)
                '''
    graph.run(union, nick=u, titulo=t)

    return jsonify(t=t, a=a, s=s, p1=p1, p2=p2, p3=p3, u=u)

@app.route("/cambiar_puntuacion", methods=['GET','POST'])
def cambiar_puntuacion():
    datos = request.get_json()  # cojo el json
    # cojo cosas del json
    p= datos.get('puntuacion')
    s=datos.get('solucion')

    query= '''
        MATCH ()-[r:PROPONE]->()
        WHERE r.solucion={s}
        SET r.puntuacion={p}
        RETURN r.solucion as solucion
    '''
    return jsonify(graph.run(query,p=p, s=s).data())

@app.route("/acertijo_por_titulo", methods=['GET','POST'])
def acertijo_por_titulo():
    titulo = request.get_json()
    query = '''
            MATCH (s:Storie)
            WHERE s.titulo={t}
            RETURN s.short_storie as short_storie
    '''
    return jsonify(graph.run(query, t=titulo).data())
    # return jsonify(status="ACERTIJOS PARTY")

@app.route("/storie_por_titulo", methods=['GET','POST'])
def storie_por_titulo():
    titulo = request.get_json()
    query = '''
            MATCH (s:Storie)
            WHERE s.titulo={t}
            RETURN s.storie as storie
    '''
    return jsonify(graph.run(query, t=titulo).data())
    # return jsonify(status="ACERTIJOS PARTY")

@app.route("/todo_por_titulo", methods=['GET','POST'])
def todo_por_titulo():
    titulo = request.get_json()
    #titulo = "Pasan cosas"
    query = '''
            MATCH (s:Storie)
            WHERE s.titulo={t}
            RETURN s.short_storie as short_storie , s.pista1 as pista1, s.pista2 as pista2, s.pista3 as pista3, s.estado as estado
    '''
    return jsonify(graph.run(query, t=titulo).data())
    # return jsonify(status="ACERTIJOS PARTY")


@app.route("/login", methods=['GET','POST'])
def login():
    #username = "tonystark"
    #password = "1234"
    username = request.get_json()
    password = "1234"
    '''json = request.get_json()
    variable = json["variable"]'''
    query = '''
            MATCH (u:Usuario)
            WHERE u.nick={n}
            RETURN u.nick as nick, u.password as password
            '''
    return jsonify(graph.run(query, n=username).data())
    '''return jsonify(username)'''

'''
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        # en el debugger dice que hay que poner una secret key
        # password = request.form['password']
        # usuario = {'username': username, 'password': password}
        if(username == fu.nick) and (password == fu.password):
            session['username'] = username
            # return redirect(url_for('index'))
            stories = firststorie
            return render_template('index.html',
            username= username,
            storie= firststorie.title)
        else:
            return redirect(url_for('error'))
    else:
        return redirect(url_for('error'))
'''

@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/error')
def error():
    return jsonify(status="CHUNGO LOCO")

@app.route('/status')
def status():
    return jsonify(status="OK")

@app.route('/storie')
def storie():
    # tit = Storie.getTitle()
    return jsonify(solucion= firststorie.storie, pista1= firststorie.clue[0],pista2= firststorie.clue[1],pista3= firststorie.clue[2], storie= firststorie.sh_storie, title=firststorie.title, estado=firststorie.estado)

@app.route('/usuario')
def usuario():
    return jsonify(nombre=fu.nombre, apellidos=fu.apellidos, nick=fu.nick, password=fu.password, nivel=fu.nivel)

if __name__ == "__main__":
    app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
    app.run(host='0.0.0.0', port=5000, debug=True)
    # app.run(host='0.0.0.0', port=80, debug=True)  # a la hora de desplegarlo cambiar a puerto 80
