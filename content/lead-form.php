<?php
/**
 * ГЕОМАКС · контент блока «lead-form».
 *
 * Поля формы. Этот же список читает обработчик (engine/form): второго
 * описания полей нет, иначе оно разошлось бы с разметкой. max — предел
 * длины, он же maxlength в поле и проверка на сервере; превышение
 * отклоняется, а не обрезается.
 */
return [
    'heading_tag' => 'h2',
    'title' => 'Подберем распорную систему для вашего объекта',
    'lead' => 'Оставьте заявку, и мы подготовим коммерческое предложение с учетом параметров вашего объекта',
    'form_action' => '/form.php',
    'consent_html' => 'Я подтверждаю ознакомление с <a class="sds-lead-form__consent-link" href="#privacy">Политикой обработки персональных данных</a> и даю согласие на обработку моих персональных данных.',
    'name' => 'your-consent',
    'fields' => [
        [
            'is_text' => true,
            'name' => 'your-name',
            'max' => 100,
            'label' => 'Имя',
            'input_type' => 'text',
            'autocomplete' => 'name',
            'required' => true,
        ],
        [
            'is_text' => true,
            'name' => 'your-company',
            'max' => 150,
            'label' => 'Название компании',
            'input_type' => 'text',
            'autocomplete' => 'organization',
        ],
        [
            'is_text' => true,
            'name' => 'your-email',
            'max' => 254,
            'label' => 'E-mail',
            'input_type' => 'email',
            'autocomplete' => 'email',
            'required' => true,
        ],
        [
            'is_text' => true,
            'name' => 'your-phone',
            'max' => 30,
            'label' => 'Телефон',
            'input_type' => 'tel',
            'autocomplete' => 'tel',
        ],
    ],
    'message_field' => [
        [
            'is_textarea' => true,
            'name' => 'your-message',
            'max' => 2000,
            'label' => 'Сообщение',
        ],
    ],
    'cta_label' => 'Получить расчет аренды',
    'cta_href' => '#',
    'cta_icon' => true,
];
