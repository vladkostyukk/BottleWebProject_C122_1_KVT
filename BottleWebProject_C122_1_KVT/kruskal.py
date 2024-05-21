from bottle import post, request
import json

@post('/home')
def my_form():
    # Получение данных из JSON-запроса
    data = request.json  # Извлечение JSON-данных из HTTP-запроса
    matrix = data.get('matrix')  # Извлечение матрицы из данных запроса
    vertex_count = data.get('vertexCount')  # Извлечение количества вершин из данных запроса

    # Валидация матрицы перед применением алгоритма Краскала
    validation_result = check_matrix(matrix, vertex_count)
    if validation_result:
        return validation_result

    mst_matrix, mst_weight = kruskal_algorithm(matrix, vertex_count)
    return {'mst_matrix': mst_matrix, 'mst_weight': mst_weight}


# Алгоритм Краскала для построения минимального остова
def kruskal_algorithm(matrix, vertex_count):
    # Создание списка рёбер
    edges = []
    for i in range(vertex_count):
        for j in range(i + 1, vertex_count):
            if matrix[i][j] > 0:
                edges.append((matrix[i][j], i, j))  # Добавление ребра в список, если оно существует

    edges.sort()  # Сортировка списка рёбер по возрастанию веса

    uf = UnionFind(vertex_count)  # Создание объекта структуры Union-Find
    mst = []  # Список рёбер минимального остова
    mst_weight = 0  # Вес минимального остова

    # Построение MST
    for weight, u, v in edges:
        # Проверка наличия цикла
        if uf.find(u) != uf.find(v):  # Если вершины u и v не находятся в одном множестве
            uf.union(u, v)  # Объединение множеств вершин u и v
            mst.append((u, v, weight))  # Добавление ребра к минимальному остову
            mst_weight += weight  # Обновление веса минимального остова

    # Создание матрицы минимального остова
    mst_matrix = [[0] * vertex_count for _ in range(vertex_count)]  # Создание нулевой матрицы
    for u, v, weight in mst:
        mst_matrix[u][v] = weight  # Установка веса ребра в матрице
        mst_matrix[v][u] = weight  # Матрица симметрична

    return mst_matrix, mst_weight  # Возвращение матрицы остова и веса остова


# Класс UnionFind для эффективного определения связей между вершинами графа и для обнаружения циклов в графе при добавлении ребер
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))  # Инициализация списка родительских элементов
        self.rank = [0] * n  # Инициализация списка рангов

    # Метод find для поиска корня
    def find(self, u):
        if self.parent[u] != u:  # Если узел не является корнем своего дерева
            self.parent[u] = self.find(self.parent[u])  # Присваивание корню прямой ссылки на него
        return self.parent[u]  

    # Метод union для объединения двух подмножеств
    def union(self, u, v):
        root_u = self.find(u)  # Нахождение корня дерева для узла u
        root_v = self.find(v)  # Нахождение корня дерева для узла v
        if root_u != root_v:  # Если узлы принадлежат разным деревьям
            if self.rank[root_u] > self.rank[root_v]:
                self.parent[root_v] = root_u  # Присваивание корню v корня u
            else:
                self.parent[root_u] = root_v  # Присваивание корню u корня v
                if self.rank[root_u] == self.rank[root_v]:
                    self.rank[root_v] += 1  # Увеличение ранга корня поддерева
               
                    
def check_matrix(matrix, vertex_count):
    # Проверка на симметричность матрицы
    if not is_symmetric(matrix):
        return 'Матрица не симметрична.'
    # Проверка на корректные значения в матрице
    if not is_valid_values(matrix):
        return 'Матрица имеет некорректные значения. Значения матрицы должны быть числовые от 0 до 100.'
    # Проверка на наличие нулей на диагонали матрицы
    if not has_zeros_on_diagonal(matrix):
        return 'По диагонали матрицы должны быть нули.'
    # Проверка на количество вершин матрицы
    if not (3 <= vertex_count <= 10):
        return 'Количество вершин матрицы должно быть от 3 до 10.'
    return None

# Функция для проверки симметричности матрицы
def is_symmetric(matrix):
    for i in range(len(matrix)):
        for j in range(i):
            if matrix[i][j] != matrix[j][i]:
                return False
    return True

# Функция для проверки наличия корректных значений в матрице
def is_valid_values(matrix):
    for row in matrix:
        for value in row:
            if not (0 <= value <= 100):
                return False
    return True

# Функция для проверки наличия нулей на диагонали матрицы
def has_zeros_on_diagonal(matrix):
    for i in range(len(matrix)):
        if matrix[i][i] != 0:
            return False
    return True
