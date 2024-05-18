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