% rebase('layout.tpl', title=title, year=year)

<!DOCTYPE html>
<html lang="ru">

<head> 
  <meta charset="UTF-8">
  <link rel="stylesheet" type="text/css" href="/static/content/style.css">
  <link rel="apple-touch-icon" type="image/png" href="https://cpwebassets.codepen.io/assets/favicon/apple-touch-icon-5ae1a0698dcc2402e9712f7d01ed509a57814f994c660df9f7a952f3060705ee.png" />
  <meta name="apple-mobile-web-app-title" content="CodePen">
  <link rel="shortcut icon" type="image/x-icon" href="https://cpwebassets.codepen.io/assets/favicon/favicon-aec34940fbc1a6e787974dcd360f2c6b63348d4b1f4e06c77743096d55480f33.ico" />
  <link rel="mask-icon" type="image/x-icon" href="https://cpwebassets.codepen.io/assets/favicon/logo-pin-b4b4269c16397ad2f0f7a01bcdf513a1994f4c94b8af2f191c09eb0d601762b1.svg" color="#111" />
  <script src="https://cpwebassets.codepen.io/assets/common/stopExecutionOnTimeout-2c7831bb44f98c1391d6a4ffda0e1fd302503391ca806e7fcc7b9b87197aec26.js"></script>
  <link rel="canonical" href="https://codepen.io/pojoga84/pen/MLevKR">
  <script>window.console = window.console || function(t) {};</script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.js"></script>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.css" rel="stylesheet" type="text/css"/>

</head>

<body class="body_kruskal">
    <div class="header_kruskal">
         <h1>Алгоритм Краскала</h1>
    </div>

    <img src="/static/images/graph.png" alt="Graph" class="custom-image-position">

  <div class="tablist">
    <input class="tablist__radio" type="radio" id="tab-1" name="tab" checked>
    <label class="tablist__label" for="tab-1" role="tab" aria-setsize="3" aria-posinset="1">Теоретический материал</label>
    <input class="tablist__radio" type="radio" id="tab-2" name="tab">
    <label class="tablist__label" for="tab-2" role="tab" aria-setsize="3" aria-posinset="2">Калькулятор</label>

    <div class="tablist__panels">
      <article class="tablist__panel tablist__panel--active" role="tabpanel">
        <div class="center-box">
       <p><strong>Алгоритм Краскала</strong> – эффективный алгоритм построения кратчайшего остова взвешанного связного неориентированного графа, заключающийся в упорядочении рёбер графа.</p>
     </div>
     <p></p>
        <p>Для наглядности работы алгоритма Краскала рассмотрим пример решения задачи.</p>
        <p><u>Задача:</u></p>
        <p>Дан неориентированный граф (рисунок 1). Заданы номера вершин (в примере это номера 0...8).</p>
        <div class="image-center">
            <img src="\static\images\graph1.png" alt="Graph1">
            <p class="image-caption"><em>Рисунок 1 - Взвешанный связной неориентированный граф</em></p>
        </div>
        <div class="text-image-container">
        <div class="text-block">
          <p>Заданы веса рёбер. Граф задается матрицей весов (рисунок 2).</p>
          <p>Если ребро существует в данном графе и у него есть вес, то в матрице весов оно выделено жёлтым цветом, в противном случае стоит прочерк.</p>
          <p>Относительно главной диагонали (диагонали нулей) матрица симметрична, так как граф неориентированный.</p>
        </div>
            <div class="image-block">
              <img src="/static/images/matrix.png" alt="Matrix of weights">
              <p class="image-caption"><em>Рисунок 2 - Матрица весов рёбер</em></p>
            </div>
         </div>
        <p><u>Требуется найти кратчайший остов/минимальное остовное дерево данного графа с помощью алгоритма Краскала.</u></p>
        <p>Начнем с того, что такое дерево и остовное дерево.</p>
         <div class="center-box">
           <p><strong>Дерево</strong> - это такое множество рёбер графа, в котором нет циклов.</p>
           <p><em>Например</em>, деревом не является сочетание рёбер 0-1-6, так как образуется цикл, а 0-2-1-6 уже является деревом.</p>
         </div>
         <p></p>
         <div class="center-box">
           <p><strong>Остовное дерево</strong> - это дерево, которое связывает все вершины графа.</p>
         </div>
         <p></p>
         <p>Вершины графа можно связать по-разному, разными остовными деревьями и среди этих деревьев есть дерево, имеющее минимальный вес. Вот его мы и будем вычислять.</p>
        <p><u>Решение:</u></p>
        <p>В начале выполнения алгоритма каждая вершина считается отдельным множеством. Формируется список множеств:</p>
         <div class="image-center">
            <img src="\static\images\list_sets.png" alt="List of sets">
            <p class="image-caption"><em>Рисунок 3 - Список множеств вершин</em></p>
        </div>
        <p>Затем составляется список ребер, который упорядочивается в порядке возрастания их веса:</p>
        <div class="text-image-container">
            <div class="image-block2">
                <figure>
                    <figcaption class="custom-figcaption">Таблица 1. Упорядоченный список рёбер</figcaption>
                    <img src="/static/images/table.png" alt="List of Ribs">
                </figure>
            </div>
            <div class="text-block2">
              <p>Далее каждое ребро включается в остовное дерево, если ребро не образует цикла с ранее включенными ребрами.</p>
              <p>Цикл образуется в том случае, когда оба конца ребра принадлежат одному и тому же множеству вершин. Если концы ребра находятся в разных множествах, то эти множества объединяются в одно. Цикл заканчивается, когда все вершины объединяются в одно множество. Это означает, что все вершины графа связаны общей сетью. Если вершины не объединились в одно множество, то граф является несвязным.</p>
              <p>Минимальное остовное дерево содержит n – 1 ребро, где n – количество вершин графа.</p>
            </div>
         </div>
        <p>Последовательность выполнения алгоритма:</p>
        <div class="image-center">
            <figure>
                <figcaption class="custom-figcaption">Таблица 2. Алгоритм</figcaption>
                <img src="/static/images/table1.png" alt="Algorithm">
            </figure>
        </div>
        <p></p>
        <p>Далее в соответствии с таблицей 2 строим кратчайший остов графа весом <em>L=28</em> (остов выделен зелёным цветом):</p>
        <div class="image-center">
           <img src="\static\images\graph2.png" alt="Graph2">
           <p class="image-caption"><em>Рисунок 4 - Кратчайший остов графа</em></p>
        </div>
        <p>Таким образом, мы разобрали работу алгоритма Краскала и с его помощью нашли кратчайший остов графа. Для большей наглядности воспользуйтесь нашим <a href="#" id="calculator-link">калькулятором</a>!</p>
        </article>
      <article id="calculator" class="tablist__panel" role="tabpanel">
            <form action="/home" method="post">
            <p>Количество вершин графа:</p>
            <p>
                <input type="number" id="vertices-input" name="vertexCount" min="1" max="10" value="3" onchange="generateMatrix()" class="rounded-input">
            </p>
            <p>Матрица весов рёбер:</p>
            <div id="matrix_kruskal"></div>
            <p></p>
            <p>
                <button type="button" class="rounded-button" onclick="buildGraph()">Построить</button>
                <button type="button" class="rounded-button">Сгенерировать</button>
                <button type="button" class="rounded-button">Из файла</button>
            </p>
            </form>
            <div id="network" style="width: 600px; height: 400px;"></div>
        </article>
        </div>
    </div>
    <script src="\static\scripts\matrix_kruskal.js"></script>
    <script src="\static\scripts\switch_calc.js"></script>
    <script src="\static\scripts\create_graph_kruskal.js"></script>
</body>
</html>

