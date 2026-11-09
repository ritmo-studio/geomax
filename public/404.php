<?php
/**
 * Страница «не найдено».
 *
 * Код ответа важнее вида: 404 с кодом 200 — это soft 404, поиск
 * индексирует ошибки как страницы и ругается в Вебмастере.
 * Заголовок ставится до любого вывода, поэтому строка первая.
 *
 * Маршрут сюда задаёт nginx: error_page 404 /404.php;
 * PHP о запросе на несуществующий адрес сам не узнаёт.
 */
http_response_code(404);

$pageTitle       = 'Страница не найдена — ГЕОМАКС';
$metaDescription = '';
$pageUrl         = 'https://geomax-spb.ru/404';
$bodyClass       = 'page-404';
$noindex         = true;   // и из карты сайта выпадает по тому же признаку

$root = dirname($_SERVER['DOCUMENT_ROOT']);
// Докрут — это public/, а репозиторий на уровень выше: наружу отдаётся
// только то, что в public. Исходники, сборка, контент и .git лежат вне
// досягаемости веб-сервера, и запрещать их правилами не нужно.
// Отсюда же $engine: папка сборки переносится в новый сайт целиком.
$engine = $root . '/engine';
include $engine . '/blocks/main/head.php';
?>
<?php include $engine . '/blocks/page-404/page-404.php'; ?>
<?php include $engine . '/blocks/main/footer.php'; ?>
