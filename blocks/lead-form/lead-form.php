<?php
/**
 * lead-form v1.2 · Figma 2156:612 · форма заявки на тёмной карточке · атомы
 * field, checkbox.
 *
 * Отклонение от библиотеки: форма подключена к обработчику движка
 * (engine/form). Добавились скрытый токен, поле-ловушка, вывод ошибок
 * по полям и панель ответа вместо формы после успеха. Разметка самих
 * полей не изменилась.
 *
 * Токен и результат приходят параметрами ($leadFormToken, $leadFormResult):
 * блок остаётся отрисовщиком и про сессию ничего не знает.
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
$tok  = $leadFormToken ?? '';
$res  = $leadFormResult ?? null;          // ['ok'=>bool,'errors'=>[поле=>текст],'message'=>string]
$old  = $leadFormOld ?? [];               // что посетитель уже ввёл, чтобы не набирать заново
$err  = $res && empty($res['ok']) ? ($res['errors'] ?? []) : [];
$hpot = $leadFormHoneypot ?? 'rs_company_url';
?>
<section<?= $id ? ' id="' . $te($id) . '"' : '' ?> class="sds sds-lead-form">
	<div class="sds-lead-form__card">
		<div class="sds-lead-form__col">
			<<?= $hTag ?> class="sds-lead-form__title rs-anim"><?= $d['title'] ?? '' ?></<?= $hTag ?>>
			<p class="sds-lead-form__lead rs-anim"><?= $d['lead'] ?? '' ?></p>
<?php if ($res && !empty($res['ok'])): ?>
			<p class="sds-lead-form__status sds-lead-form__status--ok rs-anim" role="status"><?= $te($res['message']) ?></p>
<?php else: ?>
			<form class="sds-lead-form__form rs-anim" action="<?= $te($d['form_action'] ?? '#') ?>" method="post">
				<input type="hidden" name="rs_token" value="<?= $te($tok) ?>">
				<div class="sds-lead-form__trap" aria-hidden="true"><label>Не заполняйте<input type="text" name="<?= $te($hpot) ?>" tabindex="-1" autocomplete="off"></label></div>
<?php if ($res && empty($res['ok'])): ?>
				<p class="sds-lead-form__status sds-lead-form__status--fail" role="alert"><?= $te($res['message']) ?></p>
<?php endif; ?>
				<div class="sds-lead-form__grid"><?php foreach ($d['fields'] ?? [] as $f): $n = $f['name']; $e = $err[$n] ?? ''; ?><div class="sds-field"><label class="sds-field__control"><input class="sds-field__input" type="<?= $te($f['input_type'] ?? 'text') ?>" name="<?= $te($n) ?>" value="<?= $te($old[$n] ?? '') ?>"<?= !empty($f['autocomplete']) ? ' autocomplete="' . $te($f['autocomplete']) . '"' : '' ?><?= !empty($f['max']) ? ' maxlength="' . (int)$f['max'] . '"' : '' ?><?= !empty($f['required']) ? ' required' : '' ?><?= $e ? ' aria-invalid="true"' : '' ?> placeholder=" "><span class="sds-field__label"><?= $te($f['label']) ?></span></label><?php if ($e): ?><p class="sds-field__error"><?= $te($e) ?></p><?php endif; ?></div><?php endforeach; ?></div>
				<div class="sds-lead-form__message"><?php foreach ($d['message_field'] ?? [] as $f): $n = $f['name']; $e = $err[$n] ?? ''; ?><div class="sds-field sds-field--area"><label class="sds-field__control"><textarea class="sds-field__input" name="<?= $te($n) ?>"<?= !empty($f['max']) ? ' maxlength="' . (int)$f['max'] . '"' : '' ?><?= $e ? ' aria-invalid="true"' : '' ?> placeholder=" "><?= $te($old[$n] ?? '') ?></textarea><span class="sds-field__label"><?= $te($f['label']) ?></span></label><?php if ($e): ?><p class="sds-field__error"><?= $te($e) ?></p><?php endif; ?></div><?php endforeach; ?></div>
				<label class="sds-lead-form__consent"><input type="checkbox" class="sds-checkbox<?= !empty($err['_consent']) ? ' sds-checkbox--error' : '' ?>" name="<?= $te($d['name'] ?? 'your-consent') ?>" required><span class="sds-lead-form__consent-text"><?= $d['consent_html'] ?? '' ?></span></label>
				<div class="sds-lead-form__actions"><button type="submit" class="sds-btn sds-btn--icon"><span class="sds-btn__icon" aria-hidden="true"></span><span class="sds-btn__label"><?= $te($d['cta_label'] ?? '') ?></span></button></div>
			</form>
<?php endif; ?>
		</div>
		<div class="sds-lead-form__art" aria-hidden="true"></div>
	</div>
</section>
