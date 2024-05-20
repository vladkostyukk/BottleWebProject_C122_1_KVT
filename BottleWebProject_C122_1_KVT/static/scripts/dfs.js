let source_matrix = [];
let result_matrix = [];

const createCell = (writeCell, ind, i) => {
    if (writeCell) {
        return '<td><input type="number" min="0" max="1" value="0" onkeypress="return false"></td>';
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

const fillTable = (start, matrix) => {
    const tableSize = matrix.length;
    $("[name=count-vertex]").val(tableSize);
    $("[name=start-vertex]").val(start);

    const tableHtml = createTable(tableSize);
    let table = $("#dfs-matrix-table");
    table.html(tableHtml);

    for (let i = 0; i < tableSize; i++) {
        let row = $(table.find("tr").get(i));
        for (let j = i + 1; j < tableSize; j++) {
            let td = $(row.find("td").get(j));
            $(td.find("input")).val(matrix[i][j]);
        }
    }
    source_matrix = matrix;
    updateStartVertexLimit(matrix.length);
};

const resultConst = {
    imgSize: 400,
    circleRadius: 25,
    graphPadding: 5
};

const getVertex = (matrix) => matrix.map((element, index) => index + 1);

const getLines = (matrix) => {
    let lines = [];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = i + 1; j < matrix.length; j++) {
            matrix[i][j] && lines.push([i, j]);
        }
    }
    return lines;
}

const getVertexX = (count, num) => {
    const angle = 360.0 / count;
    const offset = resultConst.imgSize / 2;
    const padding = resultConst.graphPadding;
    const radius = offset - (padding * 2) - (resultConst.circleRadius * 2);
    return Math.cos((((num - 1) * angle + 90.0) % 360.0) * Math.PI / 180.0) * radius + 
        offset + padding;
}

const getVertexY = (count, num) => {
    const angle = 360.0 / count;
    const offset = resultConst.imgSize / 2;
    const padding = resultConst.graphPadding;
    const radius = offset - (padding * 2) - (resultConst.circleRadius * 2);
    return resultConst.imgSize - (Math.sin((((num - 1) * angle + 90.0) % 360.0) * Math.PI / 180.0) * radius +
        offset + padding);
}

const updateStartVertexLimit = (maxSize) => {
    const $element = $("input[name=start-vertex]");
    const currentVal = parseInt($element.val());
    if (currentVal >= maxSize) {
        $element.val(0);
    }
    $element.prop("max", maxSize - 1);
}

const showResult = () => {
    $("#result-panel").removeClass("hide");

    $("#diagram-source").html("");
    $("#diagram-result").html("");

    const svg = d3
        .select("#diagram-source").append("svg")
        .attr("width", resultConst.imgSize + "px")
        .attr("height", resultConst.imgSize + "px");

    const vertices = getVertex(source_matrix);
    const lines = getLines(source_matrix);

    svg
        .selectAll("line")
        .data(lines)
        .enter()
        .append("line")
        .style("stroke", "black")
        .attr("x1", ([from, to]) => getVertexX(source_matrix.length, from + 1))
        .attr("y1", ([from, to]) => getVertexY(source_matrix.length, from + 1))
        .attr("x2", ([from, to]) => getVertexX(source_matrix.length, to + 1))
        .attr("y2", ([from, to]) => getVertexY(source_matrix.length, to + 1));

    svg
        .selectAll("circle")
        .data(vertices)
        .enter()
        .append("circle")
        .style("stroke", "black")
        .style("fill", "#32CD32")
        .attr("r", resultConst.circleRadius)
        .attr("cx", (num) => getVertexX(source_matrix.length, num))
        .attr("cy", (num) => getVertexY(source_matrix.length, num));

    svg
        .selectAll("text")
        .data(vertices)
        .enter()
        .append("text")
        .text((num) => num -1)
        .attr("font-weight", "bold")
        .attr("dx", (num) => getVertexX(source_matrix.length, num) - 5)
        .attr("dy", (num) => getVertexY(source_matrix.length, num) + 5);

    const svg_result = d3
        .select("#diagram-result").append("svg")
        .attr("width", resultConst.imgSize + "px")
        .attr("height", resultConst.imgSize + "px");

    const result_vertices = getVertex(result_matrix);
    const result_lines = getLines(result_matrix);

    svg_result
        .selectAll("line")
        .data(result_lines)
        .enter()
        .append("line")
        .style("stroke", "black")
        .attr("x1", ([from, to]) => getVertexX(result_matrix.length, from + 1))
        .attr("y1", ([from, to]) => getVertexY(result_matrix.length, from + 1))
        .attr("x2", ([from, to]) => getVertexX(result_matrix.length, to + 1))
        .attr("y2", ([from, to]) => getVertexY(result_matrix.length, to + 1));

    svg_result
        .selectAll("circle")
        .data(result_vertices)
        .enter()
        .append("circle")
        .style("stroke", "black")
        .style("fill", "#32CD32")
        .attr("r", resultConst.circleRadius)
        .attr("cx", (num) => getVertexX(result_matrix.length, num))
        .attr("cy", (num) => getVertexY(result_matrix.length, num));

    svg_result
        .selectAll("text")
        .data(result_vertices)
        .enter()
        .append("text")
        .text((num) => num - 1)
        .attr("font-weight", "bold")
        .attr("dx", (num) => getVertexX(result_matrix.length, num) - 5)
        .attr("dy", (num) => getVertexY(result_matrix.length, num) + 5);
}

document.addEventListener('DOMContentLoaded', () => {
    $("#dfs-count-vertex").on("change", function () {
        const tableSize = $(this).val();
        const tableHtml = createTable(tableSize);
        $("#dfs-matrix-table").html(tableHtml);

        updateStartVertexLimit(tableSize);
    });
    $("#btn-result").on("click", function () {
        let formData = {};
        formData.startVertex = $("[name=start-vertex]").val();
        formData.matrixTable = [];

        $("[name=matrix-table] tr").each(function () {
            formData.matrixTable.push([]);
            $(this).find("td").each(function () {
                let value = $(this).find("input").val();
                formData.matrixTable[formData.matrixTable.length - 1].push(value ? parseInt(value) : 0);
            });
        });

        source_matrix = formData.matrixTable;

        window.fetch("/dfs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(body => body.json())
            .then(result => {
                result_matrix = result;
                showResult();
            });
    });

    $("#btn-generate").on("click", function () {
        window
            .fetch("/dfs/gen")
            .then(body => body.json())
            .then(json => fillTable(json.start_vertex, json.matrix));
        $("#result-panel").toggleClass("hide", true);
    });

    $("#btn-upload").on("click", function () {
        window
            .fetch("/dfs/upload")
            .then(body => body.json())
            .then(json => fillTable(json.start_vertex, json.matrix));
        $("#result-panel").toggleClass("hide", true);
    });

    $("#btn-save").on("click", function () {
        window.fetch("/dfs/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(result_matrix)
        });
    });

    $("#dfs-count-vertex").trigger("change");
});
