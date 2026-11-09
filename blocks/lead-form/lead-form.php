<?php
/**
 * lead-form v1.2 · Figma 2156:612 · форма заявки на тёмной карточке · атомы
 * field, checkbox.
 *
 * Обработчика на движке пока нет (engine.json, раздел open), поэтому
 * form_action остаётся заглушкой. Когда он появится, здесь добавятся
 * CSRF-токен в скрытом поле и адрес обработчика из контента — разметка
 * полей при этом не меняется.
 *
 * Кнопка отправки — свой button type="submit" с классами атома button,
 * а не сам атом: атом это ссылка (a href), внутри формы она не отправляет
 * её ни мышью, ни Enter.
 *
 * Текст согласия — подпись чекбокса целиком (label), ссылка на политику
 * лежит внутри; клик по ней не переключает галочку, это гасит lead-form.js.
 *
 * Чертёж справа декоративный и виден только на десктопе — на мобильном
 * съел бы экран целиком.
 *
 * id приходит параметром $leadFormId: у блока своего id нет.
 *
 * Данные — $leadForm (content/lead-form.php).
 */
$d  = $leadForm ?? [];
$te = static fn($v) => htmlspecialchars((string)$v, ENT_QUOTES, 'UTF-8');
if (!$d) { return; }
$hTag = $leadFormHeadingTag ?? $d['heading_tag'] ?? 'h2';
$id   = $leadFormId ?? '';
?>
<section<?= $id ? ' id="' . $te($id) . '"' : '' ?> class="sds sds-lead-form">
	<div class="sds-lead-form__card">
		<div class="sds-lead-form__col">
			<<?= $hTag ?> class="sds-lead-form__title rs-anim"><?= $d['title'] ?? '' ?></<?= $hTag ?>>
			<p class="sds-lead-form__lead rs-anim"><?= $d['lead'] ?? '' ?></p>
			<form class="sds-lead-form__form rs-anim" action="<?= $te($d['form_action'] ?? '#') ?>" method="post">
				<div class="sds-lead-form__grid"><?php foreach ($d['fields'] ?? [] as $f): ?><div class="sds-field"><label class="sds-field__control"><input class="sds-field__input" type="<?= $te($f['input_type'] ?? 'text') ?>" name="<?= $te($f['name']) ?>"<?= !empty($f['autocomplete']) ? ' autocomplete="' . $te($f['autocomplete']) . '"' : '' ?><?= !empty($f['required']) ? ' required' : '' ?> placeholder=" "><span class="sds-field__label"><?= $te($f['label']) ?></span></label></div><?php endforeach; ?></div>
				<div class="sds-lead-form__message"><?php foreach ($d['message_field'] ?? [] as $f): ?><div class="sds-field sds-field--area"><label class="sds-field__control"><textarea class="sds-field__input" name="<?= $te($f['name']) ?>" placeholder=" "></textarea><span class="sds-field__label"><?= $te($f['label']) ?></span></label></div><?php endforeach; ?></div>
				<label class="sds-lead-form__consent"><input type="checkbox" class="sds-checkbox" name="<?= $te($d['name'] ?? 'your-consent') ?>" required><span class="sds-lead-form__consent-text"><?= $d['consent_html'] ?? '' ?></span></label>
				<div class="sds-lead-form__actions"><button type="submit" class="sds-btn sds-btn--icon"><span class="sds-btn__icon" aria-hidden="true"></span><span class="sds-btn__label"><?= $te($d['cta_label'] ?? '') ?></span></button></div>
			</form>
		</div>
		<div class="sds-lead-form__art" aria-hidden="true"></div>
	</div>
</section>
