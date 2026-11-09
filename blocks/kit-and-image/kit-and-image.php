<?php
/**
 * kit-and-image v1.1 · Figma 2138:446 · состав предложения и фотография ·
 * атомы icon-row, button.
 *
 * Плиток и строк состава сколько угодно — повтор. Фото справа вписывается
 * целиком, не кадрируется (object-fit:contain), поэтому мастер нужен ровно
 * той пропорции, что слот.
 *
 * Рисунок на плитке — не контент, а оформление: он приходит из CSS
 * (blocks/zz-overrides, переменная --sds-kit-art по номеру плитки).
 * Поэтому в данных у плитки только подпись.
 *
 * id приходит параметром $kitAndImageId: у блока своего id нет.
 *
 * Данные — $kitAndImage (content/kit-and-image.php).
 */
$d  = $kitAndImage ?? [];
$te = static fn($v) => htmlspecialchars((string)$v, ENT_QUOTES, 'UTF-8');
if (!$d) { return; }
$hTag = $kitAndImageHeadingTag ?? $d['heading_tag'] ?? 'h2';
$sizes = '(min-width:768px) 672px, calc(100vw - 32px)';   // слот: 672 на десктопе, вся ширина минус отступы на мобильной
$id   = $kitAndImageId ?? '';
?>
<section<?= $id ? ' id="' . $te($id) . '"' : '' ?> class="sds sds-kit-and-image">
	<div class="sds-kit-and-image__card rs-anim">
		<<?= $hTag ?> class="sds-kit-and-image__title"><?= $d['title'] ?? '' ?></<?= $hTag ?>>
		<ul class="sds-kit-and-image__tiles"><?php foreach ($d['tiles'] ?? [] as $t): ?><li class="sds-kit-and-image__tile">
			<div class="sds-kit-and-image__tile-art" aria-hidden="true"></div>
			<p class="sds-kit-and-image__tile-label"><?= $te($t['label']) ?></p>
		</li><?php endforeach; ?></ul>
		<div class="sds-kit-and-image__divider"></div>
		<ul class="sds-icon-rows"><?php foreach ($d['features'] ?? [] as $f): ?><li class="sds-icon-row rs-anim"><span class="sds-icon sds-icon-row__icon" aria-hidden="true"></span><p class="sds-icon-row__text"><?= $te($f['text']) ?></p></li><?php endforeach; ?></ul>
		<div class="sds-kit-and-image__divider"></div>
		<div class="sds-kit-and-image__actions"><a class="sds-btn sds-btn--icon" href="<?= $te($d['cta_href'] ?? '#') ?>"><span class="sds-btn__icon" aria-hidden="true"></span><span class="sds-btn__label"><?= $te($d['cta_label'] ?? '') ?></span></a></div>
	</div>
	<div class="sds-kit-and-image__media sds-media sds-media--contain rs-anim">
		<picture>
			<?php foreach (['avif', 'webp', 'jpg'] as $fmt): ?>
			<?php if (!empty($d['image_m_' . $fmt . '_srcset'])): ?><source media="(max-width:767.98px)" type="image/<?= $fmt === 'jpg' ? 'jpeg' : $fmt ?>" srcset="<?= $te($d['image_m_' . $fmt . '_srcset']) ?>" sizes="<?= $te($sizes) ?>"><?php endif; ?>
			<?php if (!empty($d['image_' . $fmt . '_srcset'])): ?><source type="image/<?= $fmt === 'jpg' ? 'jpeg' : $fmt ?>" srcset="<?= $te($d['image_' . $fmt . '_srcset']) ?>" sizes="<?= $te($sizes) ?>"><?php endif; ?>
			<?php endforeach; ?>
			<img class="sds-media__img" src="<?= $te($d['image_src'] ?? '') ?>" sizes="<?= $te($sizes) ?>" alt="<?= $te($d['image_alt'] ?? '') ?>" width="672" height="600" loading="lazy" decoding="async">
		</picture>
	</div>
</section>
