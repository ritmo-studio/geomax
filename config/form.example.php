<?php
/**
 * Настройки формы заявки. Скопировать в config/form.php и заполнить.
 *
 * config/form.php в гит не едет (.gitignore) и лежит вне докрута: докрут —
 * это public/, а файл на уровень выше. Пароль ящика нигде больше не хранится.
 *
 * Ящик-отправитель должен быть на домене сайта: тогда SPF и DKIM уже
 * настроены почтовым провайдером и письмо проходит как своё. Пароль —
 * «пароль приложения» из панели провайдера, не пароль от самого ящика.
 */
$root = dirname(__DIR__);

return [
    'to'      => ['com@geomax-spb.ru', 'office@geomax-spb.ru'],
    'subject' => 'Заявка с сайта ГЕОМАКС',
    'site'    => 'https://geomax-spb.ru/',
    'success' => 'Заявка отправлена. Мы свяжемся с вами в рабочее время.',

    'smtp' => [
        'host'      => 'smtp.yandex.ru',   // Mail.ru для бизнеса — smtp.mail.ru
        'port'      => 465,                // 465 + ssl, либо 587 + tls
        'secure'    => 'ssl',
        'user'      => 'site@geomax-spb.ru',
        'pass'      => 'пароль-приложения-из-панели-провайдера',
        'from'      => 'site@geomax-spb.ru',
        'from_name' => 'Сайт ГЕОМАКС',
        'helo'      => 'geomax-spb.ru',
        'timeout'   => 15,
    ],

    // Журнал заявок и счётчик частоты — вне докрута и вне гита.
    'log_dir'  => $root . '/var/leads',
    'rate_dir' => $root . '/var/rate',
    'rate'     => ['per_10min' => 3, 'per_day' => 10],

    // Поле-ловушка: людям не видно, боты заполняют.
    'honeypot' => 'rs_company_url',
];
