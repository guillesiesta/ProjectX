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
from flask_session import Session
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

authenticate("localhost:7474", "neo4j", "root")
url = os.environ.get('graph.db', 'http://localhost:7474')
username = os.environ.get('neo4j')
password = os.environ.get('root')

graph = Graph('localhost:7474/db/data/', username=username, password=password)
# app.config.from_object(__name__)


@app.route('/all_stories_titulo')
def all_stories_titulo():
    # results = graph.cypher.execute(''' MATCH (u:Usuario) RETURN u.nick''')
    query = ''' MATCH (s:Storie) RETURN s.titulo as titulo'''
    return jsonify(graph.run(query).data())

@app.route('/stories_tonystark')
def stories():
    ''' meter metodo get stories '''
    # results = graph.cypher.execute(''' MATCH (u:Usuario) RETURN u.nick''')
    query = ''' MATCH p=(u:Usuario{nick:"tonystark"})-[r:ESCRIBE]->(s:Storie) RETURN s.storie'''
    return jsonify(graph.run(query).data())

@app.route('/', methods=['GET', 'POST'])
def run():
    # usuario = session['usuario'] = 'root'
    # return 'Logged in as ' + usuario + '<br>'
    # return redirect(url_for('index'))
    return jsonify(status="OK")

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
