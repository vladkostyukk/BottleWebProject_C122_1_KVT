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

    <link rel="apple-touch-icon" type="image/png" href="https://cpwebassets.codepen.io/assets/favicon/apple-touch-icon-5ae1a0698dcc2402e9712f7d01ed509a57814f994c660df9f7a952f3060705ee.png" />
    <meta name="apple-mobile-web-app-title" content="CodePen">
    <link rel="shortcut icon" type="image/x-icon" href="https://cpwebassets.codepen.io/assets/favicon/favicon-aec34940fbc1a6e787974dcd360f2c6b63348d4b1f4e06c77743096d55480f33.ico" />
    <link rel="mask-icon" type="image/x-icon" href="https://cpwebassets.codepen.io/assets/favicon/logo-pin-b4b4269c16397ad2f0f7a01bcdf513a1994f4c94b8af2f191c09eb0d601762b1.svg" color="#111" />
    <script src="https://cpwebassets.codepen.io/assets/common/stopExecutionOnTimeout-2c7831bb44f98c1391d6a4ffda0e1fd302503391ca806e7fcc7b9b87197aec26.js"></script>
    <link rel="canonical" href="https://codepen.io/pojoga84/pen/MLevKR">
    <script>window.console = window.console || function(t) {};</script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.css" rel="stylesheet" type="text/css"/>
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
    <script src="/static/scripts/switch_calc.js"></script>
    <script src="https://d3js.org/d3.v7.min.js"></script>

</body>
</html>