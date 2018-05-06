#!/usr/bin/env python
# -*- encoding: utf-8 -*-
from flask import Flask, jsonify, request
import json
import os
from storie import Storie
from first_storie import firststorie

app = Flask(__name__)


@app.route('/')  # aquí añadir un WELCOME y que haga o signup o signin
def s():
    return jsonify(status="OK")


@app.route('/status')
def status():
    return jsonify(status="OK")


@app.route('/storie')
def storie():
    # tit = Storie.getTitle()
    return jsonify(solucion=firststorie.storie, pista1=firststorie.clue[0], pista2=firststorie.clue[1], pista3=firststorie.clue[2], storie=firststorie.sh_storie, title=firststorie.title)


@app.route('/login', methods=['GET', 'POST'])
def login():
    return jsonify(status="OK")


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)
