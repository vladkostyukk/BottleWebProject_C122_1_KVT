"""
Routes and views for the bottle application.
"""

from bottle import route, view
from datetime import datetime

@route('/')
@route('/home')
@view('index')
def home():
    """Renders the home page."""
    return dict(
        year=datetime.now().year
    )

@route('/about')
@view('about')
def about():
    """Renders the contact page."""
    return dict(
        title='Авторы',
        message='Your contact page.',
        year=datetime.now().year
    )

@route('/bfs')
@view('bfs')
def bfs():
    return


@route('/dfs')
@view('dfs')
def dfs():
    return


@route('/kruskal')
@view('kruskal')
def kruskal():
    return