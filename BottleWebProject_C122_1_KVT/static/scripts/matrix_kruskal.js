// ������� �������� ������� �� ������
function generateMatrixKruskal() {
    const n = parseInt(document.getElementById('vertices-input').value);
    let matrix = '<table>';

    // ������� ������� ����� � �������� �������� 
    matrix += '<tr><td></td>';
    for (let j = 0; j < n; j++) {
        matrix += `<td class="bfs-td" style="height: 30px; text-align: center;">${j}</td>`;
    }
    matrix += '</tr>';

    for (let i = 0; i < n; i++) {
        matrix += `<tr><td class="bfs-td" style="width: 30px; text-align: center;">${i}</td>`; // ������� ������� ����� � �������� ����� 
        for (let j = 0; j < n; j++) {
            if (i === j) { // ��� ������������ ���������
                matrix += `<td><input class="input_bfs rounded-input" type="number" min="0" value="0" id="cell-${i}-${j}" style="width: 80px;" readonly></td>`;
            } else {
                matrix += `<td><input class="input_bfs rounded-input" type="number" min="0" value="0" id="cell-${i}-${j}" style="width: 80px;"></td>`;
            }
        }
        matrix += "</tr>";
    }

    matrix += '</table>';
    document.getElementById('matrix_kruskal').innerHTML = matrix;

    // ��������� ���������� ������� ��� ��������� �������� � �������
    var inputs = document.querySelectorAll('.input_bfs');
    inputs.forEach(input => {
        input.addEventListener('change', function (event) {
            // �������� �������� �� ���������� ������
            var value = event.target.value;
            // �������� ������� ������ � ������� ���������� ������
            var rowIndex = parseInt(event.target.id.split('-')[1]);
            var colIndex = parseInt(event.target.id.split('-')[2]);
            // ���� ���������� ������ ��������� �� ���������, ��������� �� �������� ������ ���� � ��������� ���������
            if (rowIndex === colIndex) {
                event.target.value = 0;
                return;
            }
            // ������������� �������� � ��������������� ������������ ������
            document.getElementById(`cell-${colIndex}-${rowIndex}`).value = value;
        });
    });
}



// ������� ���������� �����
function buildGraphKruskal() {
    var vertexCount = parseInt(document.getElementById("vertices-input").value);
    var graphData = { nodes: [], edges: [] };
    const errorMessageElement = document.getElementById('error-message');

    for (var i = 0; i < vertexCount; i++) {
        graphData.nodes.push({ id: i, label: String(i), shape: "circle", size: 40 }); // ����������� ������ ����� �� 40
    }

    for (var i = 0; i < vertexCount; i++) {
        for (var j = i + 1; j < vertexCount; j++) {
            var weight = document.getElementById(`cell-${i}-${j}`).value;
            if (weight !== "" && parseFloat(weight) !== 0) {
                graphData.edges.push({
                    from: i,
                    to: j,
                    label: weight,
                    title: String(weight),
                    smooth: { enabled: false },
                    arrows: { to: { enabled: false } },
                    width: 2 // ����������� ������� �����
                });
            }
        }
    }

    var container = document.getElementById("network");
    container.innerHTML = "";

    var options = {
        layout: {
            improvedLayout: true,
            randomSeed: 2, // ��������� ��������� ��������� �����
            clusterThreshold: 150,
            hierarchical: { enabled: false }
        },
        physics: {
            enabled: true,
            barnesHut: {
                gravitationalConstant: -30000,
                centralGravity: 0.1,
                springLength: 200,
                springConstant: 0.05,
                damping: 0.09,
                avoidOverlap: 1
            },
            solver: 'barnesHut',
            stabilization: {
                enabled: true,
                iterations: 1000,
                fit: true // ������������� ��������� ���� � ����������
            },
            minVelocity: 0.75,
            maxVelocity: 50
        },
        interaction: { navigationButtons: true, keyboard: true },
        nodes: {
            shape: "circle",
            size: 40, // ����������� ������ ����� �� 40
            font: { size: 20, face: "Arial", bold: { size: 14, vadjust: 0 } },
            margin: 20,
            borderWidth: 2,
            borderWidthSelected: 2
        },
        edges: {
            smooth: false,
            arrows: { to: { enabled: true } },
            font: {
                align: 'middle',
                size: 16,
                strokeWidth: 1,
                strokeColor: '#ffffff'
            },
            scaling: { label: true },
            widthConstraint: { maximum: 50 }
        }
    };

    var network = new vis.Network(container, graphData, options);
    network.fit(); // ������������� ������������ ����
    document.getElementById('graphminostov').style.display = 'none';
    document.getElementById('graphButtons').style.display = 'block';
    errorMessageElement.style.display = 'none';
}



// ������� ��������� �������
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
    document.getElementById('graphminostov').style.display = 'none';
    buildGraphKruskal();
}



// ������� ��������� ������� �� �����
function handleFileKruskal(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const contents = e.target.result.trim();
        const matrix = parseMatrixKruskal(contents);

        const errorMessageElement = document.getElementById('error-message');

        if (matrix.length <= 2 || matrix.length >= 11) {
            errorMessageElement.textContent = '���������� ������ ������� � ����� ����� ������ ���� �� 3 �� 10.';
            errorMessageElement.style.display = 'block';
            return;
        }

        if (!isSymmetricKruskal(matrix)) {
            errorMessageElement.textContent = '������� � ����� ����� �������������.';
            errorMessageElement.style.display = 'block';
            return;
        }

        if (!isValidValuesKruskal(matrix)) {
            errorMessageElement.textContent = '������� ����� ������������ ��������. �������� ������� ������ ���� �� 0 �� 999, � �� ��������� ������ ���� ����!';
            errorMessageElement.style.display = 'block';
            return;
        }

        errorMessageElement.style.display = 'none';
        document.getElementById('graphminostov').style.display = 'none';
        displayMatrixKruskal(matrix);
        buildGraphKruskal();
    };

    // �������� �������� input[type=file], ����� ������� onchange ��������� ��� ������ ���� �� �����
    event.target.value = '';

    reader.readAsText(file);
}

function parseMatrixKruskal(contents) {
    return contents.trim().split('\n').map(row => row.trim().split(' ').map(Number));
}

function isSymmetricKruskal(matrix) {
    return matrix.every((row, i) =>
        row.slice(0, i).every((val, j) => val === matrix[j][i])
    );
}

function isValidValuesKruskal(matrix) {
    return matrix.every((row, i) =>
        row.every((value, j) => (i === j) ? (value === 0) : (value >= 0 && value <= 999))
    );
}

function displayMatrixKruskal(matrix) {
    const n = matrix.length;
    document.getElementById('vertices-input').value = n;

    let matrixHTML = '<table>';

    // ������� ������� ����� � �������� ��������
    matrixHTML += '<tr><td></td>';
    for (let i = 0; i < n; i++) {
        matrixHTML += `<td class="bfs-td" style="height: 30px;">${i + 1}</td>`;
    }

    matrixHTML += '</tr>';

    // ������� ������� � �������� ��� �����
    for (let i = 0; i < n; i++) {
        matrixHTML += `<tr><td class="bfs-td" style="width: 40px;">${i + 1}</td>`; // ������� ������� ����� � �������� �����
        for (let j = 0; j < n; j++) {
            if (i === j) {
                matrixHTML += `<td><input class="input_bfs rounded-input" type="number" value="${matrix[i][j]}" min="0" max="999" id="cell-${i}-${j}" style="width: 80px;" readonly></td>`;
            } else {
                matrixHTML += `<td><input class="input_bfs rounded-input" type="number" value="${matrix[i][j]}" min="0" max="999" id="cell-${i}-${j}" style="width: 80px;"></td>`;
            }
        }
        matrixHTML += "</tr>";
    }

    matrixHTML += '</table>';
    document.getElementById('matrix_kruskal').innerHTML = matrixHTML;

    // ��������� ���������� ������� ��� ��������� �������� � �������
    var inputs = document.querySelectorAll('.input_bfs');
    inputs.forEach(input => {
        input.addEventListener('change', function (event) {
            // �������� �������� �� ���������� ������
            var value = event.target.value;
            // �������� ������� ������ � ������� ���������� ������
            var rowIndex = parseInt(event.target.id.split('-')[1]);
            var colIndex = parseInt(event.target.id.split('-')[2]);
            // ���� ���������� ������ ��������� �� ���������, ��������� �� �������� ������ ���� � ��������� ���������
            if (rowIndex === colIndex) {
                event.target.value = 0;
                return;
            }
            // ������������� �������� � ��������������� ������������ ������
            document.getElementById(`cell-${colIndex}-${rowIndex}`).value = value;
        });
    });
}



// ������� ��� �������� ������ ��� ��������� �������� (�� ������)
function sendMatrixData() {
    const n = parseInt(document.getElementById('vertices-input').value);
    let matrix = [];

    for (let i = 0; i < n; i++) {
        let row = [];
        for (let j = 0; j < n; j++) {
            const cellValue = parseInt(document.getElementById(`cell-${i}-${j}`).value);
            row.push(cellValue);
        }
        matrix.push(row);
    }

    fetch('/home', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ matrix: matrix, vertexCount: n })
    })
        .then(response => response.json())
        .then(data => {
            // ��������� ������� ������������ ������ �� ������ �������
            const mstMatrix = data.mst_matrix;
            document.getElementById('graphminostov').style.display = 'block';
            // ����� ������� buildGraphKruskal � ���������� �������� � ����������� ������
            buildGraphKruskalMin(mstMatrix, n);
        })
        .catch(error => console.error('������:', error));
}
// ������� ���������� ����������� ������
function buildGraphKruskalMin(mstMatrix, vertexCount) {
    var graphData = { nodes: [], edges: [] };

    for (var i = 0; i < vertexCount; i++) {
        graphData.nodes.push({ id: i, label: String(i), shape: "circle", size: 40 }); // ����������� ������ ����� �� 40
    }

    for (var i = 0; i < vertexCount; i++) {
        for (var j = i + 1; j < vertexCount; j++) {
            var weight = mstMatrix[i][j];
            if (weight !== 0) {
                graphData.edges.push({
                    from: i,
                    to: j,
                    label: weight.toString(),
                    title: weight.toString(),
                    smooth: { enabled: false },
                    arrows: { to: { enabled: false } },
                    width: 2 // ����������� ������� �����
                });
            }
        }
    }

    var container = document.getElementById("network2");
    container.innerHTML = "";

    var options = {
        layout: {
            improvedLayout: true,
            randomSeed: 2, // ��������� ��������� ��������� �����
            clusterThreshold: 150,
            hierarchical: { enabled: false }
        },
        physics: {
            enabled: true,
            barnesHut: {
                gravitationalConstant: -30000,
                centralGravity: 0.1,
                springLength: 200,
                springConstant: 0.05,
                damping: 0.09,
                avoidOverlap: 1
            },
            solver: 'barnesHut',
            stabilization: {
                enabled: true,
                iterations: 1000,
                fit: true // ������������� ��������� ���� � ����������
            },
            minVelocity: 0.75,
            maxVelocity: 50
        },
        interaction: { navigationButtons: true, keyboard: true },
        nodes: {
            shape: "circle",
            size: 40, // ����������� ������ ����� �� 40
            font: { size: 20, face: "Arial", bold: { size: 14, vadjust: 0 } },
            margin: 20,
            borderWidth: 2,
            borderWidthSelected: 2
        },
        edges: {
            smooth: false,
            arrows: { to: { enabled: true } },
            font: {
                align: 'middle',
                size: 16,
                strokeWidth: 1,
                strokeColor: '#ffffff'
            },
            scaling: { label: true },
            widthConstraint: { maximum: 50 }
        }
    };

    var network2 = new vis.Network(container, graphData, options);
    network2.fit(); // ������������� ������������ ����
}


