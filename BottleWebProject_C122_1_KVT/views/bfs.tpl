% rebase('layout.tpl', title=title, year=year)

<!-- Задний фон -->
<div class="bfs-background"</div>

<!-- Блок теории -->
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

<!-- Блок практики -->
<div class="bfs-block-practice">
    <h2><b>Попробуйте сами!</b></h2>

    <!-- Форма для выбора количества вершин графа -->
    <div class="form-group">
        <h3>Количество вершин графа:</h3>
        <input class="input_bfs" type="number" id="vertices-input-bfs" min="3" max="10" value="3" onchange="generateMatrixBFS()" onkeydown="return false" onkeypress="return false">
    </div>

    <!-- Форма для выбора начальной вершины -->
    <div class="form-group">
        <h3>Начальная вершина:</h3>
        <input class="input_bfs" type="number" id="start-input-bfs" min="1" max="3" value="1" onkeydown="return false" onkeypress="return false">
    </div>

    <h3>Матрица смежности:</h3>

    <!-- Кнопки для генерации случайной матрицы или загрузки из файла -->
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

    <!-- Место для отображения матрицы смежности -->
    <div id="matrix_bfs"></div>

    <!-- Кнопка для построения графа на основе матрицы смежности -->
    <a class="floating-button" onclick="buildGraphBFS(); location.href='#div-graph-bfs'">Построить</a>

    <div id="div-graph-bfs">
        <!-- Место для отображения исходного графа -->
        <div id="original-graph"></div>
        <!-- Место для отображения остовного дерева графа на основе BFS -->
        <div id="spanning-tree-graph"></div>
    </div>

    <!-- Кнопка для сохранения матрицы в файл -->
    <div class="save-div-bfs">
        <a id="saveButtonBFS" class="floating-button" onclick="saveSpanningTree()">Сохранить</a>
    </div>
</div>