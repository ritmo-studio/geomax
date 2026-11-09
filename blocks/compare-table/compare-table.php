<?php
/**
 * compare-table v1.1 · Figma 2127:426 · «мы против них» или характеристики.
 *
 * Колонок и строк сколько угодно — оба списка обычный повтор. Разметка одна
 * на обе раскладки: это настоящая <table> с th scope, меняются только стили.
 * На мобильном строка становится карточкой, а подпись колонки у каждой
 * ячейки приходит через data-label — она лежит в данных у каждой ячейки
 * (cells[].col), а не достаётся по индексу соседнего списка.
 *
 * Роли (table/rowgroup/row/columnheader/rowheader/cell) написаны явно, хотя
 * таблица настоящая: на мобильном раскладка переводит table/tr/td в
 * display:block, и это снимает табличные роли — скринридер перестаёт
 * связывать ячейку с заголовком колонки.
 *
 * Шапка на мобильном спрятана классом sds-sr-only-m (визуально, не
 * display:none), иначе подписи колонок потерялись бы и для читалки.
 *
 * Данные — $compareTable (content/compare-table.php).
 */
$d  = $compareTable ?? [];
$te = static fn($v) => htmlspecialchars((string)$v, ENT_QUOTES, 'UTF-8');
if (empty($d['rows'])) { return; }
$hTag = $compareTableHeadingTag ?? $d['heading_tag'] ?? 'h2';
?>
<section class="sds sds-compare-table">
	<div class="sds-compare-table__head rs-anim">
		<<?= $hTag ?> class="sds-compare-table__title"><?= $d['title'] ?? '' ?></<?= $hTag ?>>
	</div>
	<div class="sds-compare-table__wrap rs-anim">
		<table class="sds-compare-table__table" role="table">
			<thead class="sds-compare-table__thead sds-sr-only-m" role="rowgroup">
				<tr role="row">
					<th scope="col" role="columnheader"><?= $te($d['param_label'] ?? '') ?></th>
					<?php foreach ($d['columns'] ?? [] as $c): ?><th scope="col" role="columnheader"><?= $te($c['name']) ?></th><?php endforeach; ?>
				</tr>
			</thead>
			<tbody role="rowgroup">
				<?php foreach ($d['rows'] as $row): ?>
				<tr role="row">
					<th scope="row" role="rowheader"><?= $te($row['label']) ?></th>
					<?php foreach ($row['cells'] as $cell): ?><td role="cell" data-label="<?= $te($cell['col']) ?>"><?= $te($cell['value']) ?></td><?php endforeach; ?>
				</tr>
				<?php endforeach; ?>
			</tbody>
		</table>
	</div>
</section>
