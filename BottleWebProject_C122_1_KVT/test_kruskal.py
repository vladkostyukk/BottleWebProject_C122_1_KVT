import unittest
from kruskal import kruskal_algorithm, check_matrix

class TestKruskalAlgorithm(unittest.TestCase):
    def test_correctness_kruskal(self):
        test_cases = [
            {
                "matrix": [
                    [0, 2, 0, 6, 0],
                    [2, 0, 3, 8, 5],
                    [0, 3, 0, 0, 7],
                    [6, 8, 0, 0, 9],
                    [0, 5, 7, 9, 0]
                ],
                "vertex_count": 5,
                "expected_mst_matrix": [
                    [0, 2, 0, 6, 0],
                    [2, 0, 3, 0, 5],
                    [0, 3, 0, 0, 0],
                    [6, 0, 0, 0, 0],
                    [0, 5, 0, 0, 0]
                ],
                "expected_mst_weight": 16
            },
            {
                "matrix": [
                    [0, 46, 38, 75],
                    [46, 0, 4, 0],
                    [38, 4, 0, 48],
                    [75, 0, 48, 0]
                ],
                "vertex_count": 4,
                "expected_mst_matrix": [
                    [0, 0, 38, 0],
                    [0, 0, 4, 0],
                    [38, 4, 0, 48],
                    [0, 0, 48, 0]
                ],
                "expected_mst_weight": 90
            },
            {
                "matrix": [
                    [0, 68, 27, 0, 13, 0, 0, 0, 0],
                    [68, 0, 44, 41, 0, 0, 0, 0, 0],
                    [27, 44, 0, 93, 0, 0, 0, 0, 0],
                    [0, 41, 93, 0, 90, 0, 0, 0, 0],
                    [13, 0, 0, 90, 0, 99, 0, 0, 0],
                    [0, 0, 0, 0, 99, 0, 49, 0, 87],
                    [0, 1, 2, 0, 0, 49, 0, 41, 0],
                    [0, 1, 2, 0, 0, 0, 41, 0, 63],
                    [0, 1, 2, 0, 0, 87, 0, 63, 0]
                ],
                "vertex_count": 9,
                "expected_mst_matrix": [
                    [0, 0, 27, 0, 13, 0, 0, 0, 0],
                    [0, 0, 44, 41, 0, 0, 0, 0, 0],
                    [27, 44, 0, 0, 0, 0, 0, 0, 0],
                    [0, 41, 0, 0, 0, 0, 0, 0, 0],
                    [13, 0, 0, 0, 0, 99, 0, 0, 0],
                    [0, 0, 0, 0, 99, 0, 49, 0, 0],
                    [0, 0, 0, 0, 0, 49, 0, 41, 0],
                    [0, 0, 0, 0, 0, 0, 41, 0, 63],
                    [0, 0, 0, 0, 0, 0, 0, 63, 0]
                ],
                "expected_mst_weight": 377
            },
            {
                "matrix": [
                    [0, 5, 0, 0, 0],
                    [5, 0, 6, 0, 8],
                    [0, 6, 0, 7, 0],
                    [0, 0, 7, 0, 9],
                    [0, 8, 0, 9, 0]
                ],
                "vertex_count": 5,
                "expected_mst_matrix": [
                    [0, 5, 0, 0, 0],
                    [5, 0, 6, 0, 8],
                    [0, 6, 0, 7, 0],
                    [0, 0, 7, 0, 0],
                    [0, 8, 0, 0, 0]
                ],
                "expected_mst_weight": 26
            },
            {
                "matrix": [
                    [0, 0, 0, 0, 70, 17],
                    [0, 0, 12, 61, 0, 0],
                    [0, 12, 0, 0, 55, 93],
                    [0, 61, 0, 0, 0, 0],
                    [70, 0, 55, 0, 0, 0],
                    [17, 0, 93, 0, 0, 0]
                ],
                "vertex_count": 6,
                "expected_mst_matrix": [
                    [0, 0, 0, 0, 70, 17],
                    [0, 0, 12, 61, 0, 0],
                    [0, 12, 0, 0, 55, 0],
                    [0, 61, 0, 0, 0, 0],
                    [70, 0, 55, 0, 0, 0],
                    [17, 0, 0, 0, 0, 0]
                ],
                "expected_mst_weight": 215
            },
            {
                "matrix": [
                    [0, 1, 100],
                    [1, 0, 50],
                    [100, 50, 0]
                ],
                "vertex_count": 3,
                "expected_mst_matrix": [
                    [0, 1, 0],
                    [1, 0, 50],
                    [0, 50, 0]
                ],
                "expected_mst_weight": 51
            },
            {
                "matrix": [
                    [0, 0, 69, 0, 34, 65, 0, 0],
                    [0, 0, 96, 0, 0, 0, 0, 0],
                    [69, 96, 0, 0, 0, 31, 0, 0],
                    [0, 0, 0, 0, 0, 8, 51, 0],
                    [34, 0, 0, 0, 0, 0, 0, 36],
                    [65, 0, 31, 8, 0, 0, 0, 0],
                    [0, 0, 0, 51, 0, 0, 0, 0],
                    [0, 0, 0, 0, 36, 0, 0, 0]
                ],
                "vertex_count": 8,
                "expected_mst_matrix": [
                    [0, 0, 0, 0, 34, 65, 0, 0],
                    [0, 0, 96, 0, 0, 0, 0, 0],
                    [0, 96, 0, 0, 0, 31, 0, 0],
                    [0, 0, 0, 0, 0, 8, 51, 0],
                    [34, 0, 0, 0, 0, 0, 0, 36],
                    [65, 0, 31, 8, 0, 0, 0, 0],
                    [0, 0, 0, 51, 0, 0, 0, 0],
                    [0, 0, 0, 0, 36, 0, 0, 0]
                ],
                "expected_mst_weight": 321
            },
            {
                "matrix": [
                    [0, 0, 70, 13, 0, 0, 80],
                    [0, 0, 50, 60, 83, 0, 0],
                    [70, 50, 0, 71, 0, 0, 0],
                    [13, 60, 71, 0, 0, 0, 0],
                    [0, 83, 0, 0, 0, 0, 36],
                    [0, 0, 0, 0, 0, 0, 14],
                    [80, 0, 0, 0, 36, 14, 0]
                ],
                "vertex_count": 7,
                "expected_mst_matrix": [
                    [0, 0, 0, 13, 0, 0, 80],
                    [0, 0, 50, 60, 0, 0, 0],
                    [0, 50, 0, 0, 0, 0, 0],
                    [13, 60, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 36],
                    [0, 0, 0, 0, 0, 0, 14],
                    [80, 0, 0, 0, 36, 14, 0]
                ],
                "expected_mst_weight": 253
            }
        ]

        for case in test_cases:
            mst_matrix, mst_weight = kruskal_algorithm(case["matrix"], case["vertex_count"])
            self.assertEqual(mst_matrix, case["expected_mst_matrix"], f"Failed for case: {case}")
            self.assertEqual(mst_weight, case["expected_mst_weight"], f"Failed for case: {case}")



class TestCheckMatrix(unittest.TestCase):

    def test_symmetric_matrix(self):
        symmetric_matrix = [
            [
                [0, 1, 2],
                [1, 0, 3],
                [2, 3, 0]
            ],
            [
                [0, 10, 15, 20],
                [10, 0, 25, 30],
                [15, 25, 0, 35],
                [20, 30, 35, 0]
            ],
            [
                [0, 2, 0, 6, 0],
                [2, 0, 3, 8, 5],
                [0, 3, 0, 0, 7],
                [6, 8, 0, 0, 9],
                [0, 5, 7, 9, 0]
            ]
        ]
    
        vertex_counts = [3, 4, 5]
    
        for matrix, vertex_count in zip(symmetric_matrix, vertex_counts):
            self.assertIsNone(check_matrix(matrix, vertex_count))

    def test_non_symmetric_matrix(self):
        non_symmetric_matrices = [
            [
                [0, 1, 2],
                [2, 0, 0],
                [4, 0, 0],
            ],
            [
                [0, 10, 15, 20],
                [15, 0, 25, 30],
                [10, 20, 0, 35],
                [25, 30, 0, 0]
            ],
            [
                [0, 5, 0, 8, 0],
                [2, 0, 3, 8, 5],
                [0, 3, 0, 0, 7],
                [6, 8, 0, 0, 9],
                [0, 3, 7, 0, 0]
            ]
        ]
        
        vertex_counts = [3, 4, 5]
        
        for matrix, vertex_count in zip(non_symmetric_matrices, vertex_counts):
            self.assertEqual(check_matrix(matrix, vertex_count), 'Матрица не симметрична.')

    def test_invalid_values(self):
        invalid_value_matrices = [
            [
                [0, 101, 2],
                [101, 0, 3],
                [2, 3, 0]
            ],
            [
                [0, 10, 15, 20],
                [10, 0, 1000, 30],
                [15, 1000, 0, 35],
                [20, 30, 35, 0]
            ],
            [
                [0, 2, 0, 6, 0],
                [2, 0, 3, 8, -95],
                [0, 3, 0, 0, 7],
                [6, 8, 0, 0, 9],
                [0, -95, 7, 9, 0]
            ]
        ]
        
        vertex_counts = [3, 4, 5]
        
        for matrix, vertex_count in zip(invalid_value_matrices, vertex_counts):
            self.assertEqual(check_matrix(matrix, vertex_count), 'Матрица имеет некорректные значения. Значения матрицы должны быть числовые от 0 до 100.')
    
    def test_non_zero_diagonal(self):
        non_zero_diagonal_matrices = [
            [
                [1, 1, 2],
                [1, 1, 3],
                [2, 3, 1]
            ],
            [
                [0, 0, 0, 0, 70, 17],
                [0, 0, 12, 61, 0, 0],
                [0, 12, 5, 0, 55, 93],
                [0, 61, 0, 0, 0, 0],
                [70, 0, 55, 0, 0, 0],
                [17, 0, 93, 0, 0, 0]
            ],
            [
                [1, 0, 27, 0, 13, 0, 0, 0, 0],
                [0, 0, 44, 41, 0, 0, 0, 0, 0],
                [27, 44, 0, 0, 0, 0, 0, 0, 0],
                [0, 41, 0, 0, 0, 0, 0, 0, 0],
                [13, 0, 0, 0, 0, 99, 0, 0, 0],
                [0, 0, 0, 0, 99, 0, 49, 0, 0],
                [0, 0, 0, 0, 0, 49, 0, 41, 0],
                [0, 0, 0, 0, 0, 0, 41, 0, 63],
                [0, 0, 0, 0, 0, 0, 0, 63, 1]
            ]
        ]
        
        vertex_counts = [3, 6, 9]
        
        for matrix, vertex_count in zip(non_zero_diagonal_matrices, vertex_counts):
            self.assertEqual(check_matrix(matrix, vertex_count), 'По диагонали матрицы должны быть нули.')

    def test_invalid_vertex_count(self):
        invalid_vertex_count_matrices = [
            [
                [0, 1],
                [1, 0]
            ],
            [
                [0, 0, 27, 0, 13, 0, 0, 0, 0, 0, 0],
                [0, 0, 44, 41, 0, 0, 0, 0, 0, 0, 0],
                [27, 44, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 41, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [13, 0, 0, 0, 0, 99, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 99, 0, 49, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 49, 0, 41, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 41, 0, 63, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 63, 0, 41, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 41, 0, 63],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 63, 0]
            ],
            [
                [0]
            ]
        ]
        
        invalid_vertex_counts = [2, 11, 1]
        
        for matrix, vertex_count in zip(invalid_vertex_count_matrices, invalid_vertex_counts):
            self.assertEqual(check_matrix(matrix, vertex_count), 'Количество вершин матрицы должно быть от 3 до 10.')

    def test_valid_matrix(self):
        matrices = [
            [
                [0, 46, 38, 75],
                [46, 0, 4, 0],
                [38, 4, 0, 48],
                [75, 0, 48, 0]
                
            ],
            [
                [0, 5, 0, 0, 0],
                [5, 0, 6, 0, 8],
                [0, 6, 0, 7, 0],
                [0, 0, 7, 0, 9],
                [0, 8, 0, 9, 0]
            ],
            [
                [0, 0, 70, 13, 0, 0, 80],
                [0, 0, 50, 60, 83, 0, 0],
                [70, 50, 0, 71, 0, 0, 0],
                [13, 60, 71, 0, 0, 0, 0],
                [0, 83, 0, 0, 0, 0, 36],
                [0, 0, 0, 0, 0, 0, 14],
                [80, 0, 0, 0, 36, 14, 0]
            ]
        ]
        vertex_counts = [4, 5, 7]
        
        for matrix, vertex_count in zip(matrices, vertex_counts):
            with self.subTest(matrix=matrix, vertex_count=vertex_count):
                self.assertIsNone(check_matrix(matrix, vertex_count))

if __name__ == '__main__':
    unittest.main()