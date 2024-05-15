% rebase('layout.tpl', title=title, year=year)

<h1 class="bfs_h1">Алгоритм поиска в ширину</h1>
<div class="bfs_div_theory">
	<div>
		<p><b>Поиск в ширину</b> (англ. breadth-first search) – один из основных алгоритмов на графах, позволяющий находить все кратчайшие пути от заданной вершины и решать многие другие задачи.</p>
		<p>На вход алгоритма подаётся невзвешенный граф и номер стартовой вершины.</p>
		<p>Поиск в ширину подразумевает поуровневое исследование графа: вначале посещается корень – произвольно выбранный узел, затем – все потомки данного узла, после этого посещаются потомки потомков и т.д. Вершины просматриваются в порядке возрастания их расстояния от корня.</p>
	</div>
		<img src="https://i2.wp.com/miro.medium.com/1*3NKvODZparRFVKEwtVmrkw.gif" alt="Алгоритм.gif">
</div>

<div class="bfs_div_practice">
    <h2><b>Попробуйте сами!</b></h2>

    <div class="form-group">
        <h3>Количество вершин графа:</h3>
        <input class="input_bfs" type="number" id="vertices-input" min="3" max="10" value="3" onchange="generateMatrix()">
    </div>

    <h3>Матрица смежности:</h3>

    <div id="matrix_bfs"></div>

    <a class="floating-button" onclick="buildGraph()">Построить</a>
</div>

<button onclick="bfsTraversal()">Обход в ширину</button>
<div id="graph"></div>

<script>
    window.onload = generateMatrix;

    function generateMatrix() {
        const n = parseInt(document.getElementById('vertices-input').value);
        let matrix = '<table>';
        
        for (let i = 0; i < n; i++) {
            matrix += "<tr>";
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
        const nodes = new vis.DataSet();
        const edges = new vis.DataSet();
        const addedEdges = new Set();
        
        for (let i = 0; i < n; i++) {
            nodes.add({ id: i, label: i.toString() });
        }
        
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const value = parseInt(document.getElementById(`cell-${i}-${j}`).value);
                if (value === 1 && !addedEdges.has(`${j}-${i}`)) {
                    edges.add({ from: i, to: j });
                    addedEdges.add(`${i}-${j}`);
                }
            }
        }
        
        const container = document.getElementById('graph');
        const data = { nodes: nodes, edges: edges };
        const options = {};
        network = new vis.Network(container, data, options);
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