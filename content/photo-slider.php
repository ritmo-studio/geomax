<?php
/**
 * ГЕОМАКС · контент блока «photo-slider».
 *
 * Карточек в дорожке столько, сколько записей в cards: вёрстка их не считает.
 * В утверждённом макете стояли две заглушки, снимков от заказчика пришло десять.
 *
 * Пропорция слота одна на оба брейкпоинта (672x480 и 291x208 — это 1,4),
 * поэтому мобильного мастера нет и поля image_m_* пустые: тот же srcset.
 *
 * alt описывает кадр, а не объект: названий и адресов объектов заказчик
 * пока не дал. Придут — переписать, это заметный SEO-текст.
 */
return [
    'heading_tag' => 'h2',
    'title' => 'Наши объекты',
    'lead' => '',
    'track_label' => 'Наши объекты',
    'pager' => true,
    'cards' => [
        [
            'image_src' => '/assets/img/photo-slider-1-d-672.jpg',
            'image_alt' => 'Распорная система ГЕОМАКС в котловане, вид вдоль главной распорки',
            'image_avif_srcset' => '/assets/img/photo-slider-1-d-336.avif 336w, /assets/img/photo-slider-1-d-672.avif 672w, /assets/img/photo-slider-1-d-1344.avif 1344w',
            'image_webp_srcset' => '/assets/img/photo-slider-1-d-336.webp 336w, /assets/img/photo-slider-1-d-672.webp 672w, /assets/img/photo-slider-1-d-1344.webp 1344w',
            'image_jpg_srcset' => '/assets/img/photo-slider-1-d-336.jpg 336w, /assets/img/photo-slider-1-d-672.jpg 672w, /assets/img/photo-slider-1-d-1344.jpg 1344w',
            'image_m_avif_srcset' => '',
            'image_m_webp_srcset' => '',
            'image_m_jpg_srcset' => '',
        ],
        [
            'image_src' => '/assets/img/photo-slider-2-d-672.jpg',
            'image_alt' => 'Два яруса распорок ГЕОМАКС над армированной фундаментной плитой',
            'image_avif_srcset' => '/assets/img/photo-slider-2-d-336.avif 336w, /assets/img/photo-slider-2-d-672.avif 672w, /assets/img/photo-slider-2-d-1344.avif 1344w',
            'image_webp_srcset' => '/assets/img/photo-slider-2-d-336.webp 336w, /assets/img/photo-slider-2-d-672.webp 672w, /assets/img/photo-slider-2-d-1344.webp 1344w',
            'image_jpg_srcset' => '/assets/img/photo-slider-2-d-336.jpg 336w, /assets/img/photo-slider-2-d-672.jpg 672w, /assets/img/photo-slider-2-d-1344.jpg 1344w',
            'image_m_avif_srcset' => '',
            'image_m_webp_srcset' => '',
            'image_m_jpg_srcset' => '',
        ],
        [
            'image_src' => '/assets/img/photo-slider-3-d-672.jpg',
            'image_alt' => 'Гидравлический узел распорки ГЕОМАКС крупным планом у стены из шпунта',
            'image_avif_srcset' => '/assets/img/photo-slider-3-d-336.avif 336w, /assets/img/photo-slider-3-d-672.avif 672w, /assets/img/photo-slider-3-d-1344.avif 1344w',
            'image_webp_srcset' => '/assets/img/photo-slider-3-d-336.webp 336w, /assets/img/photo-slider-3-d-672.webp 672w, /assets/img/photo-slider-3-d-1344.webp 1344w',
            'image_jpg_srcset' => '/assets/img/photo-slider-3-d-336.jpg 336w, /assets/img/photo-slider-3-d-672.jpg 672w, /assets/img/photo-slider-3-d-1344.jpg 1344w',
            'image_m_avif_srcset' => '',
            'image_m_webp_srcset' => '',
            'image_m_jpg_srcset' => '',
        ],
        [
            'image_src' => '/assets/img/photo-slider-4-d-672.jpg',
            'image_alt' => 'Распорка ГЕОМАКС на бетонной подготовке котлована',
            'image_avif_srcset' => '/assets/img/photo-slider-4-d-336.avif 336w, /assets/img/photo-slider-4-d-672.avif 672w, /assets/img/photo-slider-4-d-1344.avif 1344w',
            'image_webp_srcset' => '/assets/img/photo-slider-4-d-336.webp 336w, /assets/img/photo-slider-4-d-672.webp 672w, /assets/img/photo-slider-4-d-1344.webp 1344w',
            'image_jpg_srcset' => '/assets/img/photo-slider-4-d-336.jpg 336w, /assets/img/photo-slider-4-d-672.jpg 672w, /assets/img/photo-slider-4-d-1344.jpg 1344w',
            'image_m_avif_srcset' => '',
            'image_m_webp_srcset' => '',
            'image_m_jpg_srcset' => '',
        ],
        [
            'image_src' => '/assets/img/photo-slider-5-d-672.jpg',
            'image_alt' => 'Котлован с распорной системой ГЕОМАКС, на заднем плане башенный кран',
            'image_avif_srcset' => '/assets/img/photo-slider-5-d-336.avif 336w, /assets/img/photo-slider-5-d-672.avif 672w, /assets/img/photo-slider-5-d-1344.avif 1344w',
            'image_webp_srcset' => '/assets/img/photo-slider-5-d-336.webp 336w, /assets/img/photo-slider-5-d-672.webp 672w, /assets/img/photo-slider-5-d-1344.webp 1344w',
            'image_jpg_srcset' => '/assets/img/photo-slider-5-d-336.jpg 336w, /assets/img/photo-slider-5-d-672.jpg 672w, /assets/img/photo-slider-5-d-1344.jpg 1344w',
            'image_m_avif_srcset' => '',
            'image_m_webp_srcset' => '',
            'image_m_jpg_srcset' => '',
        ],
        [
            'image_src' => '/assets/img/photo-slider-6-d-672.jpg',
            'image_alt' => 'Монтаж распорки ГЕОМАКС экскаватором на краю котлована',
            'image_avif_srcset' => '/assets/img/photo-slider-6-d-336.avif 336w, /assets/img/photo-slider-6-d-672.avif 672w, /assets/img/photo-slider-6-d-1344.avif 1344w',
            'image_webp_srcset' => '/assets/img/photo-slider-6-d-336.webp 336w, /assets/img/photo-slider-6-d-672.webp 672w, /assets/img/photo-slider-6-d-1344.webp 1344w',
            'image_jpg_srcset' => '/assets/img/photo-slider-6-d-336.jpg 336w, /assets/img/photo-slider-6-d-672.jpg 672w, /assets/img/photo-slider-6-d-1344.jpg 1344w',
            'image_m_avif_srcset' => '',
            'image_m_webp_srcset' => '',
            'image_m_jpg_srcset' => '',
        ],
        [
            'image_src' => '/assets/img/photo-slider-7-d-672.jpg',
            'image_alt' => 'Несколько параллельных распорок ГЕОМАКС в котловане жилого комплекса',
            'image_avif_srcset' => '/assets/img/photo-slider-7-d-336.avif 336w, /assets/img/photo-slider-7-d-672.avif 672w, /assets/img/photo-slider-7-d-1344.avif 1344w',
            'image_webp_srcset' => '/assets/img/photo-slider-7-d-336.webp 336w, /assets/img/photo-slider-7-d-672.webp 672w, /assets/img/photo-slider-7-d-1344.webp 1344w',
            'image_jpg_srcset' => '/assets/img/photo-slider-7-d-336.jpg 336w, /assets/img/photo-slider-7-d-672.jpg 672w, /assets/img/photo-slider-7-d-1344.jpg 1344w',
            'image_m_avif_srcset' => '',
            'image_m_webp_srcset' => '',
            'image_m_jpg_srcset' => '',
        ],
        [
            'image_src' => '/assets/img/photo-slider-8-d-672.jpg',
            'image_alt' => 'Распорки ГЕОМАКС над котлованом с арматурным каркасом плиты',
            'image_avif_srcset' => '/assets/img/photo-slider-8-d-336.avif 336w, /assets/img/photo-slider-8-d-672.avif 672w, /assets/img/photo-slider-8-d-1344.avif 1344w',
            'image_webp_srcset' => '/assets/img/photo-slider-8-d-336.webp 336w, /assets/img/photo-slider-8-d-672.webp 672w, /assets/img/photo-slider-8-d-1344.webp 1344w',
            'image_jpg_srcset' => '/assets/img/photo-slider-8-d-336.jpg 336w, /assets/img/photo-slider-8-d-672.jpg 672w, /assets/img/photo-slider-8-d-1344.jpg 1344w',
            'image_m_avif_srcset' => '',
            'image_m_webp_srcset' => '',
            'image_m_jpg_srcset' => '',
        ],
        [
            'image_src' => '/assets/img/photo-slider-9-d-672.jpg',
            'image_alt' => 'Крепление стен котлована распорной системой ГЕОМАКС',
            'image_avif_srcset' => '/assets/img/photo-slider-9-d-336.avif 336w, /assets/img/photo-slider-9-d-672.avif 672w, /assets/img/photo-slider-9-d-1344.avif 1344w',
            'image_webp_srcset' => '/assets/img/photo-slider-9-d-336.webp 336w, /assets/img/photo-slider-9-d-672.webp 672w, /assets/img/photo-slider-9-d-1344.webp 1344w',
            'image_jpg_srcset' => '/assets/img/photo-slider-9-d-336.jpg 336w, /assets/img/photo-slider-9-d-672.jpg 672w, /assets/img/photo-slider-9-d-1344.jpg 1344w',
            'image_m_avif_srcset' => '',
            'image_m_webp_srcset' => '',
            'image_m_jpg_srcset' => '',
        ],
        [
            'image_src' => '/assets/img/photo-slider-10-d-672.jpg',
            'image_alt' => 'Распорка ГЕОМАКС по диагонали котлована, рабочие на фундаментной плите',
            'image_avif_srcset' => '/assets/img/photo-slider-10-d-336.avif 336w, /assets/img/photo-slider-10-d-672.avif 672w, /assets/img/photo-slider-10-d-1344.avif 1344w',
            'image_webp_srcset' => '/assets/img/photo-slider-10-d-336.webp 336w, /assets/img/photo-slider-10-d-672.webp 672w, /assets/img/photo-slider-10-d-1344.webp 1344w',
            'image_jpg_srcset' => '/assets/img/photo-slider-10-d-336.jpg 336w, /assets/img/photo-slider-10-d-672.jpg 672w, /assets/img/photo-slider-10-d-1344.jpg 1344w',
            'image_m_avif_srcset' => '',
            'image_m_webp_srcset' => '',
            'image_m_jpg_srcset' => '',
        ],
    ],
];
