function generationMatrixKruskal() {
        const minVertices = 3;
        const maxVertices = 9;
        const errorMessageElement = document.getElementById('error-message');
        let vertexCount = Math.floor(Math.random() * (maxVertices - minVertices + 1)) + minVertices;
        while (vertexCount < minVertices) {
            vertexCount = Math.floor(Math.random() * (maxVertices - minVertices + 1)) + minVertices;
        }
        document.getElementById('vertices-input').value = vertexCount;
        generateMatrixKruskal(); // Сначала создаем пустую матрицу

        // Генерация случайных весов для ребер
        for (let i = 0; i < vertexCount; i++) {
            // Хранит количество связей для каждой вершины
            const connections = new Array(vertexCount).fill(0);

            for (let j = i + 1; j < vertexCount; j++) {
                // Решаем случайным образом, назначать ли вес для ребра
                if (Math.random() < 0.5 && connections[i] < 3 && connections[j] < 3) { // 50% вероятность назначения веса и проверка количества связей
                    const weight = Math.floor(Math.random() * 100) + 1;
                    document.getElementById(`cell-${i}-${j}`).value = weight;
                    document.getElementById(`cell-${j}-${i}`).value = weight; // Обеспечиваем симметрию матрицы
                    connections[i]++;
                    connections[j]++;
                } else {
                    document.getElementById(`cell-${i}-${j}`).value = 0;
                    document.getElementById(`cell-${j}-${i}`).value = 0; // Обеспечиваем симметрию матрицы
                }
            }
        }

        // Добавление ребер к случайным вершинам, если они остались изолированными и у вершины меньше 3 рёбер
        for (let i = 0; i < vertexCount; i++) {
            let hasEdge = false;
            let edgeCount = 0; // Счётчик рёбер для текущей вершины
            for (let j = 0; j < vertexCount; j++) {
                if (document.getElementById(`cell-${i}-${j}`).value !== "0") {
                    hasEdge = true;
                    edgeCount++;
                }
            }
            if (!hasEdge && edgeCount < 3) { // Проверяем, что у вершины меньше 3 рёбер
                const randomVertex = Math.floor(Math.random() * vertexCount);
                const weight = Math.floor(Math.random() * 100) + 1;
                document.getElementById(`cell-${i}-${randomVertex}`).value = weight;
                document.getElementById(`cell-${randomVertex}-${i}`).value = weight;
            }
        }
        errorMessageElement.style.display = 'none';
        buildGraphKruskal();
    }

