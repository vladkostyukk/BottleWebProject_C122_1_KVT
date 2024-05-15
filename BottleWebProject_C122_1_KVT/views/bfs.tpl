% rebase('layout.tpl', title=title, year=year)

<div class="bfs-background">

    <div class="bfs-block-theory">
        <h1>Алгоритм поиска в ширину</h1>
        <div class="bfs_div_theory">
	        <div>
		        <p><b>Поиск в ширину</b> (англ. breadth-first search) – один из основных алгоритмов на графах, позволяющий находить все кратчайшие пути от заданной вершины и решать многие другие задачи.</p>
		        <p>На вход алгоритма подаётся невзвешенный граф и номер стартовой вершины.</p>
		        <p>Поиск в ширину подразумевает поуровневое исследование графа: вначале посещается корень – произвольно выбранный узел, затем – все потомки данного узла, после этого посещаются потомки потомков и т.д. Вершины просматриваются в порядке возрастания их расстояния от корня.</p>
	        </div>
		        <img src="https://i2.wp.com/miro.medium.com/1*3NKvODZparRFVKEwtVmrkw.gif" alt="Алгоритм.gif">
        </div>
    </div>

    <div class="bfs-block-practice">
        <div>
            <h2><b>Попробуйте сами!</b></h2>

            <div class="form-group">
                <h3>Количество вершин графа:</h3>
                <input class="input_bfs" type="number" id="vertices-input" min="3" max="10" value="3" onchange="generateMatrix()">
            </div>

            <h3>Матрица смежности:</h3>

            <div id="matrix_bfs"></div>

            <a class="floating-button" onclick="buildGraph()">Построить</a>
            <a class="floating-button">Сгенерировать</a>
            <a class="floating-button">Из файла</a>
        </div>

        <div>
            <div id="graph"></div>
        </div>
    </div>

</div>
<script src="https://d3js.org/d3.v7.min.js"></script>
<script>
    window.onload = generateMatrix;

    function generateMatrix() {
        const n = parseInt(document.getElementById('vertices-input').value);
        let matrix = '<table>';
        
        // Создаем верхнюю шапку с номерами столбцов
        matrix += '<tr><td></td>';
        for (let j = 0; j < n; j++) {
            matrix += `<td class="bfs-td" style="height: 30px;">${j + 1}</td>`;
        }
        matrix += '</tr>';

        for (let i = 0; i < n; i++) {
            matrix += `<tr><td class="bfs-td" style="width: 30px;">${i + 1}</td>`; // Создаем боковую шапку с номерами строк
            for (let j = 0; j < n; j++) {
                matrix += `<td><input class="input_bfs" type="number" min="0" max="1" value="0" id="cell-${i}-${j}"></td>`;
            }
            matrix += "</tr>";
        }
        
        matrix += '</table>';
        document.getElementById('matrix_bfs').innerHTML = matrix;
    }

    let network;

    function buildGraph() {
        const n = parseInt(document.getElementById('vertices-input').value);
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

    function bfsTraversal() {
        if (!network) {
            alert('Сначала постройте граф.');
            return;
        }
        
        const startNode = 0;
        const visited = new Array(network.getNodeCount()).fill(false);
        const queue = [startNode];
        
        visited[startNode] = true;
        network.selectNodes([startNode]);
        
        const timer = setInterval(() => {
            if (queue.length === 0) {
                clearInterval(timer);
                return;
            }
            
            const currentNode = queue.shift();
            network.selectNodes([currentNode]);
            
            const neighbors = network.getConnectedNodes(currentNode);  // Get connected nodes
            
            neighbors.forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                    network.selectNodes([neighbor]);
                    network.focus(neighbor);
                }
            });
        }, 1000);
    }

</script>