/* lead-form v1.2 · кнопка неактивна без согласия, тултип — через title.
   Атрибут disabled намеренно не ставим: отключённая кнопка не получает событий мыши,
   и подсказка с причиной (title) перестала бы показываться — а причина здесь главное.
   Поэтому aria-disabled + класс + гашение клика; плагинная кнопка-ссылка так тоже
   обслуживается. Отправку по Enter из поля держит required у самого чекбокса.
   Клик по ссылке на политику внутри подписи не должен переключать галочку: подпись —
   label, и щелчок по ней дошёл бы до чекбокса. Гасим всплытие, переход остаётся.
   Телефон: буквы вырезаются на вводе, а не проверяются постфактум — так их вообще не напечатать.
   Файл подключается в <head>, разметки на этот момент ещё нет — ждём DOMContentLoaded.

   Отклонение от библиотеки: отправка перехватывается и уходит fetch'ем, ответ
   показывается на месте формы. Без JS всё работает тем же обычным POST'ом
   с редиректом назад, обработчик отвечает и JSON'ом, и редиректом — поэтому
   перехват можно снять в любой момент, ничего не сломав.
   Кнопку на время запроса гасим: второй клик — это вторая заявка. */
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

    var el = form.querySelector('.sds-lead-form__form');
    if (el && window.fetch && window.FormData) el.addEventListener('submit', function (e) {
      if (!el.reportValidity()) return;                       // браузерные проверки сначала
      e.preventDefault();
      var btn = el.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.classList.add('sds-btn--disabled'); }
      clearErrors(el);
      fetch(el.action, {
        method: 'POST',
        body: new FormData(el),
        headers: { 'Accept': 'application/json' },
        credentials: 'same-origin'
      })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res && res.ok) { done(el, res.message); return; }
          showErrors(el, (res && res.errors) || {});
          status(el, (res && res.message) || 'Не удалось отправить. Попробуйте ещё раз.', false);
          if (btn) { btn.disabled = false; btn.classList.remove('sds-btn--disabled'); }
        })
        .catch(function () {
          // Сеть отвалилась — отправляем обычным способом, чтобы заявка не пропала.
          el.submit();
        });
    });

    var phone = form.querySelector('.sds-field__input[type="tel"]');
    if (phone) {
      phone.addEventListener('input', function () {
        var cleaned = phone.value.replace(/[^\d+()\s-]/g, '');
        if (cleaned !== phone.value) phone.value = cleaned;
      });
    }
  }

  function status(el, text, ok) {
    var p = el.querySelector('.sds-lead-form__status');
    if (!p) {
      p = document.createElement('p');
      el.insertBefore(p, el.firstChild.nextSibling);
    }
    p.className = 'sds-lead-form__status sds-lead-form__status--' + (ok ? 'ok' : 'fail');
    p.setAttribute('role', ok ? 'status' : 'alert');
    p.textContent = text;
  }

  function done(el, text) {
    var p = document.createElement('p');
    p.className = 'sds-lead-form__status sds-lead-form__status--ok';
    p.setAttribute('role', 'status');
    p.textContent = text || 'Заявка отправлена.';
    el.parentNode.replaceChild(p, el);
    p.focus && p.setAttribute('tabindex', '-1');
    p.focus && p.focus();
  }

  function clearErrors(el) {
    var old = el.querySelectorAll('.sds-field__error'), i;
    for (i = 0; i < old.length; i++) old[i].parentNode.removeChild(old[i]);
    var marked = el.querySelectorAll('[aria-invalid]');
    for (i = 0; i < marked.length; i++) marked[i].removeAttribute('aria-invalid');
    var box = el.querySelector('.sds-checkbox--error');
    if (box) box.classList.remove('sds-checkbox--error');
  }

  function showErrors(el, errors) {
    var first = null, name;
    for (name in errors) {
      if (!Object.prototype.hasOwnProperty.call(errors, name)) continue;
      if (name === '_consent') {
        var box = el.querySelector('.sds-checkbox');
        if (box) box.classList.add('sds-checkbox--error');
        continue;
      }
      var input = el.querySelector('[name="' + name + '"]');
      if (!input) continue;
      input.setAttribute('aria-invalid', 'true');
      var p = document.createElement('p');
      p.className = 'sds-field__error';
      p.textContent = errors[name];
      input.closest('.sds-field').appendChild(p);
      if (!first) first = input;
    }
    if (first) first.focus();
  }
})();
