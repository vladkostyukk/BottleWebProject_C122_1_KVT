from bottle import post, request 
import json  

@post('/home')
def my_form():
    # Получение данных из JSON-запроса
    data = request.json  # Извлечение JSON-данных из HTTP-запроса
    matrix = data.get('matrix')  # Извлечение матрицы из данных запроса
    vertex_count = data.get('vertexCount')  # Извлечение количества вершин из данных запроса

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
            # условие проверяет ранги (глубину) деревьев root_u и root_v. Если root_u имеет больший ранг, чем root_v, то поддерево, связанное с root_v, становится поддеревом под root_u. 
            if self.rank[root_u] > self.rank[root_v]:
                self.parent[root_v] = root_u  # Присваивание корню v корня u
            else:
                # В противном случае поддерево root_u становится поддеревом под root_v.
                self.parent[root_u] = root_v  # Присваивание корню u корня v
                # Если ранги root_u и root_v равны, то выбирается любой из них, и ранг поддерева, в который он был включен, увеличивается на 1.
                if self.rank[root_u] == self.rank[root_v]:
                    self.rank[root_v] += 1  # Увеличение ранга корня поддерева
