from bottle import post, request
from collections import deque

# Обработчик POST запроса по адресу '/run_bfs_algorithm'
@post('/run_bfs_algorithm')
def run_bfs_algorithm():
    # Получаем JSON данные из запроса
    data = request.json
    matrix = data.get('matrix')  # Получаем матрицу смежности из данных
    start_node = data.get('startNode')  # Получаем стартовую вершину из данных

    # Вызываем функцию для поиска остовного дерева по алгоритму BFS
    # Возвращаем матрицу остовного дерева в формате JSON
    return {'spanningTree': bfs_spanning_tree(matrix, start_node)}

# Функция для поиска остовного дерева по алгоритму BFS
def bfs_spanning_tree(matrix, start_node):
    n = len(matrix)  # Определяем размер матрицы (количество вершин)
    visited = [False] * n  # Список для отслеживания посещенных вершин
    spanning_tree = [[0 for _ in range(n)] for _ in range(n)]  # Инициализация матрицы остовного дерева

    queue = deque()  # Инициализация очереди для BFS
    queue.append(start_node)  # Добавляем стартовую вершину в очередь
    visited[start_node] = True  # Помечаем стартовую вершину как посещенную

    # Пока очередь не пуста
    while queue:
        current_node = queue.popleft()  # Извлекаем текущую вершину из очереди
        for neighbor in range(n):  # Перебираем соседей текущей вершины
            if matrix[current_node][neighbor] and not visited[neighbor]:  # Если существует ребро и соседняя вершина не посещена
                queue.append(neighbor)  # Добавляем соседнюю вершину в очередь
                visited[neighbor] = True  # Помечаем соседнюю вершину как посещенную
                spanning_tree[current_node][neighbor] = 1  # Устанавливаем вес ребра в матрицу остовного дерева
                spanning_tree[neighbor][current_node] = 1  # Устанавливаем вес ребра в матрицу остовного дерева (для неориентированного графа)
                
    return spanning_tree  # Возвращаем матрицу остовного дерева

# Функция для проверки симметричности матрицы относительно главной диагонали
def is_symmetric(matrix):
    return all(
        all(row[j] == matrix[j][i] for j in range(i)) # Проверяем элементы до главной диагонали
        for i, row in enumerate(matrix) # Перебираем строки матрицы по индексам i
    )

# Функция для проверки валидности значений в матрице
def is_valid_values(matrix):
    return all(
        all(value == 0 if i == j else value in {0, 1} # Проверяем условия валидности значения
        for j, value in enumerate(row)) # Перебираем элементы в строке по индексам j
        for i, row in enumerate(matrix) # Перебираем строки матрицы по индексам i
    )