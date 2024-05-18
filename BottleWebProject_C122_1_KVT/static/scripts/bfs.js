window.onload = function () {
    if (window.location.href.includes("/bfs")) {
        generateMatrixBFS();
    }

    if (window.location.href.includes("/kruskal")) {
        generateMatrixKruskal();
    }
};

// Функция для генерации матрицы с помощью BFS (Breadth-First Search)
function generateMatrixBFS() {
    // Получаем количество вершин из элемента с id 'vertices-input-bfs'
    const n = parseInt(document.getElementById('vertices-input-bfs').value);
    let matrix = '<table>';

    // Создание заголовка таблицы с номерами вершин
    matrix += '<tr><td></td>';
    for (let i = 0; i < n; i++) {
        matrix += `<td class="bfs-td" style="height: 30px;">${i + 1}</td>`;
    }
    matrix += '</tr>';

    // Создание ячеек для ввода значений в матрицу
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

    // Добавляем обработчик изменения значений ячеек для обновления симметричных значений
    document.getElementById('matrix_bfs').addEventListener('change', function (event) {
        const target = event.target;
        const value = target.value;
        const rowIndex = parseInt(target.id.split('-')[1]);
        const colIndex = parseInt(target.id.split('-')[2]);

        // Обновление значения в симметричной ячейке
        document.getElementById(`cell-${colIndex}-${rowIndex}`).value = value;
    });
}

// Функция для обработки загруженного файла
function handleFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    // Обработчик события onload для FileReader
    reader.onload = function (e) {
        const contents = e.target.result.trim();
        const matrix = parseMatrix(contents);

        // Проверка условий перед отображением матрицы
        if (matrix.length > 4 && matrix.length < 11 && isSymmetric(matrix) && isValidValues(matrix)) {
            displayMatrix(matrix);
        } else {
            console.log('Matrix is not valid or does not meet the required conditions.');
        }
    };

    // Сбросить значение input[type=file], чтобы событие onchange сработало при выборе того же файла
    event.target.value = '';

    reader.readAsText(file);
}

// Функция для парсинга содержимого файла в матрицу
function parseMatrix(contents) {
    return contents.trim().split('\n').map(row => row.trim().split(' ').map(Number));
}

// Функция для проверки симметричности матрицы
function isSymmetric(matrix) {
    return matrix.every((row, i) =>
        row.slice(0, i).every((val, j) => val === matrix[j][i])
    );
}

// Функция для проверки валидности значений в матрице
function isValidValues(matrix) {
    return matrix.every((row, i) =>
        row.every((value, j) => (i === j) ? (value === 0) : (value === 0 || value === 1))
    );
}

// Функция для генерации рандомной квадратной матрицы с заданным размером
function generateRandomMatrix() {
    // Генерация случайного размера матрицы от 3 до 10
    const n = Math.floor(Math.random() * (10 - 3 + 1)) + 3;

    // Создание квадратной матрицы размера n x n, заполненной нулями
    let matrix = Array.from({ length: n }, () => Array(n).fill(0));

    // Заполнение верхнего треугольника матрицы случайными значениями и делаем матрицу симметричной
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            matrix[i][j] = Math.round(Math.random());
            matrix[j][i] = matrix[i][j]; // Отражаем значение, чтобы матрица была симметричной
        }
    }

    // Вызов функции для отображения матрицы
    displayMatrix(matrix);
}

// Функция для отображения матрицы в интерфейсе
function displayMatrix(matrix) {
    // Устанавливаем количество вершин в поле ввода 'vertices-input-bfs'
    document.getElementById('vertices-input-bfs').value = matrix.length;

    let matrixHTML = '<table>';

    // Создание заголовка таблицы с номерами вершин
    matrixHTML += '<tr><td></td>';
    for (let i = 0; i < matrix.length; i++) {
        matrixHTML += `<td class="bfs-td" style="height: 30px;">${i + 1}</td>`;
    }

    matrixHTML += '</tr>';

    // Создание таблицы с ячейками для графа
    for (let i = 0; i < matrix.length; i++) {
        matrixHTML += `<tr><td class="bfs-td" style="width: 40px;">${i + 1}</td>`;
        for (let j = 0; j < matrix.length; j++) {
            if (i === j) {
                // Для диагональных элементов устанавливаем только чтение
                matrixHTML += `<td><input class="input_bfs" type="number" value="${matrix[i][j]}" min="0" max="1" id="cell-${i}-${j}" readonly></td>`;
            } else {
                // Для остальных элементов отображаем изменяемые значения
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

    // Считываем значения из ячеек матрицы
    for (let i = 0; i < n; i++) {
        matrix.push([]);
        for (let j = 0; j < n; j++) {
            matrix[i][j] = parseInt(document.getElementById(`cell-${i}-${j}`).value);
        }
    }

    // Удаляем предыдущие элементы графа, если они были
    d3.select('svg').remove();

    // Создаем SVG контейнер для отображения графа
    const width = 400;
    const height = 400;
    const svg = d3.select('#graph').append('svg')
        .attr('width', width)
        .attr('height', height);

    // Отображение вершин графа
    const nodeRadius = 20;
    const nodes = Array.from({ length: n }, (_, i) => ({ id: i }));
    const node = svg.selectAll('.node')
        .data(nodes)
        .enter().append('circle')
        .attr('r', nodeRadius)
        .attr('fill', 'black');

    // Отрисовка связей между вершинами
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

    // Позиционирование вершин на окружности
    node.attr('cx', (_, i) => width / 2 + Math.cos(2 * Math.PI * i / n) * (width / 2 - nodeRadius))
        .attr('cy', (_, i) => height / 2 + Math.sin(2 * Math.PI * i / n) * (height / 2 - nodeRadius));

    // Добавление номеров вершин
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