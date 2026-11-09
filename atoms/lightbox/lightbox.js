/* atom lightbox v1.0 · открывает картинку поверх страницы по клику на [data-lightbox].
   Триггер — обычная ссылка на файл (href = полноразмерный скан): без этого скрипта
   остаётся ссылкой, страница не ломается. С ним клик перехватывается, в диалог
   подставляются src/name/date из data-атрибутов триггера, дальше Esc, фокус-ловушка
   и возврат фокуса на триггер после закрытия — нативное поведение <dialog>.
   Файл подключается в <head>, разметки на этот момент ещё нет — ждём DOMContentLoaded. */
(function () {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();

  function start() {
    var dialogs = document.querySelectorAll('.sds-lightbox'), i;
    for (i = 0; i < dialogs.length; i++) run(dialogs[i]);
  }

  function run(dialog) {
    var img = dialog.querySelector('.sds-lightbox__image');
    var name = dialog.querySelector('.sds-lightbox__name');
    var date = dialog.querySelector('.sds-lightbox__date');
    var closeBtn = dialog.querySelector('.sds-lightbox__close');
    var root = dialog.closest('section, footer, header, body') || document;

    root.addEventListener('click', function (e) {
      var trigger = e.target.closest('[data-lightbox]');
      if (!trigger) return;
      e.preventDefault();
      img.src = trigger.href;
      img.alt = trigger.dataset.alt || '';
      name.textContent = trigger.dataset.name || '';
      date.textContent = trigger.dataset.date || '';
      document.documentElement.classList.add('sds-lightbox-open');
      dialog.showModal();
    });

    var unlock = function () { document.documentElement.classList.remove('sds-lightbox-open'); };
    // unlock() вызывается и явно (клик по крестику/фону), и через событие close
    // (Esc — его сам пользователь не вызывает, ловит только событие): так блокировка
    // снимается в обоих случаях, даже если браузер не доставит close синхронно.
    closeBtn.addEventListener('click', function () { dialog.close(); unlock(); });
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) { dialog.close(); unlock(); }
    });
    dialog.addEventListener('close', unlock);
  }
})();
