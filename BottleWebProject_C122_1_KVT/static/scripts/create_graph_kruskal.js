function buildGraph() {
    // Получение количества вершин графа из поля ввода
    var vertexCount = parseInt(document.getElementById("vertices-input").value);

    // Создание объекта для хранения данных о графе
    var graphData = {
        nodes: [],
        edges: []
    };

    // Генерация вершин графа
    for (var i = 0; i < vertexCount; i++) {
        graphData.nodes.push({ id: i, label: String(i), shape: "circle" });
    }

    // Генерация рёбер графа
    for (var i = 0; i < vertexCount; i++) {
        for (var j = i + 1; j < vertexCount; j++) {
            // Получение веса ребра из матрицы весов
            var weight = document.getElementById(`cell-${i}-${j}`).value;
            // Проверка наличия введенного веса
            if (weight !== "") {
                // Добавление ребра с весом и числом обозначающим его вес
                graphData.edges.push({ from: i, to: j, label: weight, title: String(weight) });
            }
        }
    }

    // Очистка контейнера для графа
    var container = document.getElementById("network");
    container.innerHTML = "";

    // Создание объекта для отображения графа
    var options = {
        nodes: {
            shape: "circle",
            size: 20,
            font: {
                size: 18,
                face: "Arial",
                bold: {
                    size: 14,
                    vadjust: 0
                }
            },
            margin: 20
        },
        edges: {
            smooth: {
                type: "straightCross",
                forceDirection: "vertical"
            },
            arrows: {
                to: { enabled: false }
            },
            font: {
                align: 'middle'
            },
            scaling: {
                label: true
            }
        }
    };
    var network = new vis.Network(container, graphData, options);
}
