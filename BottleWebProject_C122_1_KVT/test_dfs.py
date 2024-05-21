import unittest
from bottle import get, post, request, response
from json import dumps
from dfs import make_symmetric, dfs, dfs_spanning_tree

class Test_dfs(unittest.TestCase):
    def test_correct_symmetric(self):
        matrix = [[0,1,0,0,1],[0,0,1,1,0],[0,0,0,1,0],[0,0,0,0,1],[0,0,0,0,0]]
        symm_matrix=[[0,1,0,0,1],[1,0,1,1,0],[0,1,0,1,0],[0,1,1,0,1],[1,0,0,1,0]]
        result = make_symmetric(matrix)
        self.assertEquals(result,symm_matrix)
    
    def test_correct_result_matrix(self):
        start_v = 1
        source_matr = [[0,1,0,0,1],[0,0,1,1,0],[0,0,0,1,0],[0,0,0,0,1],[0,0,0,0,0]]
        expect = [[0, 1, 0, 0, 1], [1, 0, 0, 0, 0], [0, 0, 0, 1, 0], [0, 0, 1, 0, 1], [1, 0, 0, 1, 0]]
        result =  dfs_spanning_tree(make_symmetric(source_matr), start_v)
        self.assertEquals(result, expect)
    
    


if __name__ == '__main__':
    unittest.main()
