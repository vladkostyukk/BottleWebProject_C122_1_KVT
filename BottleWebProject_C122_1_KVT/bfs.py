from bottle import post, request
from collections import deque

# ���������� POST ������� �� ������ '/run_bfs_algorithm'
@post('/run_bfs_algorithm')
def run_bfs_algorithm():
    # �������� JSON ������ �� �������
    data = request.json
    matrix = data.get('matrix')  # �������� ������� ��������� �� ������
    start_node = data.get('startNode')  # �������� ��������� ������� �� ������

    # �������� ������� ��� ������ ��������� ������ �� ��������� BFS
    result = bfs_spanning_tree(matrix, start_node)
    return result

# ������� ��� ������ ��������� ������ �� ��������� BFS
def bfs_spanning_tree(matrix, start_node):
    n = len(matrix)  # ���������� ������ ������� (���������� ������)
    visited = [False] * n  # ������ ��� ������������ ���������� ������
    spanning_tree = [[0 for _ in range(n)] for _ in range(n)]  # ������������� ������� ��������� ������
        
    queue = deque()  # ������������� ������� ��� BFS
    queue.append(start_node)  # ��������� ��������� ������� � �������
    visited[start_node] = True  # �������� ��������� ������� ��� ����������
        
    # ���� ������� �� �����
    while queue:
        current_node = queue.popleft()  # ��������� ������� ������� �� �������
        for neighbor in range(n):  # ���������� ������� ������� �������
            if matrix[current_node][neighbor] and not visited[neighbor]:  # ���� ���������� ����� � �������� ������� �� ��������
                queue.append(neighbor)  # ��������� �������� ������� � �������
                visited[neighbor] = True  # �������� �������� ������� ��� ����������
                spanning_tree[current_node][neighbor] = 1  # ������������� ��� ����� � ������� ��������� ������
                spanning_tree[neighbor][current_node] = 1  # ������������� ��� ����� � ������� ��������� ������ (��� ������������������ �����)
        
    return {'spanningTree': spanning_tree}  # ���������� ������� ��������� ������ � ������� JSON