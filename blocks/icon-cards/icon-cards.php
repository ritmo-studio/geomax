<?php
/**
 * icon-cards v1.3 · Figma 2124:407 · атомы icon, icon-row.
 *
 * Заголовок и ряд плиток с пиктограммой — для коротких выгод или перечня
 * услуг, которым не нужен текст. Количество плиток не зашито: ряд
 * переносится сам, следующая плитка уходит на новую строку.
 *
 * Card=Off и Card=On — два самостоятельных оформления одного блока, а не
 * состояния: в данных присутствует РОВНО ОДИН из ключей card / card_off.
 * Здесь это уже обычное php-условие, но ключи оставлены как в библиотеке,
 * чтобы контент ездил между площадками без переписывания.
 *
 * Заголовок — всегда h2 (или параметр), даже когда выглядит абзацем:
 * секция без заголовка проваливается в выдаче.
 *
 * Блок на странице дважды (преимущества и услуги), поэтому id приходит
 * параметром $iconCardsId: уникальность — забота того, кто собирает
 * страницу, у блока своего id нет.
 *
 * Данные — $iconCards (content/icon-cards-off.php, content/icon-cards-on.php).
 */
$d  = $iconCards ?? [];
$te = static fn($v) => htmlspecialchars((string)$v, ENT_QUOTES, 'UTF-8');
if (!$d) { return; }
$hTag = $iconCardsHeadingTag ?? $d['heading_tag'] ?? 'h2';
$id   = $iconCardsId ?? '';
$card = !empty($d['card']);
?>
<section<?= $id ? ' id="' . $te($id) . '"' : '' ?> class="sds sds-icon-cards">
<?php if (!$card): ?>
	<div class="sds-icon-cards__head rs-anim">
		<<?= $hTag ?> class="sds-icon-cards__title"><?= $d['title'] ?? '' ?></<?= $hTag ?>>
		<?php if (!empty($d['lead'])): ?><p class="sds-icon-cards__lead"><?= $d['lead'] ?></p><?php endif; ?>
	</div>
	<ul class="sds-icon-cards__list"><?php foreach ($d['tiles'] ?? [] as $t): ?><li class="sds-icon-cards__tile rs-anim"><span class="sds-icon sds-icon-cards__icon" aria-hidden="true"></span><p class="sds-icon-cards__text"><?= $te($t['text']) ?></p></li><?php endforeach; ?></ul>
<?php else: ?>
	<div class="sds-icon-cards__card rs-anim">
		<div class="sds-icon-cards__head">
			<<?= $hTag ?> class="sds-icon-cards__title"><?= $d['title'] ?? '' ?></<?= $hTag ?>>
			<?php if (!empty($d['lead'])): ?><p class="sds-icon-cards__lead"><?= $d['lead'] ?></p><?php endif; ?>
		</div>
		<ul class="sds-icon-cards__list sds-icon-cards__list--card"><?php foreach ($d['tiles'] ?? [] as $t): ?><li class="sds-icon-cards__tile sds-icon-cards__tile--card rs-anim"><span class="sds-icon-cards__icon-box"><span class="sds-icon sds-icon-cards__icon" aria-hidden="true"></span></span><p class="sds-icon-cards__text"><?= $te($t['text']) ?></p></li><?php endforeach; ?></ul>
		<?php if (!empty($d['features'])): ?>
		<div class="sds-icon-cards__divider" aria-hidden="true"></div>
		<ul class="sds-icon-rows"><?php foreach ($d['features'] as $f): ?><li class="sds-icon-row rs-anim"><span class="sds-icon sds-icon-row__icon" aria-hidden="true"></span><p class="sds-icon-row__text"><?= $te($f['text']) ?></p></li><?php endforeach; ?></ul>
		<?php endif; ?>
	</div>
<?php endif; ?>
</section>
