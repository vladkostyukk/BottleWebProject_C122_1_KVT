const createCell = (writeCell) => {
    if (writeCell) {
        return '<td><input type="number" min="0" max="1" value="0"></td>';
    } else {
        return '<td class="dfs-empty-cell">&nbsp;</td>';
    }
}

const createRow = (index, size) => {
    let row = '<tr>';
    for (let i = 0; i < size; i++) {
        row += createCell(i > index);
    }
    return row + '</tr>'
}

const createTable = (size) => {
    let table = '<table><tbody>';
    for (let i = 0; i < size; i++) {
        table += createRow(i, size)
    }
    return table + '</tbody></table>';
}

document.addEventListener('DOMContentLoaded', () => {
    console.log(jQuery === undefined);
    $("#dfs-count-vertex").on("change", function () {
        const tableSize = $(this).val();
        const tableHtml = createTable(tableSize);
        $("#dfs-matrix-table").html(tableHtml);
    });
});
