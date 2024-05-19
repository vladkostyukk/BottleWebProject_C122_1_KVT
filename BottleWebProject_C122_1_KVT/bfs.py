from bottle import post, request 
from collections import deque

def bfs_spanning_tree(adj_matrix, start_node):
    n = len(adj_matrix)
    visited = [False] * n
    spanning_tree = [[0 for _ in range(n)] for _ in range(n)]
    
    queue = deque()
    queue.append(start_node)
    visited[start_node] = True
    
    while queue:
        current_node = queue.popleft()
        for neighbor in range(n):
            if adj_matrix[current_node][neighbor] and not visited[neighbor]:
                queue.append(neighbor)
                visited[neighbor] = True
                spanning_tree[current_node][neighbor] = 1
                spanning_tree[neighbor][current_node] = 1  # граф ненаправленный, добавл€ем ребро в обе стороны
    
    return spanning_tree

# ѕример использовани€
adj_matrix = [
    [0, 1, 1, 0],
    [1, 0, 1, 1],
    [1, 1, 0, 0],
    [0, 1, 0, 0]
]
start_node = 0
spanning_tree = bfs_spanning_tree(adj_matrix, start_node)

for row in spanning_tree:
    print(row)

