/* SEO Design System · плавный скролл по внутренним якорям, один файл на библиотеку.
   Перехватывает клик по ссылке вида href="#id" внутри блока, если такой id есть
   на странице: прокручивает к нему через Lenis (или нативно, если его нет/отключён),
   с отступом на высоту шапки — она теперь position:fixed (site-header.js) и иначе
   перекрыла бы верх блока. Ссылка на "#" без содержимого (ещё не прописанный якорь)
   и ссылки на другую страницу не трогаем — у них обычная навигация.
   data-sds-top (кнопка «Наверх» подвала) свой скролл уже делает сам — пропускаем его. */
(function () {
  document.addEventListener('click', function (e) {
    var a = e.target.closest('.sds a[href^="#"]');
    if (!a || a.hasAttribute('data-sds-top')) return;
    var id = a.getAttribute('href').slice(1);
    if (!id) return;
    var target = document.getElementById(id);
    if (!target) return;

    e.preventDefault();
    var bar = document.querySelector('.sds-header__bar');
    var offset = (bar ? bar.getBoundingClientRect().height : 0) + 24;
    var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (window.sdsLenis) {
      window.sdsLenis.scrollTo(target, { offset: -offset, immediate: reduced });
    } else {
      var y = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
    }
  });
})();
