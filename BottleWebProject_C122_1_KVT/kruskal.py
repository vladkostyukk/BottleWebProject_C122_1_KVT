from bottle import post, request
import json

@post('/home')
def my_form():
    data = request.json
    matrix = data.get('matrix')
    vertex_count = data.get('vertexCount')

    if matrix is None or vertex_count is None:
        return {'error': 'Invalid input'}

    mst_matrix, mst_weight = kruskal_algorithm(matrix, vertex_count)

    return {'mst_matrix': mst_matrix, 'mst_weight': mst_weight}

def kruskal_algorithm(matrix, vertex_count):
    # Создание списка рёбер
    edges = []
    for i in range(vertex_count):
        for j in range(i + 1, vertex_count):
            if matrix[i][j] > 0:
                edges.append((matrix[i][j], i, j))

    # Сортировка рёбер по весу
    edges.sort()

    # Инициализация Union-Find структуры
    uf = UnionFind(vertex_count)
    mst = []
    mst_weight = 0

    # Построение MST
    for weight, u, v in edges:
        if uf.find(u) != uf.find(v):
            uf.union(u, v)
            mst.append((u, v, weight))
            mst_weight += weight

    # Создание матрицы минимального остова
    mst_matrix = [[0] * vertex_count for _ in range(vertex_count)]
    for u, v, weight in mst:
        mst_matrix[u][v] = weight
        mst_matrix[v][u] = weight

    return mst_matrix, mst_weight

class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, u):
        if self.parent[u] != u:
            self.parent[u] = self.find(self.parent[u])
        return self.parent[u]

    def union(self, u, v):
        root_u = self.find(u)
        root_v = self.find(v)
        if root_u != root_v:
            if self.rank[root_u] > self.rank[root_v]:
                self.parent[root_v] = root_u
            else:
                self.parent[root_u] = root_v
                if self.rank[root_u] == self.rank[root_v]:
                    self.rank[root_v] += 1
