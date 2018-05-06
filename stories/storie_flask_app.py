#!/usr/bin/env python
# -*- encoding: utf-8 -*-
from flask import Flask, jsonify, request
import json
import os
from storie import Storie
from first_storie import firststorie
from flask import Flask, render_template, session, redirect, url_for, escape
from flask_session import Session

app = Flask(__name__)


@app.route('/')  # aquí añadir un WELCOME y que haga o signup o signin
def s():
    return render_template('login.html')


@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        session['username'] = username
        return redirect(url_for('index'))
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
    return jsonify(solucion=firststorie.storie, pista1=firststorie.clue[0], pista2=firststorie.clue[1], pista3=firststorie.clue[2], storie=firststorie.sh_storie, title=firststorie.title)


if __name__ == '__main__':
    app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
    app.run(host='0.0.0.0', port=5000, debug=True)  # a la hora de desplegarlo cambiar a puerto 80
