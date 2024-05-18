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
                matrix += `<td><input class="input_bfs rounded-input" type="number" min="0" value="0" id="cell-${i}-${j}" style="width: 80px;" readonly></td>`;
            } else {
                matrix += `<td><input class="input_bfs rounded-input" type="number" min="0" value="0" id="cell-${i}-${j}" style="width: 80px;"></td>`;
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