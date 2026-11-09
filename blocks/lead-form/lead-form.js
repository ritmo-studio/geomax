/* lead-form v1.2 · кнопка неактивна без согласия, тултип — через title.
   Атрибут disabled намеренно не ставим: отключённая кнопка не получает событий мыши,
   и подсказка с причиной (title) перестала бы показываться — а причина здесь главное.
   Поэтому aria-disabled + класс + гашение клика; плагинная кнопка-ссылка так тоже
   обслуживается. Отправку по Enter из поля держит required у самого чекбокса.
   Клик по ссылке на политику внутри подписи не должен переключать галочку: подпись —
   label, и щелчок по ней дошёл бы до чекбокса. Гасим всплытие, переход остаётся.
   Телефон: буквы вырезаются на вводе, а не проверяются постфактум — так их вообще не напечатать.
   Файл подключается в <head>, разметки на этот момент ещё нет — ждём DOMContentLoaded. */
(function () {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();

  function start() {
    var forms = document.querySelectorAll('.sds-lead-form'), i;
    for (i = 0; i < forms.length; i++) run(forms[i]);
  }

  function run(form) {
    var consent = form.querySelector('.sds-checkbox');
    var submit = form.querySelector('.sds-lead-form__actions .sds-btn');
    if (consent && submit) {
      var sync = function () {
        var ok = consent.checked;
        submit.classList.toggle('sds-btn--disabled', !ok);
        submit.setAttribute('aria-disabled', String(!ok));
        submit.title = ok ? '' : 'Отметьте согласие на обработку персональных данных';
      };
      consent.addEventListener('change', sync);
      submit.addEventListener('click', function (e) {
        if (!consent.checked) e.preventDefault();
      });
      sync();
    }
    var link = form.querySelector('.sds-lead-form__consent-link');
    if (link) link.addEventListener('click', function (e) { e.stopPropagation(); });

    var phone = form.querySelector('.sds-field__input[type="tel"]');
    if (phone) {
      phone.addEventListener('input', function () {
        var cleaned = phone.value.replace(/[^\d+()\s-]/g, '');
        if (cleaned !== phone.value) phone.value = cleaned;
      });
    }
  }
})();
