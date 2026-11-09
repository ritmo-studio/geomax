/* hero-video v1.1 · prefers-reduced-motion: видео не играет, остаётся постер.
   Автоплей нельзя остановить ни CSS, ни атрибутом: pause() мало — уже отрисованный кадр
   так и останется на экране вместо постера. Поэтому снимаем источники и перезагружаем
   элемент: браузер возвращается к poster. Контрола паузы в макете нет — для всех
   остальных видео играет как задумано.
   Файл подключается в <head>, разметки на этот момент ещё нет — ждём DOMContentLoaded. */
(function () {
  if (!window.matchMedia || !matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function stop() {
    var list = document.querySelectorAll('.sds-hero-video__media'), i, v;
    for (i = 0; i < list.length; i++) {
      v = list[i];
      v.removeAttribute('autoplay');
      v.autoplay = false;
      try { v.pause(); } catch (e) {}
      while (v.firstChild) v.removeChild(v.firstChild);   // <source> прочь
      v.removeAttribute('src');
      try { v.load(); } catch (e) {}                      // показывается poster
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', stop);
  else stop();
})();
