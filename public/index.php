<?php
/**
 * ГЕОМАКС · главная. Порядок инклюдов и есть страница.
 *
 * Блоки приехали снимком из библиотеки seo-design-system (geomax v.0.34
 * SEO DS) и сохранили префикс sds-. Что приходит параметром, а не лежит
 * в блоке: уровень заголовка и id — блок не знает своей позиции, поэтому
 * ровно один h1 и уникальность анкеров назначает эта страница.
 *
 * Анкеры в меню шапки (#advantages, #objects, #rent, #services,
 * #contacts) — это те id, что выставлены здесь. Меняется один — менять
 * и второй, в content/site-header.php.
 */
$pageTitle       = 'Распорная гидравлическая система «ГЕОМАКС» — аренда в Санкт-Петербурге';
$metaDescription = 'Распорная система многократного применения с гидравлическими узлами: монтаж без сварки за 2 часа, до 300 тонн на элемент, сокращение сроков нулевого цикла до 4–6 недель. Аренда полного комплекта, проект, мониторинг, авторский надзор.';
$pageUrl         = 'https://geomax-spb.ru/';
$bodyClass       = 'page-home';

/* Шрифт приходит ссылкой на Google Fonts. Перед запуском его стоит
   положить на хостинг своим woff2 и добавить в $preloadFonts: шрифт
   первого экрана с чужого домена — лишний TLS-хендшейк до текста. */
$headExtra = '<link rel="preconnect" href="https://fonts.googleapis.com">' . "\n"
           . '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' . "\n"
           . '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap">';

$root   = dirname($_SERVER['DOCUMENT_ROOT']);
$engine = $root . '/engine';

/* Форма заявки. Сессию поднимаем здесь, до head.php: session_start()
   шлёт куку, а после первого вывода заголовки уже не отправить.
   Результат предыдущей отправки лежит в сессии и забирается один раз —
   это путь без JS (PRG), с JS ответ приходит JSON-ом на /form.php. */
require_once $engine . '/form/form.php';
$leadFormToken  = rs_form_token();
$leadFormResult = $_SESSION['rs_form_result'] ?? null;
$leadFormOld    = $_SESSION['rs_form_old'] ?? [];
unset($_SESSION['rs_form_result'], $_SESSION['rs_form_old']);

/* Organization — один на сайт, поэтому только здесь. */
$jsonLd = include $root . '/content/schema.php';

include $engine . '/blocks/main/head.php';
?>

<?php
$siteHeader = include $root . '/content/site-header.php';
include $root . '/blocks/site-header/site-header.php';
?>

<main id="main">

	<?php /* Первый экран. h1 достаётся ему: это единственный текст на
	         странице, который называет её предмет словами. */ ?>
	<?php
	$heroVideo = include $root . '/content/hero-video.php';
	$heroVideoHeadingTag = 'h1';
	include $root . '/blocks/hero-video/hero-video.php';
	?>

	<?php /* Преимущества. Вариант Card=Off: плитки без карточки. */ ?>
	<?php
	$iconCards   = include $root . '/content/icon-cards-off.php';
	$iconCardsId = 'advantages';
	include $root . '/blocks/icon-cards/icon-cards.php';
	?>

	<?php
	$compareTable = include $root . '/content/compare-table.php';
	include $root . '/blocks/compare-table/compare-table.php';
	?>

	<?php
	$photoCards = include $root . '/content/photo-cards.php';
	include $root . '/blocks/photo-cards/photo-cards.php';
	?>

	<?php
	$photoSlider   = include $root . '/content/photo-slider.php';
	$photoSliderId = 'objects';
	include $root . '/blocks/photo-slider/photo-slider.php';
	?>

	<?php
	$kitAndImage   = include $root . '/content/kit-and-image.php';
	$kitAndImageId = 'rent';
	include $root . '/blocks/kit-and-image/kit-and-image.php';
	?>

	<?php /* Дополнительные услуги. Тот же блок, вариант Card=On: данные
	         другие, разметка одна. Перезаписываем переменные блока — своего
	         состояния он не держит, поэтому повтор безопасен. */ ?>
	<?php
	$iconCards   = include $root . '/content/icon-cards-on.php';
	$iconCardsId = 'services';
	include $root . '/blocks/icon-cards/icon-cards.php';
	?>

	<?php
	$reviewsSlider = include $root . '/content/reviews-slider.php';
	include $root . '/blocks/reviews-slider/reviews-slider.php';
	?>

	<?php
	$leadForm   = include $root . '/content/lead-form.php';
	$leadFormId = 'lead-form';
	include $root . '/blocks/lead-form/lead-form.php';
	?>

</main>

<?php
$siteFooter   = include $root . '/content/site-footer.php';
$siteFooterId = 'contacts';
include $root . '/blocks/site-footer/site-footer.php';
?>

<?php /* Прилипшая кнопка — последней в разметке: фокус с клавиатуры
         доходит до неё в конце, а не перепрыгивает через контент. */ ?>
<?php
$ctaSticky = include $root . '/content/cta-sticky.php';
include $root . '/blocks/cta-sticky/cta-sticky.php';
?>

<?php include $engine . '/blocks/main/footer.php'; ?>
