% rebase('layout.tpl', title=title, year=year)

<div class="bfs-background"</div>

<div class="bfs-block-theory">
    <h1>Алгоритм поиска &laquo;в ширину&raquo;</h1>
    <div class="bfs-div-theory">
	    <div>
		    <p><b>Поиск в ширину</b> (англ. breadth-first search) – один из основных алгоритмов на графах, позволяющий находить все кратчайшие пути от заданной вершины и решать многие другие задачи.</p>
		    <p>На вход алгоритма подаётся невзвешенный граф и номер стартовой вершины.</p>
		    <p>Поиск в ширину подразумевает поуровневое исследование графа: вначале посещается корень – произвольно выбранный узел, затем – все потомки данного узла, после этого посещаются потомки потомков и т.д. Вершины просматриваются в порядке возрастания их расстояния от корня.</p>
	    </div>
		    <img src="https://i2.wp.com/miro.medium.com/1*3NKvODZparRFVKEwtVmrkw.gif" alt="Алгоритм">
    </div>
</div>

<div class="bfs-block-practice">
    <h2><b>Попробуйте сами!</b></h2>

    <div class="form-group">
        <h3>Количество вершин графа:</h3>
        <input class="input_bfs" type="number" id="vertices-input-bfs" min="3" max="10" value="3" onchange="generateMatrixBFS()" onkeydown="return false" onkeypress="return false">
    </div>

    <div class="form-group">
        <h3>Начальная вершина:</h3>
        <input class="input_bfs" type="number" id="start-input-bfs" min="1" max="3" value="1" onkeydown="return false" onkeypress="return false">
    </div>

    <h3>Матрица смежности:</h3>

    <div style="display: flex; align-items: left;">
        <a class="floating-button" onclick="generateRandomMatrix()" style="width: 170px;">Сгенерировать</a>

        <div>
            <label class="input-file-bfs">
                <input type="file" name="file" accept=".txt" onchange="handleFile(event)">
                <span id="span-text-bfs">Из файла</span>
            </label>
            <span id="error-message-bfs"></span>
        </div>
    </div>
    <div id="matrix_bfs"></div>

    <a class="floating-button" onclick="buildGraphBFS()">Построить</a>

    <div class="div-graph-bfs">
        <div id="original-graph"></div>
        <div id="spanning-tree-graph"></div>
    </div>
</div>