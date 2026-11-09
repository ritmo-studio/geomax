<?php
/**
 * hero-video v1.1 · Figma 2113:313 · первый экран с видео на фоне.
 *
 * Контент прижат к низу секции: сверху работает кадр, внизу читается текст.
 * Постер — это LCP, поэтому грузится обычным порядком; preload="none" остаётся
 * просьбой «не тянуть видео заранее» для браузеров, не разрешивших автоплей.
 *
 * prefers-reduced-motion: hero-video.js снимает источники и оставляет постер —
 * иначе движение на первом экране нельзя остановить (WCAG 2.2.2).
 *
 * Отступ сверху освобождает место шапке: site-header лежит поверх позицией
 * absolute. Уровень заголовка — параметр: h1 только если блок первый.
 *
 * Отклонение от библиотеки: постер отдаёт <picture> перед <video>, а не атрибут
 * poster. У poster нет srcset, а на мобильной кадр вертикальный — одним файлом
 * оба брейкпоинта не закрыть. Видео лежит поверх постера и перекрывает его
 * первым же кадром; прозрачный фон video — в blocks/zz-overrides.
 * Долг: вернуть приём в библиотеку, там та же дырка.
 *
 * Данные — $heroVideo (content/hero-video.php).
 */
$d  = $heroVideo ?? [];
$te = static fn($v) => htmlspecialchars((string)$v, ENT_QUOTES, 'UTF-8');
if (!$d) { return; }
$hTag = $heroVideoHeadingTag ?? $d['heading_tag'] ?? 'h2';
?>
<section class="sds sds-hero-video">
	<picture>
<?php foreach (['avif', 'webp', 'jpg'] as $fmt): $type = $fmt === 'jpg' ? 'jpeg' : $fmt; ?>
		<?php if (!empty($d['poster_m_' . $fmt . '_srcset'])): ?><source media="(max-width:767.98px)" type="image/<?= $type ?>" srcset="<?= $te($d['poster_m_' . $fmt . '_srcset']) ?>" sizes="100vw"><?php endif; ?>
		<?php if (!empty($d['poster_' . $fmt . '_srcset'])): ?><source type="image/<?= $type ?>" srcset="<?= $te($d['poster_' . $fmt . '_srcset']) ?>" sizes="100vw"><?php endif; ?>
<?php endforeach; ?>
		<img class="sds-hero-video__media" src="<?= $te($d['poster_src'] ?? '') ?>" alt="<?= $te($d['poster_alt'] ?? '') ?>" fetchpriority="high" decoding="async">
	</picture>
	<video class="sds-hero-video__media" autoplay muted loop playsinline preload="none">
		<?php if (!empty($d['video_m_src'])): ?><source media="(max-width:767.98px)" src="<?= $te($d['video_m_src']) ?>"><?php endif; ?>
		<?php if (!empty($d['video_src'])): ?><source src="<?= $te($d['video_src']) ?>"><?php endif; ?>
	</video>
	<div class="sds-hero-video__scrim" aria-hidden="true"></div>
	<div class="sds-hero-video__content rs-anim">
		<div class="sds-hero-video__heading">
			<p class="sds-hero-video__eyebrow rs-anim"><?= $te($d['eyebrow'] ?? '') ?></p>
			<<?= $hTag ?> class="sds-hero-video__title rs-anim"><?= $d['title'] ?? '' ?></<?= $hTag ?>>
		</div>
		<div class="sds-hero-video__aside">
			<p class="sds-hero-video__lead rs-anim"><?= $d['lead'] ?? '' ?></p>
			<div class="sds-hero-video__aside-cta rs-anim"><a class="sds-btn sds-btn--icon" href="<?= $te($d['cta_href'] ?? '#') ?>"><span class="sds-btn__icon" aria-hidden="true"></span><span class="sds-btn__label"><?= $te($d['cta_label'] ?? '') ?></span></a></div>
		</div>
	</div>
</section>
