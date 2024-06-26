% rebase('layout.tpl', title='Главная', year=year)

<!-- Фоновое изображение -->
<div class="body_about"></div>

<!-- Вступительный блок -->
<div class="index-text-div">
    <h1>Элементы теории графов</h1>
    <p>Алгоритм Краскала, алгоритмы обхода в ширину и в глубину – это мощные инструменты в области компьютерных наук, которые применяются для решения различных задач, связанных с графами и сетями. Каждый из них имеет свои уникальные особенности и применение, но их цель одна – нахождение оптимальных путей и связей между вершинами графа. Давайте глубже погрузимся в мир этих алгоритмов и узнаем, как они работают и как можно применять их в реальных задачах.</p>
</div>

<div class="index-cards-div">
    <!-- Карточка для перехода на страницу поиска в ширину -->
    <div class="index-card" onclick="location.href='/bfs';">
        <h2><b>Поиск в ширину</b></h2> 
        <p>Хотите узнать о принципе работы алгоритма поиска в ширину и его применении?</p> 
    </div>

    <!-- Карточка для перехода на страницу поиска в глубину -->
    <div class="index-card" onclick="location.href='/dfs';">
        <h2><b>Поиск в глубину</b></h2> 
        <p>Желаете узнать об алгоритме поиска в глубину и его применении?</p> 
    </div>

    <!-- Карточка для перехода на страницу алгоритма Краскала -->
    <div class="index-card" onclick="location.href='/kruskal';">
        <h2><b>Алгоритм Краскала</b></h2> 
        <p>Хотите узнать об алгоритме Краскала и его применении в теории графов?</p> 
    </div>
</div>