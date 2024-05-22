import unittest
from bottle import get, post, request, response
from json import dumps
from dfs import make_symmetric, dfs_spanning_tree, dfs_read_matrix

class Test_dfs(unittest.TestCase):
    def test_correct_symmetric(self):
        matrix = [[[0,1,0,0,1],[0,0,1,1,0],[0,0,0,1,0],[0,0,0,0,1],[0,0,0,0,0]],
                  [[0,1,0,1,1],[0,0,1,1,1],[0,0,0,1,0],[0,0,0,0,1],[0,0,0,0,0]],
                  [[0,1,0,1],[0,0,1,1],[0,0,0,1],[0,0,0,0]],
                  [[0,0,1,1],[0,0,1,1],[0,0,0,1],[0,0,0,0]],
                  [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]]
        symm_matrix = [[[0,1,0,0,1],[1,0,1,1,0],[0,1,0,1,0],[0,1,1,0,1],[1,0,0,1,0]],
                       [[0,1,0,1,1],[1,0,1,1,1],[0,1,0,1,0],[1,1,1,0,1],[1,1,0,1,0]],
                       [[0,1,0,1],[1,0,1,1],[0,1,0,1],[1,1,1,0]],
                       [[0,0,1,1],[0,0,1,1],[1,1,0,1],[1,1,1,0]],
                       [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]]
        for i in range(0,5):
            result = make_symmetric(matrix[i])
            self.assertEqual(result,symm_matrix[i])
    
    def test_correct_result_matrix(self):
        source_matrix = [[[0,1,0,0,1],[0,0,1,1,0],[0,0,0,1,0],[0,0,0,0,1],[0,0,0,0,0]],
                  [[0,1,0,1,1],[0,0,1,1,1],[0,0,0,1,0],[0,0,0,0,1],[0,0,0,0,0]],
                  [[0,1,0,1],[0,0,1,1],[0,0,0,1],[0,0,0,0]],
                  [[0,0,1,1],[0,0,1,1],[0,0,0,1],[0,0,0,0]],
                  [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]]
        expect = [[[0, 1, 0, 0, 0], [1, 0, 1, 0, 0], [0, 1, 0, 1, 0], [0, 0, 1, 0, 1], [0, 0, 0, 1, 0]],
                 [[0, 1, 0, 1, 0], [1, 0, 0, 0, 0], [0, 0, 0, 1, 0], [1, 0, 1, 0, 1], [0, 0, 0, 1, 0]],
                 [[0, 1, 0, 1], [1, 0, 1, 0], [0, 1, 0, 0], [1, 0, 0, 0]],
                 [[0, 0, 1, 1], [0, 0, 1, 0], [1, 1, 0, 0], [1, 0, 0, 0]],
                 [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]] 
        start_v = [0,1,2,3,0]
        for i in range(0,5):
            result =  dfs_spanning_tree(make_symmetric(source_matrix[i]), start_v[i])
            self.assertEqual(result, expect[i])
    
    def test_correct_upload_matrix(self):
        start_v = [0,1,2,3,4]
        matrix =[[[0, 0, 0, 1, 0], [0, 0, 0, 0, 1], [0, 0, 0, 1, 0], [1, 0, 1, 0, 1], [0, 1, 0, 1, 0]],
                 [[0, 1, 0, 1, 0, 0], [1, 0, 1, 0, 0, 0], [0, 1, 0, 0, 0, 1], [1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1], [0, 0, 1, 0, 1, 0]],
                 [[0, 1, 0, 0, 0, 0], [1, 0, 1, 0, 1, 0], [0, 1, 0, 1, 0, 0], [0, 0, 1, 0, 0, 1], [0, 1, 0, 0, 0, 0], [0, 0, 0, 1, 0, 0]],
                 [[0, 0, 1, 1, 0], [0, 0, 0, 1, 0], [1, 0, 0, 0, 0], [1, 1, 0, 0, 1], [0, 0, 0, 1, 0]],
                 [[0, 0, 0, 1], [0, 0, 1, 1], [0, 1, 0, 0], [1, 1, 0, 0]]]
        for i in range(0,5):
            f = open('static/dfs/matrix_dfs.txt', 'w')
            f.truncate()
            f.write(str(start_v[i])+'\n')
            for row in matrix[i]:
                f.write(' '.join([str(a) for a in row]) + '\n')
            f.close()
            expect = {'start_vertex': start_v[i],'matrix':matrix[i]}
            result = dfs_read_matrix()
            self.assertEqual(result,expect)
           
    
    


if __name__ == '__main__':
    unittest.main()
