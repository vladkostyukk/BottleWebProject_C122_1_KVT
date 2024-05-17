"""
Routes and views for the bottle application.
"""

from bottle import route, view
from datetime import datetime

@route('/')
@route('/home')
@view('index')
def home():
    return dict(
        year=datetime.now().year
    )

@route('/about')
@view('about')
def about():
    return dict(
        title='Авторы',
        message='Your contact page.',
        year=datetime.now().year
    )

@route('/bfs')
@view('bfs')
def bfs():
    return dict(
        title='Поиск "в ширину"',
        year=datetime.now().year
    )

@route('/dfs')
@view('dfs')
def dfs():
    return


@route('/kruskal')
@view('kruskal')
def kruskal():
    return dict(
        title='Алгоритм Краскала',
        year=datetime.now().year
    )