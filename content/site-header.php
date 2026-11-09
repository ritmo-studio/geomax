<?php
/**
 * ГЕОМАКС · контент блока «site-header».
 *
 * Логотип — вектор, он часть кода: /assets/img/geomax-logo.svg.
 * Пункты меню ведут на id блоков страницы, их выставляет public/index.php.
 */
return [
    'logo_href' => '/',
    'logo_src' => '/assets/img/geomax-logo.svg',
    'logo_label' => 'ГЕОМАКС',
    'phone' => '8 (812) 293-93-93',
    'phone_href' => '78122939393',
    'cta_label' => 'Получить расчёт аренды',
    'cta_href' => '#lead-form',
    'cta_icon' => true,
    'menu' => [
        [
            'plain' => true,
            'submenu' => null,
            'label' => 'Преимущества',
            'href' => '#advantages',
        ],
        [
            'plain' => true,
            'submenu' => null,
            'label' => 'Наши объекты',
            'href' => '#objects',
        ],
        [
            'plain' => true,
            'submenu' => null,
            'label' => 'Аренда',
            'href' => '#rent',
        ],
        [
            'plain' => true,
            'submenu' => null,
            'label' => 'Дополнительные услуги',
            'href' => '#services',
        ],
        [
            'plain' => true,
            'submenu' => null,
            'label' => 'Контакты',
            'href' => '#contacts',
        ],
    ],
];
