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
                    <input type="number" min=4 max=10 value=4 name="count-vertex" id="dfs-count-vertex" class="form-control"/>
                </div>
                <p class="dfs-card-text">Введите начальную вершину:</p>
                <div>
                    <input type="number" min=1 max=10 value=1 name="vertex" class="form-control" />
                </div>
                <p class="dfs-card-text">Матрица смежности:</p>
                <div id="dfs-matrix-table">
                </div>
                <div class="dfs-card-buttons">
                      <button type="button" class="btn btn-success">Решить</button>
                      <button type="button" class="btn btn-success">Сгенерировать</button>
                      <button type="button" class="btn btn-success">Загрузить</button>
                </div>
              </div>
          </div>
          <div class="col-md-6 dfs-column dfs-column-right">
            <div class="dfs-card-buttons">
                <button type="button" class="btn btn-success">Сохранить</button>
            </div>
          </div>
      </div>
    </div>
</div>

<script src="/static/scripts/dfs.js"></script>
