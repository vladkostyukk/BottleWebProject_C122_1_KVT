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
            // Проверка наличия введенного веса и его отличия от нуля
            if (weight !== "" && parseFloat(weight) !== 0) {
                // Добавление ребра с весом и числом обозначающим его вес
                graphData.edges.push({ from: i, to: j, label: weight, title: String(weight), smooth: { enabled: false }, arrows: { to: { enabled: false } } });
            }
        }
    }

    // Очистка контейнера для графа
    var container = document.getElementById("network");
    container.innerHTML = "";

    // Создание объекта для отображения графа
    var options = {
        layout: {
            hierarchical: {
                direction: "UD", // вертикальное направление
                sortMethod: "directed", // сортировка направленных рёбер
                nodeSpacing: 150, // расстояние между узлами
                levelSeparation: 200 // расстояние между уровнями
            }
        },
        nodes: {
            shape: "circle",
            size: 30, // Увеличиваем размер узлов
            font: {
                size: 18,
                face: "Arial",
                bold: {
                    size: 14,
                    vadjust: 0
                }
            },
            margin: 20,
            borderWidth: 2, // Увеличиваем ширину границы узлов для лучшей видимости
            borderWidthSelected: 2 // Увеличиваем ширину границы выбранных узлов
        },
        edges: {
            smooth: false, // Прямые линии без изгибов
            arrows: { to: { enabled: false } }, // Отключаем стрелки направления
            font: {
                align: 'middle',
                size: 14, // Уменьшаем размер шрифта для меток рёбер, чтобы уменьшить перекрытие
                strokeWidth: 1, // Устанавливаем ширину обводки для улучшения видимости текста
                strokeColor: '#ffffff' // Цвет обводки текста (белый для лучшего контраста)
            },
            scaling: {
                label: true
            },
            widthConstraint: {
                maximum: 50 // Устанавливаем максимальную ширину для рёбер, чтобы избежать перекрытия
            }
        },
        physics: {
            enabled: false // Отключаем физическую симуляцию для статичного отображения
        }
    };

    var network = new vis.Network(container, graphData, options);
}
