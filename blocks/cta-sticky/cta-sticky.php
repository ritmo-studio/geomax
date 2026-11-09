<?php
/**
 * cta-sticky v1.1 · прилипшая кнопка внизу экрана, только на мобильном.
 *
 * Один на страницу и последним в разметке: так фокус с клавиатуры доходит до
 * неё в конце, а не перепрыгивает через контент. Без JS не показывается вовсе —
 * показ включает cta-sticky.js, когда на экране нет настоящей кнопки.
 *
 * Данные — $ctaSticky (content/cta-sticky.php): cta_label, cta_href.
 */
$d  = $ctaSticky ?? [];
$te = static fn($v) => htmlspecialchars((string)$v, ENT_QUOTES, 'UTF-8');
if (empty($d['cta_label'])) { return; }
?>
<div class="sds sds-ctabar">
	<a class="sds-btn" href="<?= $te($d['cta_href'] ?? '#') ?>"><span class="sds-btn__label"><?= $te($d['cta_label']) ?></span></a>
</div>
