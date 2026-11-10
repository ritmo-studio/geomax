<?php
/**
 * Сайтовые значения для движка (образец — engine/site.example.php).
 * Единственное место, где сайт называет домен, счётчик и значения
 * по умолчанию для шеринга: в engine/ их нет.
 */
return [
    'prodHost'     => 'geomax-spb.ru',
    'name'         => 'ГЕОМАКС',
    'url'          => 'https://geomax-spb.ru/',
    'title'        => 'ГЕОМАКС — распорная гидравлическая система',
    'metaImage'    => 'https://geomax-spb.ru/assets/img/share.jpg',
    'metaImageW'   => 2400,
    'metaImageH'   => 1260,
    'themeColor'   => '#F9F9F9',
    'preloadFonts' => [],       // Manrope приходит ссылкой на Google Fonts из $headExtra страницы
    'metrikaId'    => null,     // счётчика у ГЕОМАКСа пока нет; появится номер — вписать, на боевом включится сам
];
