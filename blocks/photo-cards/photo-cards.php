<?php
/**
 * photo-cards v1.0 · Figma 2129:410 · атом icon · ряд карточек, где кадр и
 * есть содержание.
 *
 * У карточки нет своего заголовка — только подпись-абзац с выделенными
 * словами (caption, html), поэтому выделение внутри неё не разбито на h3.
 * Количество карточек не зашито: ряд переносится сам.
 *
 * Кадр содержательный, поэтому alt обязателен. Мастера приходят два
 * (мобильный и десктопный), srcset заполняется на этапе нарезки; пока их
 * нет, в src стоит серая заглушка и вёрстка держит размер слота.
 *
 * Данные — $photoCards (content/photo-cards.php).
 */
$d  = $photoCards ?? [];
$te = static fn($v) => htmlspecialchars((string)$v, ENT_QUOTES, 'UTF-8');
if (empty($d['cards'])) { return; }
$hTag = $photoCardsHeadingTag ?? $d['heading_tag'] ?? 'h2';
$sizes = '(min-width:1440px) 328px, (min-width:768px) 25vw, calc(100vw - 32px)';
?>
<section class="sds sds-photo-cards">
	<div class="sds-photo-cards__head rs-anim">
		<<?= $hTag ?> class="sds-photo-cards__title"><?= $d['title'] ?? '' ?></<?= $hTag ?>>
		<?php if (!empty($d['lead'])): ?><p class="sds-photo-cards__lead"><?= $d['lead'] ?></p><?php endif; ?>
	</div>
	<ul class="sds-photo-cards__list"><?php foreach ($d['cards'] as $c): ?><li class="sds-photo-cards__card sds-media rs-anim">
		<picture>
			<?php foreach (['avif', 'webp', 'jpg'] as $fmt): ?>
			<?php if (!empty($c['image_m_' . $fmt . '_srcset'])): ?><source media="(max-width:767.98px)" type="image/<?= $fmt === 'jpg' ? 'jpeg' : $fmt ?>" srcset="<?= $te($c['image_m_' . $fmt . '_srcset']) ?>" sizes="<?= $te($sizes) ?>"><?php endif; ?>
			<?php if (!empty($c['image_' . $fmt . '_srcset'])): ?><source type="image/<?= $fmt === 'jpg' ? 'jpeg' : $fmt ?>" srcset="<?= $te($c['image_' . $fmt . '_srcset']) ?>" sizes="<?= $te($sizes) ?>"><?php endif; ?>
			<?php endforeach; ?>
			<img class="sds-media__img" src="<?= $te($c['image_src']) ?>" sizes="<?= $te($sizes) ?>" alt="<?= $te($c['image_alt'] ?? '') ?>" width="560" height="364" loading="lazy" decoding="async">
		</picture>
		<div class="sds-photo-cards__scrim" aria-hidden="true"></div>
		<div class="sds-photo-cards__icon-box"><span class="sds-icon sds-photo-cards__icon" aria-hidden="true"></span></div>
		<p class="sds-photo-cards__caption"><?= $c['caption'] ?? '' ?></p>
	</li><?php endforeach; ?></ul>
</section>
