<?php
/**
 * reviews-slider v1.2 · Figma 2150:547 · лента отзывов · атомы arrow, pager,
 * slider, review-card, lightbox.
 *
 * В одной дорожке вперемешку текстовые отзывы и сканы благодарностей —
 * порядок задаёт контент (ключи is_text / is_scan у карточки), а не вёрстка.
 *
 * Диалог lightbox один на блок: повторится блок — повторится и диалог,
 * коллизий нет, потому что id в атомах не используется.
 *
 * Звёзды — атом rating: заполнение считается из --sds-rating, без JS.
 *
 * Данные — $reviewsSlider (content/reviews-slider.php).
 */
$d  = $reviewsSlider ?? [];
$te = static fn($v) => htmlspecialchars((string)$v, ENT_QUOTES, 'UTF-8');
if (empty($d['cards'])) { return; }
$hTag = $reviewsSliderHeadingTag ?? $d['heading_tag'] ?? 'h2';
$star = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
?>
<section class="sds sds-reviews-slider sds-slider">
	<div class="sds-reviews-slider__head">
		<<?= $hTag ?> class="sds-reviews-slider__title rs-anim"><?= $d['title'] ?? '' ?></<?= $hTag ?>>
		<div class="sds-arrows">
			<button type="button" class="sds-arrow" data-sds-prev aria-label="Предыдущая карточка"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 6 L9 12 L15 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
			<button type="button" class="sds-arrow" data-sds-next aria-label="Следующая карточка"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 6 L15 12 L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
		</div>
	</div>
	<ul class="sds-reviews-slider__track sds-slider__track" role="group" tabindex="0" aria-label="<?= $te($d['track_label'] ?? '') ?>"><?php foreach ($d['cards'] as $c): ?>
<?php if (!empty($c['is_scan'])): ?>
		<li class="sds-review-card sds-slider__card rs-anim sds-review-card--scan">
			<a class="sds-review-card__scan" href="<?= $te($c['scan_full_src'] ?? $c['scan_src']) ?>" data-lightbox data-name="<?= $te($c['name']) ?>" data-date="<?= $te($c['date'] ?? '') ?>" data-alt="<?= $te($c['scan_alt'] ?? '') ?>" aria-label="Открыть скан отзыва — <?= $te($c['name']) ?>">
				<img class="sds-review-card__scan-img" src="<?= $te($c['scan_src']) ?>" alt="<?= $te($c['scan_alt'] ?? '') ?>" width="700" height="800" loading="lazy" decoding="async">
				<span class="sds-review-card__expand" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M9 3H3v6M15 3h6v6M9 21H3v-6M15 21h6v-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
			</a>
			<div class="sds-review-card__column">
				<div class="sds-review-card__who">
					<p class="sds-review-card__name"><?= $te($c['name']) ?></p>
					<p class="sds-review-card__date"><?= $te($c['date'] ?? '') ?></p>
				</div>
				<p class="sds-review-card__excerpt"><?= $te($c['excerpt'] ?? '') ?></p>
			</div>
		</li>
<?php else: ?>
		<li class="sds-review-card sds-slider__card rs-anim">
			<div class="sds-review-card__head">
				<div class="sds-review-card__who">
					<p class="sds-review-card__name"><?= $te($c['name']) ?></p>
					<p class="sds-review-card__date"><?= $te($c['date'] ?? '') ?></p>
				</div>
				<span class="sds-review-card__stars sds-stars" style="--sds-rating:<?= $te($c['stars'] ?? '0') ?>" aria-hidden="true"><?php for ($s = 0; $s < 5; $s++): ?><span class="sds-star"><?= $star ?><span class="sds-star__fill"><?= $star ?></span></span><?php endfor; ?></span>
			</div>
			<div class="sds-review-card__body"><?php foreach ($c['paragraphs'] ?? [] as $p): ?><p class="sds-review-card__paragraph"><?= $te($p) ?></p><?php endforeach; ?></div>
		</li>
<?php endif; ?>
<?php endforeach; ?></ul>
	<?php if (($d['pager'] ?? true) !== false): ?>
	<div class="sds-pager"><?php foreach ($d['cards'] as $i => $c): ?><button type="button" class="sds-pager__dot" aria-label="Перейти к карточке <?= $i + 1 ?>"></button><?php endforeach; ?></div>
	<?php endif; ?>
	<dialog class="sds sds-lightbox">
		<button type="button" class="sds-lightbox__close" aria-label="Закрыть">
			<span class="sds-lightbox__close-icon" aria-hidden="true"></span>
		</button>
		<img class="sds-lightbox__image" src="" alt="">
		<div class="sds-lightbox__caption">
			<p class="sds-lightbox__name"></p>
			<p class="sds-lightbox__date"></p>
		</div>
	</dialog>
</section>
