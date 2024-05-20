from contextlib import redirect_stdout
from bottle import get, post, request, response
from json import dumps
import random
import re

@post('/dfs')
def dfs_form():
    #получение данных в формате json
    data = request.json
    
    start_vertex = int(data['startVertex'])
    adjacency_matrix = data['matrixTable']

    #Получение матрицы смежности остовного дерева
    spanning_tree = dfs_spanning_tree(make_symmetric(adjacency_matrix), start_vertex)

    #отправление матрицы в формате json
    response.content_type = 'application/json'
    return dumps(spanning_tree)        

#Функция делающая матрицу симметричной
def make_symmetric(matrix):
    n = len(matrix)
    for i in range(n):
        for j in range(i + 1, n):
            if matrix[i][j] == 1:
                matrix[j][i] = 1
    return matrix
 
#Функция обхода графа в глубину
def dfs(graph, vertex, visited, spanning_tree):
    visited[vertex] = True
    for neighbor in range(len(graph)):
        if graph[vertex][neighbor] == 1 and not visited[neighbor]:
            spanning_tree[vertex][neighbor] = 1
            spanning_tree[neighbor][vertex] = 1
            dfs(graph, neighbor, visited, spanning_tree)

#Функция создания матрицы смежности остовного графа
def dfs_spanning_tree(adjacency_matrix, start_vertex):
    num_vertices = len(adjacency_matrix)
    spanning_tree = [[0 for _ in range(num_vertices)] for _ in range(num_vertices)]
    visited = [False] * num_vertices
    dfs(adjacency_matrix, start_vertex, visited, spanning_tree)
    return spanning_tree


#Функция генерации рандомной матрицы смежности
@get('/dfs/gen')
def dfs_generate_matrix():
    n = random.randint(4, 10)
    start_v = random.randint(0,n-1)
    adj_matrix = [[0 for _ in range(n)] for _ in range(n)]
    for i in range(n):
        for j in range(i+1, n):
            adj_matrix[i][j] = adj_matrix[j][i] = random.randint(0, 1)
    return {'start_vertex':start_v,'matrix':adj_matrix}

#Функция чтения матрицы смежности из файла
@get('/dfs/upload')
def dfs_read_matrix():
    adj_matr = []
    with open('static/dfs/matrix_dfs.txt') as f:
        start_vertex = int(f.readline())
        for line in f:
            row = [int(val) for val in line.split()]
            adj_matr.append(row)
    return {'start_vertex':start_vertex,'matrix':adj_matr}

#Функция сохранения результата в файл
@post('/dfs/save')
def dfs_save():
    data = str(request.json)
    f = open('static/dfs/result.txt', 'w')
    f.truncate()
    f.write("Matrix:\n"+data)
    f.close()