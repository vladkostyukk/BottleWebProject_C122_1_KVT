% rebase('layout.tpl', title=title, year=year)
<div class="dfs-background">
    <div class="dfs-card">
      <div class="row g-0">
        <div class="col-md-6 dfs-column">
          <div class="dfs-card-body">
            <h1 class="dfs-card-title">Алгоритм поиска "в глубину"</h1>
            <p class="dfs-card-text">
            Алгоритм поиска (или обхода) в глубину (англ. depth-first search, DFS) позволяет построить обход ориентированного или неориентированного графа, 
            при котором посещаются все вершины, доступные из начальной вершины. Он начинается с выбранной вершины и обходит все доступные вершины на максимальную глубину, 
            прежде чем возвращаться к следующей не посещенной вершине.
            </p>
            <p class="dfs-card-text">
            Результатом алгоритма поиска в глубину является некоторый маршрут, следуя которому можно обойти последовательно все вершины графа, доступные из начальной вершины.
            Этим он принципиально отличается от поиска в ширину, где одновременно обрабатывается множество вершин, в поиске в глубину в каждый момент исполнения алгоритма обрабатывается
            только одна вершина. 
            </p>
          </div>
        </div>
        <div class="col-md-6 dfs-column">
          <img src="../static/images/DFS.gif" class="dfs-card-img img-fluid rounded-end" alt="-Алгоритм">
        </div>
      </div>
    </div>

    <div class="dfs-card">
      <div class="row g-0">
          <div class="col-md-6 dfs-column">
              <div class="dfs-card-body">
                <h1 class="dfs-card-title">Попробуйте сами!</h1>
                <p class="dfs-card-text">Количество вершин:</p>
                <div>
                    <input type="number" min=4 max=10 value=4 name="count-vertex" id="dfs-count-vertex" class="form-control"  onkeypress="return false" />
                </div>
                <p class="dfs-card-text">Введите начальную вершину:</p>
                <div>
                    <input type="number" min=0 max=10 value=0 name="start-vertex" class="form-control" onkeypress="return false" />
                </div>
                <p class="dfs-card-text">Матрица смежности:</p>
                <div id="dfs-matrix-table" name="matrix-table">
                </div>
                <div class="dfs-card-buttons">
                      <button id="btn-result" type="button" class="floating-button">Решить</button>
                      <button id="btn-generate" type="button" class="floating-button" style="width: 170px;">Сгенерировать</button>
                      <button id="btn-upload" type="button" class="floating-button">Загрузить</button>
                </div>
              </div>
          </div>
          <div id="result-panel" class="col-md-6 dfs-column dfs-column-right hide">
            <h1 class="dfs-card-title">Диаграмма графа</h1>
            <div id="diagram-source" class="dfs-card-graph"></div>
            <h1 class="dfs-card-title">Остовной граф</h1>
            <div id="diagram-result" class="dfs-card-graph"></div>
            <div class="dfs-card-buttons">
                <button id="btn-save" type="button" class="floating-button">Сохранить</button>
            </div>
          </div>
      </div>
    </div>
</div>

<script src="/static/scripts/dfs.js"></script>
