window.onload = function () {
    if (window.location.href.includes("/bfs")) {
        generateMatrixBFS();
    }

    if (window.location.href.includes("/kruskal")) {
        generateMatrixKruskal();
    }
};

// ������� ��� ��������� ������� � ������� BFS (Breadth-First Search)
function generateMatrixBFS() {
    // �������� ���������� ������ �� �������� � id 'vertices-input-bfs'
    const n = parseInt(document.getElementById('vertices-input-bfs').value);
    let matrix = '<table>';

    // �������� ��������� ������� � �������� ������
    matrix += '<tr><td></td>';
    for (let i = 0; i < n; i++) {
        matrix += `<td class="bfs-td" style="height: 30px;">${i + 1}</td>`;
    }
    matrix += '</tr>';

    // �������� ����� ��� ����� �������� � �������
    for (let i = 0; i < n; i++) {
        matrix += `<tr><td class="bfs-td" style="width: 40px;">${i + 1}</td>`;
        for (let j = 0; j < n; j++) {
            if (i === j) {
                matrix += `<td><input class="input_bfs" type="number" min="0" value="0" id="cell-${i}-${j}" readonly></td>`;
            } else {
                matrix += `<td><input class="input_bfs" type="number" value="0" min="0" max="1" id="cell-${i}-${j}"></td>`;
            }
        }
        matrix += "</tr>";
    }

    matrix += '</table>';
    document.getElementById('matrix_bfs').innerHTML = matrix;

    // ��������� ���������� ��������� �������� ����� ��� ���������� ������������ ��������
    document.getElementById('matrix_bfs').addEventListener('change', function (event) {
        const target = event.target;
        const value = target.value;
        const rowIndex = parseInt(target.id.split('-')[1]);
        const colIndex = parseInt(target.id.split('-')[2]);

        // ���������� �������� � ������������ ������
        document.getElementById(`cell-${colIndex}-${rowIndex}`).value = value;
    });
}

// ������� ��� ��������� ������������ �����
function handleFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    // ���������� ������� onload ��� FileReader
    reader.onload = function (e) {
        const contents = e.target.result.trim();
        const matrix = parseMatrix(contents);

        // �������� ������� ����� ������������ �������
        if (matrix.length > 4 && matrix.length < 11 && isSymmetric(matrix) && isValidValues(matrix)) {
            displayMatrix(matrix);
        } else {
            console.log('Matrix is not valid or does not meet the required conditions.');
        }
    };

    // �������� �������� input[type=file], ����� ������� onchange ��������� ��� ������ ���� �� �����
    event.target.value = '';

    reader.readAsText(file);
}

// ������� ��� �������� ����������� ����� � �������
function parseMatrix(contents) {
    return contents.trim().split('\n').map(row => row.trim().split(' ').map(Number));
}

// ������� ��� �������� �������������� �������
function isSymmetric(matrix) {
    return matrix.every((row, i) =>
        row.slice(0, i).every((val, j) => val === matrix[j][i])
    );
}

// ������� ��� �������� ���������� �������� � �������
function isValidValues(matrix) {
    return matrix.every((row, i) =>
        row.every((value, j) => (i === j) ? (value === 0) : (value === 0 || value === 1))
    );
}

// ������� ��� ��������� ��������� ���������� ������� � �������� ��������
function generateRandomMatrix() {
    // ��������� ���������� ������� ������� �� 3 �� 10
    const n = Math.floor(Math.random() * (10 - 3 + 1)) + 3;

    // �������� ���������� ������� ������� n x n, ����������� ������
    let matrix = Array.from({ length: n }, () => Array(n).fill(0));

    // ���������� �������� ������������ ������� ���������� ���������� � ������ ������� ������������
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            matrix[i][j] = Math.round(Math.random());
            matrix[j][i] = matrix[i][j]; // �������� ��������, ����� ������� ���� ������������
        }
    }

    // ����� ������� ��� ����������� �������
    displayMatrix(matrix);
}

// ������� ��� ����������� ������� � ����������
function displayMatrix(matrix) {
    // ������������� ���������� ������ � ���� ����� 'vertices-input-bfs'
    document.getElementById('vertices-input-bfs').value = matrix.length;

    let matrixHTML = '<table>';

    // �������� ��������� ������� � �������� ������
    matrixHTML += '<tr><td></td>';
    for (let i = 0; i < matrix.length; i++) {
        matrixHTML += `<td class="bfs-td" style="height: 30px;">${i + 1}</td>`;
    }

    matrixHTML += '</tr>';

    // �������� ������� � �������� ��� �����
    for (let i = 0; i < matrix.length; i++) {
        matrixHTML += `<tr><td class="bfs-td" style="width: 40px;">${i + 1}</td>`;
        for (let j = 0; j < matrix.length; j++) {
            if (i === j) {
                // ��� ������������ ��������� ������������� ������ ������
                matrixHTML += `<td><input class="input_bfs" type="number" value="${matrix[i][j]}" min="0" max="1" id="cell-${i}-${j}" readonly></td>`;
            } else {
                // ��� ��������� ��������� ���������� ���������� ��������
                matrixHTML += `<td><input class="input_bfs" type="number" value="${matrix[i][j]}" min="0" max="1" id="cell-${i}-${j}"></td>`;
            }
        }
        matrixHTML += "</tr>";
    }

    matrixHTML += '</table>';
    document.getElementById('matrix_bfs').innerHTML = matrixHTML;
}

function buildGraphBFS() {
    const n = parseInt(document.getElementById('vertices-input-bfs').value);
    const matrix = [];

    // ��������� �������� �� ����� �������
    for (let i = 0; i < n; i++) {
        matrix.push([]);
        for (let j = 0; j < n; j++) {
            matrix[i][j] = parseInt(document.getElementById(`cell-${i}-${j}`).value);
        }
    }

    // ������� ���������� �������� �����, ���� ��� ����
    d3.select('svg').remove();

    // ������� SVG ��������� ��� ����������� �����
    const width = 400;
    const height = 400;
    const svg = d3.select('#graph').append('svg')
        .attr('width', width)
        .attr('height', height);

    // ����������� ������ �����
    const nodeRadius = 20;
    const nodes = Array.from({ length: n }, (_, i) => ({ id: i }));
    const node = svg.selectAll('.node')
        .data(nodes)
        .enter().append('circle')
        .attr('r', nodeRadius)
        .attr('fill', 'black');

    // ��������� ������ ����� ���������
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === 1) {
                svg.append('line')
                    .attr('x1', width / 2 + Math.cos(2 * Math.PI * i / n) * (width / 2 - nodeRadius))
                    .attr('y1', height / 2 + Math.sin(2 * Math.PI * i / n) * (height / 2 - nodeRadius))
                    .attr('x2', width / 2 + Math.cos(2 * Math.PI * j / n) * (width / 2 - nodeRadius))
                    .attr('y2', height / 2 + Math.sin(2 * Math.PI * j / n) * (height / 2 - nodeRadius))
                    .attr('stroke', 'black')
                    .attr('stroke-width', 2);
            }
        }
    }

    // ���������������� ������ �� ����������
    node.attr('cx', (_, i) => width / 2 + Math.cos(2 * Math.PI * i / n) * (width / 2 - nodeRadius))
        .attr('cy', (_, i) => height / 2 + Math.sin(2 * Math.PI * i / n) * (height / 2 - nodeRadius));

    // ���������� ������� ������
    svg.selectAll('.node-label')
        .data(nodes)
        .enter().append('text')
        .attr('x', (_, i) => width / 2 + Math.cos(2 * Math.PI * i / n) * (width / 2 - nodeRadius))
        .attr('y', (_, i) => height / 2 + Math.sin(2 * Math.PI * i / n) * (width / 2 - nodeRadius))
        .text(d => d.id + 1)
        .attr('text-anchor', 'middle')
        .attr('dy', '.3em')
        .attr('fill', 'white');
}