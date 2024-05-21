<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title }}</title>
    <link rel="stylesheet" type="text/css" href="/static/content/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="/static/content/site.css" />
    <link rel="stylesheet" type="text/css" href="/static/content/styles.css" />
    <script src="/static/scripts/modernizr-2.6.2.js"></script>

    <!-- Устанавливает иконку, которая будет отображаться во вкладке браузера и в закладках -->
    <link rel="shortcut icon" type="image/x-icon" href="https://cpwebassets.codepen.io/assets/favicon/logo-pin-b4b4269c16397ad2f0f7a01bcdf513a1994f4c94b8af2f191c09eb0d601762b1.svg" color="#111" />

    <script src="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.css" rel="stylesheet" type="text/css"/>

    <script src="https://d3js.org/d3.v7.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>
</head>

<body>
    <div class="topnav">
        <a href="/home">Главная</a>
        <div class="dropdown">
            <button class="dropbtn">Алгоритмы</button>
            <div class="dropdown-content">
                <a href="/bfs">Поиск &laquo;в ширину&raquo;</a>
                <a href="/dfs">Поиск &laquo;в глубину&raquo;</a>
                <a href="/kruskal">Алгоритм Краскала</a>
            </div>
        </div>
        <a href="/about">Авторы</a>
    </div>

    <div>
        {{!base}}
        <hr />
        <footer>
            <p>&copy; {{ year }} – BottleWebProject_C122_1_KVT</p>
        </footer>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
             var currentUrl = window.location.pathname;
             var links_div = document.querySelectorAll('div a');

             links_div.forEach(function(link) {
                 if (link.getAttribute('href') === currentUrl) {
                     link.classList.add('active');
                 }
             });

             var links_drop = document.querySelectorAll('.dropdown-content a');

             links_drop.forEach(function(link) {
                if (link.getAttribute('href') === currentUrl) {
                    document.querySelector('.dropdown .dropbtn').classList.add('active');
                }
            });


             if (!Array.from(links_div).some(link => link.classList.contains('active'))) {
                 document.querySelector('.topnav a[href="/home"]').classList.add('active');
             }
         });
         
    </script>

    <script src="/static/scripts/jquery-1.10.2.js"></script>
    <script src="/static/scripts/bootstrap.js"></script>
    <script src="/static/scripts/respond.js"></script>
    <script src="/static/scripts/bfs.js"></script>
    <script src="/static/scripts/matrix_kruskal.js"></script>
    <script src="/static/scripts/create_graph_kruskal.js"></script>

</body>
</html>