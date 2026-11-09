/* cta-sticky v1.1 · показ прилипшей кнопки.
   Правило простое: полоса видна, когда первый экран пролистан и при этом на виду
   нет ни одной настоящей кнопки блока. Иначе получилось бы две одинаковые кнопки
   на одном экране — и та, что в блоке, выглядела бы лишней. */
(function () {
  if (!('IntersectionObserver' in window)) return;

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();

  function start() {
    var bars = document.querySelectorAll('.sds-ctabar');
    for (var i = 0; i < bars.length; i++) init(bars[i]);
  }

  function init(bar) {
    var all = document.querySelectorAll('.sds-btn');
    var watch = [];
    for (var i = 0; i < all.length; i++) if (!bar.contains(all[i])) watch.push(all[i]);

    // «Первый экран пролистан» меряем по первому блоку страницы, а не по пикселям:
    // высота hero у каждого проекта своя. Зафиксированные блоки (шапка — position:fixed)
    // не считаются: они не покидают экран при скролле, и pastFirst никогда не сработает.
    var first = null, sections = document.querySelectorAll('.sds');
    for (var s = 0; s < sections.length; s++) {
      if (sections[s].classList.contains('sds-ctabar') || bar.contains(sections[s])) continue;
      if (getComputedStyle(sections[s]).position === 'fixed') continue;
      first = sections[s];
      break;
    }
    var pastFirst = false;
    var visible = 0;

    function sync() {
      bar.classList.toggle('is-shown', pastFirst && visible === 0);
    }

    var io = new IntersectionObserver(function (entries) {
      for (var j = 0; j < entries.length; j++) {
        var e = entries[j];
        if (e.target === first) pastFirst = !e.isIntersecting;
        else e.target.setAttribute('data-sds-seen', e.isIntersecting ? '1' : '0');
      }
      visible = 0;
      for (var k = 0; k < watch.length; k++) if (watch[k].getAttribute('data-sds-seen') === '1') visible++;
      sync();
    }, { threshold: 0 });

    for (var m = 0; m < watch.length; m++) io.observe(watch[m]);
    if (first) io.observe(first);
    else {
      // Блока над полосой нет (например, отдельная демо-страница) — считаем по экрану.
      window.addEventListener('scroll', function () {
        pastFirst = window.scrollY > window.innerHeight;
        sync();
      }, { passive: true });
    }
  }
})();
