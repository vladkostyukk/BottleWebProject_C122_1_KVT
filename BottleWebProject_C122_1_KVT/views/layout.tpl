<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title }} - My Bottle Application</title>
    <link rel="stylesheet" type="text/css" href="/static/content/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="/static/content/site.css" />
    <link rel="stylesheet" type="text/css" href="/static/content/styles.css" />
    <script src="/static/scripts/modernizr-2.6.2.js"></script>
</head>

<body>
    <div class="topnav">
        <a href="/home">Главная</a>
        <a href="/bfs">Поиск &laquo;в ширину&raquo;</a>
        <a href="/dfs">Поиск &laquo;в глубину&raquo;</a>
        <a href="/kruskal">Алгоритм Краскала</a>
        <a href="/about">Авторы</a>
    </div>

    <div class="container body-content">
        {{!base}}
        <hr />
        <footer>
            <p>&copy; {{ year }} - My Bottle Application</p>
        </footer>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var currentUrl = window.location.pathname;
            var links = document.querySelectorAll('div a');
            links.forEach(function(link) {
                if (link.getAttribute('href') === currentUrl) {
                    link.classList.add('active');
                }
            });

            if (!Array.from(links).some(link => link.classList.contains('active'))) {
                document.querySelector('.topnav a[href="/home"]').classList.add('active');
            }
        });
    </script>

    <script src="/static/scripts/jquery-1.10.2.js"></script>
    <script src="/static/scripts/bootstrap.js"></script>
    <script src="/static/scripts/respond.js"></script>

</body>
</html>
