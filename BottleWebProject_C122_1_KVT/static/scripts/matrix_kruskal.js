
function generateMatrix() {
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
            matrix += `<td><input class="input_bfs rounded-input" type="number" min="0" value="0" id="cell-${i}-${j}" style="width: 100px;"></td>`;
        }
        matrix += "</tr>";
    }

    matrix += '</table>';
    document.getElementById('matrix_kruskal').innerHTML = matrix;
}

document.addEventListener('DOMContentLoaded', function () {
    generateMatrix(); // Создаем матрицу при загрузке страницы
});