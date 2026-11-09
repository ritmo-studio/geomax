<?php
/**
 * ГЕОМАКС · контент блока «hero-video».
 *
 * Постер и два видео. Кадр на мобильной вертикальный, поэтому постеров два
 * набора: горизонтальный h (1120/1440/1920, блок во всю ширину экрана) и
 * вертикальный m (400/800). Видео — H.264 без звуковой дорожки, 33,8 с:
 * 1920x1080 1,63 Мбит/с и 720x1280 1,17 Мбит/с.
 * Файлы лежат в /assets/img и /assets/video и на хостинг переносятся руками,
 * в репозиторий они не коммитятся — см. .gitignore.
 */
return [
    'heading_tag' => 'h1',
    'eyebrow' => 'Стратегия → технология → скорость',
    'title' => 'Распорная гидравлическая система <span class="sds-accent">«ГЕОМАКС»</span>',
    'lead' => '<strong>Сокращает срок</strong> работ нулевого цикла <strong>до 4–6 недель</strong>, <strong>оптимизирует финансовые затраты</strong> застройщика на обслуживание банковского кредита на этапе котлована',
    'cta_label' => 'Получить расчёт аренды',
    'cta_href' => '#lead-form',
    'cta_icon' => true,
    'poster_src' => '/assets/img/hero-poster-h-1440.jpg',
    'poster_alt' => 'Котлован с установленной распорной гидравлической системой ГЕОМАКС',
    'poster_avif_srcset' => '/assets/img/hero-poster-h-1120.avif 1120w, /assets/img/hero-poster-h-1440.avif 1440w, /assets/img/hero-poster-h-1920.avif 1920w',
    'poster_webp_srcset' => '/assets/img/hero-poster-h-1120.webp 1120w, /assets/img/hero-poster-h-1440.webp 1440w, /assets/img/hero-poster-h-1920.webp 1920w',
    'poster_jpg_srcset' => '/assets/img/hero-poster-h-1120.jpg 1120w, /assets/img/hero-poster-h-1440.jpg 1440w, /assets/img/hero-poster-h-1920.jpg 1920w',
    'poster_m_avif_srcset' => '/assets/img/hero-poster-m-400.avif 400w, /assets/img/hero-poster-m-800.avif 800w',
    'poster_m_webp_srcset' => '/assets/img/hero-poster-m-400.webp 400w, /assets/img/hero-poster-m-800.webp 800w',
    'poster_m_jpg_srcset' => '/assets/img/hero-poster-m-400.jpg 400w, /assets/img/hero-poster-m-800.jpg 800w',
    'video_src' => '/assets/video/hero-d-1920.mp4',
    'video_m_src' => '/assets/video/hero-m-720.mp4',
];
