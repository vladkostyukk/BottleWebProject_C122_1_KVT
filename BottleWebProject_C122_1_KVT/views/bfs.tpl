% rebase('layout.tpl', title=title, year=year)

<div class="bfs-background"</div>

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
    <h2><b>Попробуйте сами!</b></h2>

    <div class="form-group">
        <h3>Количество вершин графа:</h3>
        <input class="input_bfs" type="number" id="vertices-input-bfs" min="3" max="10" value="3" onchange="generateMatrixBFS()">
    </div>

    <h3>Матрица смежности:</h3>

    <div id="matrix_bfs" onload="buildGraphBFS()"></div>

    <a class="floating-button" onclick="buildGraphBFS(); location.href='#graph';">Построить</a>
    <a class="floating-button" style="width: 170px;">Сгенерировать</a>

    <label class="input-file-bfs">
	   	<input type="file" name="file" accept=".txt" onchange="handleFile(event)">		
	   	<span>Из файла</span>
 	</label>

    <div id="graph"></div>
</div>