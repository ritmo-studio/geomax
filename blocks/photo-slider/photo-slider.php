<?php
/**
 * photo-slider v1.1 · Figma 2132:378 · слайдер фотографий · атомы arrow,
 * pager, slider (общий механизм дорожки — atoms/slider, не копия).
 *
 * Стрелки скрыты без JS, на мобильном их нет вовсе — листают свайпом.
 * Пагинация необязательна и по умолчанию включена (ключ pager).
 *
 * id приходит параметром $photoSliderId: у блока своего id нет.
 *
 * Данные — $photoSlider (content/photo-slider.php).
 */
$d  = $photoSlider ?? [];
$te = static fn($v) => htmlspecialchars((string)$v, ENT_QUOTES, 'UTF-8');
if (empty($d['cards'])) { return; }
$hTag = $photoSliderHeadingTag ?? $d['heading_tag'] ?? 'h2';
$id   = $photoSliderId ?? '';
?>
<section<?= $id ? ' id="' . $te($id) . '"' : '' ?> class="sds sds-photo-slider sds-slider">
	<div class="sds-photo-slider__head rs-anim">
		<<?= $hTag ?> class="sds-photo-slider__title"><?= $d['title'] ?? '' ?></<?= $hTag ?>>
		<p class="sds-photo-slider__lead"><?= $d['lead'] ?? '' ?></p>
	</div>
	<div class="sds-photo-slider__viewport">
		<ul class="sds-photo-slider__track sds-slider__track" role="group" tabindex="0" aria-label="<?= $te($d['track_label'] ?? '') ?>"><?php foreach ($d['cards'] as $c): ?><li class="sds-photo-slider__card sds-slider__card sds-media rs-anim">
			<picture>
				<?php foreach (['avif', 'webp', 'jpg'] as $fmt): ?>
				<?php if (!empty($c['image_m_' . $fmt . '_srcset'])): ?><source media="(max-width:767.98px)" type="image/<?= $fmt === 'jpg' ? 'jpeg' : $fmt ?>" srcset="<?= $te($c['image_m_' . $fmt . '_srcset']) ?>"><?php endif; ?>
				<?php if (!empty($c['image_' . $fmt . '_srcset'])): ?><source type="image/<?= $fmt === 'jpg' ? 'jpeg' : $fmt ?>" srcset="<?= $te($c['image_' . $fmt . '_srcset']) ?>"><?php endif; ?>
				<?php endforeach; ?>
				<img class="sds-media__img" src="<?= $te($c['image_src']) ?>" sizes="672px" alt="<?= $te($c['image_alt'] ?? '') ?>" width="672" height="480" loading="lazy" decoding="async">
			</picture>
		</li><?php endforeach; ?></ul>
		<div class="sds-arrows">
			<button type="button" class="sds-arrow" data-sds-prev aria-label="Предыдущая карточка"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 6 L9 12 L15 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
			<button type="button" class="sds-arrow" data-sds-next aria-label="Следующая карточка"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6 L15 12 L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
		</div>
	</div>
	<?php if (($d['pager'] ?? true) !== false): ?>
	<div class="sds-pager"><?php foreach ($d['cards'] as $i => $c): ?><button type="button" class="sds-pager__dot" aria-label="Перейти к карточке <?= $i + 1 ?>"></button><?php endforeach; ?></div>
	<?php endif; ?>
</section>
