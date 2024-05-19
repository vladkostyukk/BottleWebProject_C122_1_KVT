from bottle import post, request, response, run, default_app
from collections import deque

@post('/run_bfs_algorithm')
def run_bfs_algorithm():
    data = request.json
    matrix = data.get('matrix')
    start_node = data.get('startNode')

    def bfs_spanning_tree(matrix, start_node):
        n = len(matrix)
        visited = [False] * n
        spanning_tree = [[0 for _ in range(n)] for _ in range(n)]
        
        queue = deque()
        queue.append(start_node)
        visited[start_node] = True
        
        while queue:
            current_node = queue.popleft()
            for neighbor in range(n):
                if matrix[current_node][neighbor] and not visited[neighbor]:
                    queue.append(neighbor)
                    visited[neighbor] = True
                    spanning_tree[current_node][neighbor] = 1
                    spanning_tree[neighbor][current_node] = 1
        
        return {'spanningTree': spanning_tree}

    result = bfs_spanning_tree(matrix, start_node)
    return result

if __name__ == '__main__':
    run(host='localhost')