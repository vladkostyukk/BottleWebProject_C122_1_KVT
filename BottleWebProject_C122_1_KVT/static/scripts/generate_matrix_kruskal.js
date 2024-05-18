function generationMatrixKruskal() {
        const minVertices = 3;
        const maxVertices = 9;
        const errorMessageElement = document.getElementById('error-message');
        let vertexCount = Math.floor(Math.random() * (maxVertices - minVertices + 1)) + minVertices;
        while (vertexCount < minVertices) {
            vertexCount = Math.floor(Math.random() * (maxVertices - minVertices + 1)) + minVertices;
        }
        document.getElementById('vertices-input').value = vertexCount;
        generateMatrixKruskal(); // ������� ������� ������ �������

        // ��������� ��������� ����� ��� �����
        for (let i = 0; i < vertexCount; i++) {
            // ������ ���������� ������ ��� ������ �������
            const connections = new Array(vertexCount).fill(0);

            for (let j = i + 1; j < vertexCount; j++) {
                // ������ ��������� �������, ��������� �� ��� ��� �����
                if (Math.random() < 0.5 && connections[i] < 3 && connections[j] < 3) { // 50% ����������� ���������� ���� � �������� ���������� ������
                    const weight = Math.floor(Math.random() * 100) + 1;
                    document.getElementById(`cell-${i}-${j}`).value = weight;
                    document.getElementById(`cell-${j}-${i}`).value = weight; // ������������ ��������� �������
                    connections[i]++;
                    connections[j]++;
                } else {
                    document.getElementById(`cell-${i}-${j}`).value = 0;
                    document.getElementById(`cell-${j}-${i}`).value = 0; // ������������ ��������� �������
                }
            }
        }

        // ���������� ����� � ��������� ��������, ���� ��� �������� �������������� � � ������� ������ 3 ����
        for (let i = 0; i < vertexCount; i++) {
            let hasEdge = false;
            let edgeCount = 0; // ������� ���� ��� ������� �������
            for (let j = 0; j < vertexCount; j++) {
                if (document.getElementById(`cell-${i}-${j}`).value !== "0") {
                    hasEdge = true;
                    edgeCount++;
                }
            }
            if (!hasEdge && edgeCount < 3) { // ���������, ��� � ������� ������ 3 ����
                const randomVertex = Math.floor(Math.random() * vertexCount);
                const weight = Math.floor(Math.random() * 100) + 1;
                document.getElementById(`cell-${i}-${randomVertex}`).value = weight;
                document.getElementById(`cell-${randomVertex}-${i}`).value = weight;
            }
        }
        errorMessageElement.style.display = 'none';
        buildGraphKruskal();
    }

