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

        if (!isSymmetricKruskal(matrix)) {
            errorMessageElement.textContent = 'Матрица в вашем файле нессиметрична.';
            errorMessageElement.style.display = 'block';
            return;
        }

        if (!isValidValuesKruskal(matrix)) {
            errorMessageElement.textContent = 'Матрица имеет некорректные значения. Значения матрицы должны быть от 0 до 999, а по диагонали должны быть нули!';
            errorMessageElement.style.display = 'block';
            return;
        }

        errorMessageElement.style.display = 'none';
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
        row.every((value, j) => (i === j) ? (value === 0) : (value >= 0 && value <= 999))
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
