<?php
/**
 * site-footer v1.1 · Figma 2158:604 · подвал сайта, единственный на странице.
 *
 * Колонок и групп в них сколько угодно — повтор. Подписи групп это h3, а над
 * ними скрытый h2: иначе h3 висят без своего уровня, а видимого заголовка у
 * подвала в макете нет. Колонки — не nav: внутри контакты и адрес, а не
 * навигация по сайту. Адресная группа выводится тегом address (is_address).
 *
 * «Наверх» стоит в потоке перед правовой строкой (так нужно на мобильном),
 * на десктопе становится абсолютным — это CSS, а не два места в разметке.
 * Ссылка ведёт на "#" и прокручивает скриптом: id на странице нет и быть
 * не может, а href="#" сам по себе уже отправляет браузер к началу.
 *
 * Логотип и знак студии — фон и маска в CSS (blocks/zz-overrides), файлы
 * лежат в /assets/img: вектор это часть кода и коммитится.
 *
 * id приходит параметром $siteFooterId: у блока своего id нет.
 *
 * Данные — $siteFooter (content/site-footer.php).
 */
$d  = $siteFooter ?? [];
$te = static fn($v) => htmlspecialchars((string)$v, ENT_QUOTES, 'UTF-8');
if (!$d) { return; }
$id = $siteFooterId ?? '';
?>
<footer<?= $id ? ' id="' . $te($id) . '"' : '' ?> class="sds sds-footer">
	<div class="sds-footer__main">
		<div class="sds-footer__brand">
			<div class="sds-footer__logo" aria-hidden="true"></div>
			<p class="sds-footer__brand-link"><a href="<?= $te($d['brand_href'] ?? '/') ?>">Перейти на сайт компании →</a></p>
		</div>
		<div class="sds-footer__columns">
			<h2 class="sds-sr-only">Контакты</h2>
			<?php foreach ($d['columns'] ?? [] as $col): ?><div class="sds-footer__column"><?php foreach ($col['groups'] ?? [] as $g): ?><div class="sds-footer__group"><h3 class="sds-footer__group-label"><?= $te($g['label']) ?></h3><?php $tag = !empty($g['is_address']) ? 'address' : 'div'; ?><<?= $tag ?> class="sds-footer__group-content"><?php foreach ($g['lines'] ?? [] as $l): ?><p class="sds-footer__line"><?php if (!empty($l['is_link'])): ?><a href="<?= $te($l['href']) ?>"><?= $te($l['text']) ?></a><?php else: ?><?= $te($l['text']) ?><?php endif; ?></p><?php endforeach; ?></<?= $tag ?>></div><?php endforeach; ?></div><?php endforeach; ?>
		</div>
		<a class="sds-footer__top" href="#" data-sds-top>Наверх ↑</a>
	</div>
	<div class="sds-footer__legal">
		<p class="sds-footer__copyright"><?= $te($d['copyright'] ?? '') ?></p>
		<p class="sds-footer__privacy"><a href="<?= $te($d['privacy_href'] ?? '#') ?>">Политика обработки персональных данных</a></p>
		<div class="sds-footer__mark" aria-hidden="true"></div>
		<p class="sds-footer__made-by">Сделано в <a href="https://ritmo.studio/" target="_blank" rel="noopener">РИТМЕ</a></p>
	</div>
</footer>
