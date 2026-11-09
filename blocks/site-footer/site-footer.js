/* site-footer v1.5 · «Наверх» без id на странице + плавающая ссылка на ПК.
   Якорь href="#top" требовал бы элемента с id, а блоки библиотеки id не имеют вообще
   (блок может повторяться). Поэтому ссылка ведёт на "#", а прокрутку делает скрипт.
   Без JS браузер по "#" всё равно уходит к началу документа — поведение сохраняется.
   prefers-reduced-motion: прыжком, без плавности.
   Файл подключается в <head>, разметки на этот момент ещё нет — ждём DOMContentLoaded.

   startFloat (только от 1280, десктоп): та же ссылка «Наверх», без своего фона —
   временно становится position:fixed у правого края, пока страница пролистывается
   вниз со второго блока и до футера (класс --pinned). top каждый тик скролла считаем
   как min(нижний край экрана, «докаточная» точка у футера) — docY (документная Y
   верхнего края футера + его padding-top) минус текущий scrollY. Пока докаточная точка
   ниже нижнего края экрана, кнопка просто висит внизу; как только подходит ближе —
   кнопка непрерывно едет вместе с футером и останавливается ровно там, где стоит
   в обычном потоке (top:0;right:0 в CSS) — без прыжка и без opacity-перехода на стыке.
   Видимость (is-shown) зависит от направления скролла, но у самой докаточной точки
   это правило отключается — кнопка не прячется, подъезжая к футеру.

   Вся геометрия меряется в measure(), в обработчике скролла чтений DOM нет: страница
   едет через Lenis по requestAnimationFrame, то есть тик скролла — это кадр, и пара
   getBoundingClientRect после записи style.top дала бы принудительный layout каждый
   кадр. Документные координаты меняются не только при ресайзе (раскрылся <details>
   в faq, открылся лайтбокс), поэтому высоту страницы слушаем ResizeObserver'ом:
   без этого докаточная точка остаётся старой и ссылка замирает в воздухе.
   Порог 1280 проверяется в sync(), а не один раз на старте: иначе фича не включалась
   бы при растягивании окна и возвращалась бы первым же скроллом после сужения. */
(function () {
  var smooth = !(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();

  function start() {
    var links = document.querySelectorAll('[data-sds-top]'), i;
    for (i = 0; i < links.length; i++) links[i].addEventListener('click', go);
    startFloat();
  }

  function go(e) {
    e.preventDefault();
    if (window.sdsLenis) window.sdsLenis.scrollTo(0, { immediate: !smooth });
    else window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
  }

  function startFloat() {
    if (!window.matchMedia) return;
    var link = document.querySelector('.sds-footer__top');
    var footer = link && link.closest('.sds-footer');
    if (!link || !footer) return;

    // «Второй блок» — второй .sds-раздел страницы, не считая зафиксированных
    // (шапка, прилипшая кнопка) и сам футер. Признак — вычисленный position:fixed,
    // как в cta-sticky.js: имена соседних блоков футеру знать незачем.
    // pastSecond мерим по верхнему краю блока, а не через IntersectionObserver
    // .isIntersecting: блок может быть выше экрана и при этом ещё частично виден
    // (isIntersecting:true), и кнопка то появлялась бы, то пропадала посреди скролла.
    var sections = document.querySelectorAll('.sds'), second = null, count = 0, i;
    for (i = 0; i < sections.length; i++) {
      var s = sections[i];
      if (s === footer || getComputedStyle(s).position === 'fixed') continue;
      count++;
      if (count === 2) { second = s; break; }
    }
    if (!second) return;

    var gap = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--sds-space-gap-l')) || 24;
    var dir = 'down', lastY = window.pageYOffset;
    var docY = 0, secondY = 0, linkH = 0, padRight = 0, pinned = false;

    function measure() {
      var fs = getComputedStyle(footer);
      docY = footer.getBoundingClientRect().top + window.pageYOffset + (parseFloat(fs.paddingTop) || 0);
      secondY = second.getBoundingClientRect().top + window.pageYOffset;
      padRight = parseFloat(fs.paddingRight) || 0;
      linkH = link.offsetHeight;
    }

    function reset() {
      if (!pinned) return;
      pinned = false;
      link.classList.remove('sds-footer__top--pinned', 'is-shown');
      link.style.cssText = '';
    }

    function sync() {
      var y = window.pageYOffset;
      if (!matchMedia('(min-width:1280px)').matches || y < secondY) { reset(); return; }
      var floatTop = window.innerHeight - gap - linkH;
      var dockTop = docY - y;
      var docking = dockTop <= floatTop;
      if (!pinned) { pinned = true; link.classList.add('sds-footer__top--pinned'); }
      link.classList.toggle('is-shown', docking || dir === 'down');
      link.style.top = (docking ? dockTop : floatTop) + 'px';
      link.style.right = padRight + 'px';
    }

    function remeasure() {
      if (pinned) { reset(); measure(); sync(); }
      else measure();
    }

    measure();
    sync();

    window.addEventListener('scroll', function () {
      var y = window.pageYOffset;
      dir = y > lastY ? 'down' : 'up';
      lastY = y;
      sync();
    }, { passive: true });

    window.addEventListener('resize', remeasure);
    window.addEventListener('load', remeasure);   // догрузились картинки — высота страницы другая

    // Высота страницы меняется без ресайза: раскрылся вопрос в faq, открылся
    // лайтбокс, догрузилась картинка. Мерить заново надо в обычном потоке —
    // пока ссылка position:fixed, её собственная геометрия ничего не скажет.
    if ('ResizeObserver' in window) new ResizeObserver(remeasure).observe(document.body);
  }
})();
