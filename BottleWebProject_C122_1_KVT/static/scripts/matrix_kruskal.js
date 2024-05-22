// Функция создания матрицы на экране
function generateMatrixKruskal() {
    const n = parseInt(document.getElementById('vertices-input').value);
    let matrix = '<table>';

    // Создаем верхнюю шапку с номерами столбцов 
    matrix += '<tr><td></td>';
    for (let j = 0; j < n; j++) {
        matrix += `<td class="bfs-td" style="height: 30px; text-align: center;">${j}</td>`;
    }
    matrix += '</tr>';

    for (let i = 0; i < n; i++) {
        matrix += `<tr><td class="bfs-td" style="width: 30px; text-align: center;">${i}</td>`; // Создаем боковую шапку с номерами строк 
        for (let j = 0; j < n; j++) {
            if (i === j) { // Для диагональных элементов
                matrix += `<td><input class="input_bfs rounded-input" type="number" min="0" max="100" value="0" id="cell-${i}-${j}" style="width: 80px;" readonly oninput="this.value = Math.min(Math.max(this.value, 0), 100)"></td>`;
            } else {
                matrix += `<td><input class="input_bfs rounded-input" type="number" min="0" max="100" value="0" id="cell-${i}-${j}" style="width: 80px;" oninput="this.value = Math.min(Math.max(this.value, 0), 100)"></td>`;
            }
        }
        matrix += "</tr>";
    }

    matrix += '</table>';
    document.getElementById('matrix_kruskal').innerHTML = matrix;

    // Добавляем обработчик событий для изменения значений в ячейках
    var inputs = document.querySelectorAll('.input_bfs');
    inputs.forEach(input => {
        input.addEventListener('change', function (event) {
            // Получаем значение из измененной ячейки
            var value = event.target.value;
            // Получаем индексы строки и столбца измененной ячейки
            var rowIndex = parseInt(event.target.id.split('-')[1]);
            var colIndex = parseInt(event.target.id.split('-')[2]);
            // Если измененная ячейка находится на диагонали, оставляем ее значение равным нулю и прерываем обработку
            if (rowIndex === colIndex) {
                event.target.value = 0;
                return;
            }
            // Устанавливаем значение в соответствующей симметричной ячейке
            document.getElementById(`cell-${colIndex}-${rowIndex}`).value = value;
        });
    });
}



// Функция построения графа
function buildGraphKruskal() {
    var vertexCount = parseInt(document.getElementById("vertices-input").value);  // Получение количества вершин из поля ввода
    var graphData = { nodes: [], edges: [] };  // Инициализация объекта данных графа
    const errorMessageElement = document.getElementById('error-message');  // Получение элемента для вывода сообщения об ошибке
    const connectMessageElement = document.getElementById('connect-message');  // Получение элемента для вывода сообщения о связи графа

    // Создание вершин графа
    for (var i = 0; i < vertexCount; i++) {
        graphData.nodes.push({ id: i, label: String(i), shape: "circle", size: 40 });  // Добавление вершины в объект данных графа
    }

    // Создание рёбер графа на основе значений в ячейках
    for (var i = 0; i < vertexCount; i++) {
        for (var j = i + 1; j < vertexCount; j++) {
            var weight = document.getElementById(`cell-${i}-${j}`).value;  // Получение значения веса ребра из соответствующей ячейки
            if (weight !== "" && parseFloat(weight) !== 0) {  // Проверка наличия веса ребра
                graphData.edges.push({  // Добавление ребра в объект данных графа
                    from: i,
                    to: j,
                    label: weight,
                    title: String(weight),
                    smooth: { enabled: false },
                    arrows: { to: { enabled: false } },
                    width: 2
                });
            }
        }
    }

    // Проверка связности графа
    if (!isGraphConnected(vertexCount, graphData.edges)) {  // Вызов функции проверки связности
        connectMessageElement.style.display = 'block';  
        document.getElementById('graphButtons').style.display = 'none';  
        connectMessageElement.innerHTML = "Граф несвязный!"; 
        return;
    } else {
        connectMessageElement.style.display = 'none'; 
    }

    var container = document.getElementById("network");  // Получение контейнера для отображения графа
    container.innerHTML = "";  // Очистка контейнера

    var options = {
        layout: {  // Опции компоновки вершин
            improvedLayout: true,  // Улучшенная компоновка вершин
            randomSeed: 2,  // Задание случайного начального состояния для генерации графа
            hierarchical: { enabled: false }  // Отключение иерархической компоновки
        },
        physics: {  // Опции физики графа
            enabled: true,  // Включение физики
            barnesHut: {  // Алгоритм Барнса-Хатт для ускорения симуляции
                gravitationalConstant: -30000,  // Гравитационная постоянная для притяжения вершин
                centralGravity: 0.1,  // Центральная гравитация для уменьшения "размазывания" графа
                springLength: 200,  // Длина пружины, которая определяет расстояние между вершинами
                springConstant: 0.05,  // Коэффициент пружины для определения силы упругости между вершинами
                damping: 0.09,  // Сопротивление среды (трение), что предотвращает бесконечное колебание графа
                avoidOverlap: 1  // Предотвращение перекрытия вершин
            },
            solver: 'barnesHut',  // Выбор алгоритма симуляции
            stabilization: {  // Опции стабилизации графа
                enabled: true,  // Включение стабилизации
                iterations: 1000,  // Количество итераций стабилизации
                fit: true  // Автоматическое масштабирование графа
            },
            minVelocity: 0.75,  // Минимальная скорость вершин
            maxVelocity: 50  // Максимальная скорость вершин
        },
        interaction: {  // Опции взаимодействия с графом
            navigationButtons: true,  // Отображение кнопок навигации
            keyboard: true  // Включение управления с клавиатуры
        },
        nodes: {  // Опции вершин
            shape: "circle",  // Форма вершин
            size: 40,  // Размер вершин
            font: { size: 20, face: "Arial", bold: { size: 14, vadjust: 0 } },  // Настройки шрифта
            margin: 20,  // Отступы
            borderWidth: 2,  // Ширина границы вершин
            borderWidthSelected: 2  // Ширина границы выбранных вершин
        },
        edges: {  // Опции рёбер
            smooth: false,  // Отключение сглаживания рёбер
            arrows: { to: { enabled: true } },  // Отображение стрелок на рёбрах
            font: {  // Опции шрифта для подписей рёбер
                align: 'middle',  // Выравнивание текста
                size: 16,  // Размер шрифта
                strokeWidth: 1,  // Ширина обводки текста
                strokeColor: '#ffffff'  // Цвет обводки текста
            },
            scaling: { label: true },  // Включение масштабирования меток рёбер
            widthConstraint: { maximum: 50 }  // Ограничение максимальной ширины рёбер
        }
    };

    var network = new vis.Network(container, graphData, options);  // Создание объекта для отображения графа
    network.fit();  // Автоматическое масштабирование графа
    document.getElementById('graphminostov').style.display = 'none';  
    document.getElementById('graphButtons').style.display = 'block';  
    errorMessageElement.style.display = 'none';  
}



// Функция для определения связности графа
function isGraphConnected(vertexCount, edges) {
    // Создание списка смежности
    var adjList = {};
    for (var i = 0; i < vertexCount; i++) {
        adjList[i] = [];
    }

    // Заполнение списка смежности на основе ребер
    edges.forEach(edge => {
        adjList[edge.from].push(edge.to);
        adjList[edge.to].push(edge.from);
    });

    // Инициализация массива посещенных вершин
    var visited = new Array(vertexCount).fill(false);
    // Инициализация стека с начальной вершиной
    var stack = [0];
    visited[0] = true;
    var visitedCount = 1;

    // Обход графа в глубину
    while (stack.length > 0) {
        var node = stack.pop();
        // Перебор соседних вершин текущей вершины
        adjList[node].forEach(neighbor => {
            // Если соседняя вершина не посещена, посещаем ее и добавляем в стек
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                visitedCount++;
                stack.push(neighbor);
            }
        });
    }

    // Если количество посещенных вершин равно общему количеству вершин в графе, то граф связный
    return visitedCount === vertexCount;
}



// Функция генерации матрицы
function generationMatrixKruskal() {
    const minVertices = 3;
    const maxVertices = 9;
    const errorMessageElement = document.getElementById('error-message');
    let vertexCount;

    function generationMatrix2() {
        vertexCount = Math.floor(Math.random() * (maxVertices - minVertices + 1)) + minVertices;
        document.getElementById('vertices-input').value = vertexCount;
        generateMatrixKruskal(); // Сначала создаем пустую матрицу

        // Генерация случайных весов для ребер
        const connections = new Array(vertexCount).fill(0).map(() => new Set());

        for (let i = 0; i < vertexCount; i++) {
            for (let j = i + 1; j < vertexCount; j++) {
                if (Math.random() < 0.5 && connections[i].size < 3 && connections[j].size < 3) { // 50% вероятность назначения веса и проверка количества связей
                    const weight = Math.floor(Math.random() * 100) + 1;
                    document.getElementById(`cell-${i}-${j}`).value = weight;
                    document.getElementById(`cell-${j}-${i}`).value = weight; // Обеспечиваем симметрию матрицы
                    connections[i].add(j);
                    connections[j].add(i);
                } else {
                    document.getElementById(`cell-${i}-${j}`).value = 0;
                    document.getElementById(`cell-${j}-${i}`).value = 0; // Обеспечиваем симметрию матрицы
                }
            }
        }

        // Проверка изолированных вершин
        for (let i = 0; i < vertexCount; i++) {
            if (connections[i].size === 0) {
                let randomVertex;
                do {
                    randomVertex = Math.floor(Math.random() * vertexCount);
                } while (randomVertex === i || connections[randomVertex].size >= 3);

                const weight = Math.floor(Math.random() * 100) + 1;
                document.getElementById(`cell-${i}-${randomVertex}`).value = weight;
                document.getElementById(`cell-${randomVertex}-${i}`).value = weight; // Обеспечиваем симметрию матрицы
                connections[i].add(randomVertex);
                connections[randomVertex].add(i);
            }
        }

        // Проверка на связность графа 
        function isGraphConnected() {
            const visited = new Array(vertexCount).fill(false);
            const stack = [0];
            visited[0] = true;

            while (stack.length > 0) {
                const node = stack.pop();
                connections[node].forEach((neighbor) => {
                    if (!visited[neighbor]) {
                        visited[neighbor] = true;
                        stack.push(neighbor);
                    }
                });
            }

            return visited.every(v => v);
        }

        if (!isGraphConnected()) {
            generationMatrix2(); // Перегенерируем граф, если он несвязный
        }
    }

    generationMatrix2();
    errorMessageElement.style.display = 'none';
    document.getElementById('graphminostov').style.display = 'none';
    buildGraphKruskal();
}



// Функция получения матрицы из файла
function handleFileKruskal(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const contents = e.target.result.trim();
        const matrix = parseMatrixKruskal(contents);

        const errorMessageElement = document.getElementById('error-message');

        if (matrix.length <= 2 || matrix.length >= 11) {
            errorMessageElement.textContent = 'Количество вершин матрицы в вашем файле должно быть от 3 до 10.';
            errorMessageElement.style.display = 'block';
            return;
        }

        if (!isValidValuesKruskal(matrix)) {
            errorMessageElement.textContent = 'Матрица имеет некорректные значения. Значения матрицы должны быть числовые от 0 до 100, а по диагонали должны быть нули!';
            errorMessageElement.style.display = 'block';
            return;
        }

        if (!isSymmetricKruskal(matrix)) {
            errorMessageElement.textContent = 'Матрица в вашем файле не симметрична.';
            errorMessageElement.style.display = 'block';
            return;
        }

        

        errorMessageElement.style.display = 'none';
        document.getElementById('graphminostov').style.display = 'none';
        displayMatrixKruskal(matrix);
        buildGraphKruskal();
    };

    // Сбросить значение input[type=file], чтобы событие onchange сработало при выборе того же файла
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
        row.every((value, j) => (i === j) ? (value === 0) : (value >= 0 && value <= 100))
    );
}

function displayMatrixKruskal(matrix) {
    const n = matrix.length;
    document.getElementById('vertices-input').value = n;

    let matrixHTML = '<table>';

    // Создаем верхнюю шапку с номерами столбцов
    matrixHTML += '<tr><td></td>';
    for (let i = 0; i < n; i++) {
        matrixHTML += `<td class="bfs-td" style="height: 30px;">${i + 1}</td>`;
    }

    matrixHTML += '</tr>';

    // Создаем таблицу с ячейками для графа
    for (let i = 0; i < n; i++) {
        matrixHTML += `<tr><td class="bfs-td" style="width: 40px;">${i + 1}</td>`; // Создаем боковую шапку с номерами строк
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

    // Добавляем обработчик событий для изменения значений в ячейках
    var inputs = document.querySelectorAll('.input_bfs');
    inputs.forEach(input => {
        input.addEventListener('change', function (event) {
            // Получаем значение из измененной ячейки
            var value = event.target.value;
            // Получаем индексы строки и столбца измененной ячейки
            var rowIndex = parseInt(event.target.id.split('-')[1]);
            var colIndex = parseInt(event.target.id.split('-')[2]);
            // Если измененная ячейка находится на диагонали, оставляем ее значение равным нулю и прерываем обработку
            if (rowIndex === colIndex) {
                event.target.value = 0;
                return;
            }
            // Устанавливаем значение в соответствующей симметричной ячейке
            document.getElementById(`cell-${colIndex}-${rowIndex}`).value = value;
        });
    });
}



// Функция для отправки данных для алгоритма Краскала (на питоне)
function sendMatrixDataKruskal() {
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
            // Получение матрицы минимального остова и веса из ответа сервера
            const mstMatrix = data.mst_matrix;
            const mstWeight = data.mst_weight;

            // Сохранение матрицы минимального остова в глобальную переменную
            window.mstMatrix = mstMatrix;

            // Отображение веса минимального остова
            const weightMessage = document.getElementById('weight-message');
            weightMessage.innerText = `Вес кратчайшего остова L = ${mstWeight}`;

            // Отображение графа минимального остова
            document.getElementById('graphminostov').style.display = 'block';
            buildGraphKruskalMin(mstMatrix, n);
        })
        .catch(error => console.error('Ошибка:', error));
}



// Функция сохранения исходной матрицы графа в файл
function saveGraphKruskal() {
    const n = parseInt(document.getElementById('vertices-input').value);
    let matrix = [];

    for (let i = 0; i < n; i++) {
        let row = [];
        for (let j = 0; j < n; j++) {
            const cellValue = document.getElementById(`cell-${i}-${j}`).value;
            row.push(cellValue);
        }
        matrix.push(row);
    }

    // Формируем содержимое файла в виде строки
    let fileContent = '';
    for (let i = 0; i < n; i++) {
        fileContent += matrix[i].join(' ') + '\n';
    }

    // Создаем Blob и сохраняем его как файл
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'graph_matrix.txt');
}



// Функция сохранения матрицы кратчайшего остова в файл
function saveGraphKruskalMin() {
    if (!window.mstMatrix) {
        console.error('Матрица кратчайшего остова не найдена');
        return;
    }

    let mstMatrix = window.mstMatrix;
    let n = mstMatrix.length;
    let fileContent = '';

    for (let i = 0; i < n; i++) {
        fileContent += mstMatrix[i].join(' ') + '\n';
    }

    // Создаем Blob и сохраняем его как файл
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'mst_matrix.txt');
}



// Функция построения кратчайшего остова
function buildGraphKruskalMin(mstMatrix, vertexCount) {
    var graphData = { nodes: [], edges: [] }; // Создаем объект для хранения данных о графе

    for (var i = 0; i < vertexCount; i++) {
        graphData.nodes.push({ id: i, label: String(i), shape: "circle", size: 40 }); // Добавляем узлы в объект данных графа
    }

    for (var i = 0; i < vertexCount; i++) {
        for (var j = i + 1; j < vertexCount; j++) {
            var weight = mstMatrix[i][j]; // Получаем вес ребра из матрицы остова
            if (weight !== 0) { // Проверяем, что вес не равен нулю (есть ребро)
                graphData.edges.push({ // Добавляем ребро в объект данных графа
                    from: i,
                    to: j,
                    label: weight.toString(), // Преобразуем вес в строку
                    title: weight.toString(),
                    smooth: { enabled: false }, // Отключаем сглаживание
                    arrows: { to: { enabled: false } },
                    width: 2 // Устанавливаем ширину ребра
                });
            }
        }
    }

    var container = document.getElementById("network2"); // Получаем контейнер для отображения графа
    container.innerHTML = ""; // Очищаем содержимое контейнера

    var options = { // Настройки отображения графа
        layout: {
            improvedLayout: true,
            randomSeed: 2, // Фиксируем начальное положение узлов
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
                fit: true // Автоматически подгонять граф к контейнеру
            },
            minVelocity: 0.75,
            maxVelocity: 50
        },
        interaction: { navigationButtons: true, keyboard: true }, // Настройки интеракции с графом
        nodes: { // Настройки вершин
            shape: "circle",
            size: 40,
            font: { size: 20, face: "Arial", bold: { size: 14, vadjust: 0 } },
            margin: 20,
            borderWidth: 2,
            borderWidthSelected: 2
        },
        edges: { // Настройки рёбер
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

    var network2 = new vis.Network(container, graphData, options); // Создаем объект сети с использованием данных графа и настроек
    network2.fit(); // Автоматически масштабируем граф
}



// Функция для перехода на окошко калькулятора
function selectTabTCalculate() {
    document.getElementById('tab-2').checked = true;
} 









