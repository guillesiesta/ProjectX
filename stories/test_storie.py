# -*- coding: utf-8 -*-

import hunspell
from storie import Storie

dic = hunspell.HunSpell('dic/Spanish.dic',
                        'dic/Spanish.aff')


def test_setTitle():
    storie = Storie()
    storie.setTitle("Capitán América y los siete enanitos")
    assert storie.title == "Capitán América y los siete enanitos"


def test_ortografia():
    storie = Storie()
    storie.setTitle("Capitán América y los siete enanos 2 El retorno")
    split_title = storie.getTitle().split()
    i = 0
    size = len(split_title)
    while i < size:
        c = split_title[i]
        u = c.decode('utf8')
        c2 = u.encode('utf8')
        assert dic.spell(c2) is True
        i += 1


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
