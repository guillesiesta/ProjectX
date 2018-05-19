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
'''
SECRET_KEY = 'guille'

app = Flask(__name__)
app.config.from_object(__name__)'''

'''SESSION_TYPE = 'redis'
app.config.from_object(__name__)
Session(app)'''

app = Flask(__name__)
# app.config.from_object(__name__)


@app.route('/', methods=['GET', 'POST'])
def run():
    # usuario = session['usuario'] = 'root'
    # return 'Logged in as ' + usuario + '<br>'
    # return redirect(url_for('index'))
    return render_template('login.html')

@app.route("/login", methods=['GET','POST'])
def login():
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
