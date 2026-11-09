<?php
/**
 * Разметка организации для главной. Кладётся страницей в $jsonLd.
 *
 * Только на главной: на внутренних страницах Organization был бы дублем,
 * а не уточнением. Факты дублируют текст подвала намеренно — их правят
 * вместе с content/site-footer.php, иначе разметка начнёт врать.
 */
return [
    '@context' => 'https://schema.org',
    '@type'    => 'Organization',
    'name'     => 'ГЕОМАКС',
    'legalName' => 'ООО «ГЕОМАКС»',
    'url'      => 'https://geomax-spb.ru/',
    'logo'     => 'https://geomax-spb.ru/assets/img/geomax-logo.svg',
    'description' => 'Распорная гидравлическая система «ГЕОМАКС» для крепления котлованов: аренда полного комплекта, проектные работы, геотехнический мониторинг и авторский надзор.',
    'address'  => [
        '@type'           => 'PostalAddress',
        'postalCode'      => '194017',
        'addressLocality' => 'Санкт-Петербург',
        'addressCountry'  => 'RU',
        'streetAddress'   => 'ул. Дрезденская, д.16а, лит.А, 2 этаж',
    ],
    'contactPoint' => [
        [
            '@type'       => 'ContactPoint',
            'contactType' => 'sales',
            'telephone'   => '+7-921-954-28-28',
            'email'       => 'com@geomax-spb.ru',
            'areaServed'  => 'RU',
            'availableLanguage' => 'Russian',
        ],
        [
            '@type'       => 'ContactPoint',
            'contactType' => 'customer service',
            'telephone'   => '+7-812-293-93-93',
            'email'       => 'office@geomax-spb.ru',
            'areaServed'  => 'RU',
            'availableLanguage' => 'Russian',
        ],
    ],
];
