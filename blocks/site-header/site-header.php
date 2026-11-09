<?php
/**
 * site-header v1.1 · Figma 2111:337 · шапка сайта, единственная на странице.
 *
 * Секция прозрачная и лежит поверх первого блока (position:absolute) — видна
 * только белая пилюля. Первый блок страницы сам оставляет место под неё сверху.
 *
 * Раскрытие — нативные <details>/<summary>: мобильная панель и подменю внутри
 * неё. Своего скрипта для этого нет; site-header.js забирает фокус в открытую
 * панель и гасит прокрутку под ней.
 *
 * Данные — $siteHeader (content/site-header.php): logo_*, phone, cta_*, menu.
 * Пункт меню — plain (ссылка) или submenu (список children), ровно один из двух.
 */
$h  = $siteHeader ?? [];
$te = static fn($v) => htmlspecialchars((string)$v, ENT_QUOTES, 'UTF-8');
if (!$h) { return; }
?>
<header class="sds sds-header">
	<div class="sds-header__bar">
		<a class="sds-header__logo" href="<?= $te($h['logo_href'] ?? '/') ?>"><img class="sds-header__logo-img" src="<?= $te($h['logo_src']) ?>" alt="<?= $te($h['logo_label'] ?? '') ?>" width="175" height="40" fetchpriority="high" decoding="async"></a>

		<nav class="sds-header__nav" aria-label="Основное меню">
			<ul class="sds-header__menu"><?php foreach ($h['menu'] ?? [] as $i): ?><li class="sds-header__item"><a class="sds-header__link" href="<?= $te($i['href']) ?>"><?= $te($i['label']) ?></a></li><?php endforeach; ?></ul>
		</nav>

		<a class="sds-header__phone sds-header__phone--bar" href="tel:<?= $te($h['phone_href'] ?? '') ?>"><?= $te($h['phone'] ?? '') ?></a>

		<details class="sds-header__toggle">
			<summary class="sds-header__burger" aria-label="Меню"></summary>
			<div class="sds-header__panel">
				<ul class="sds-header__mobile-menu"><?php foreach ($h['menu'] ?? [] as $i): ?><li class="sds-header__mrow-wrap"><a class="sds-header__mrow" href="<?= $te($i['href']) ?>"><?= $te($i['label']) ?></a></li><?php endforeach; ?></ul>
				<div class="sds-header__foot">
					<a class="sds-header__phone sds-header__phone--panel" href="tel:<?= $te($h['phone_href'] ?? '') ?>"><?= $te($h['phone'] ?? '') ?></a>
					<a class="sds-btn sds-btn--icon" href="<?= $te($h['cta_href'] ?? '#') ?>"><span class="sds-btn__icon" aria-hidden="true"></span><span class="sds-btn__label"><?= $te($h['cta_label'] ?? '') ?></span></a>
				</div>
			</div>
		</details>
	</div>
</header>
