(function () {'use strict';
var root = document.documentElement;
var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduced) root.classList.add('rs-js');
function initReveal() {
var items = document.querySelectorAll('.rs-anim');
if (!items.length) return;
if (reduced || !('IntersectionObserver'in window)) {
for (var i = 0; i < items.length; i++) items[i].classList.add('is-in');
return;
}
var io = new IntersectionObserver(function (entries) {
entries.forEach(function (e) {
if (!e.isIntersecting) return;
e.target.classList.add('is-in');
io.unobserve(e.target);
});
}, { rootMargin:'0px 0px -10% 0px', threshold: 0 });
items.forEach(function (el) { io.observe(el); });
}
var registry = {};
function anim(name, fn) {
registry[name] = fn;
return anim;
}
function initBlocks() {
var nodes = document.querySelectorAll('[data-anim]');
for (var i = 0; i < nodes.length; i++) {
var el = nodes[i];
var name = el.getAttribute('data-anim');
var fn = registry[name];
if (typeof fn !=='function') continue;
if (el.dataset.animReady ==='1') continue;
try {
fn(el, { reduced: reduced });
el.dataset.animReady ='1';
} catch (err) {
if (window.console) console.error('[rs] блок "'+ name +'":', err);
}
}
}
function initSmoothScroll() {
if (reduced || typeof window.Lenis !=='function') return;
try {
var lenis = new window.Lenis({
duration: 1,
smoothWheel: true,
syncTouch: false
});
var tick = function (time) { lenis.raf(time); requestAnimationFrame(tick); };
requestAnimationFrame(tick);
window.RS_lenis = lenis;
} catch (err) {
if (window.console) console.error('[rs] плавная прокрутка:', err);
}
}
function init() { initSmoothScroll(); initReveal(); initBlocks(); }
if (document.readyState ==='loading') {
document.addEventListener('DOMContentLoaded', init);
} else {
setTimeout(init, 0);
}
window.RS = { anim: anim, init: init, reduced: reduced };
})();
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
window.scrollTo({ top: y, behavior: reduced ?'auto':'smooth'});
}
});
})();
(function () {
if (document.readyState ==='loading') document.addEventListener('DOMContentLoaded', start);
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
img.alt = trigger.dataset.alt ||'';
name.textContent = trigger.dataset.name ||'';
date.textContent = trigger.dataset.date ||'';
document.documentElement.classList.add('sds-lightbox-open');
dialog.showModal();
});
var unlock = function () { document.documentElement.classList.remove('sds-lightbox-open'); };
closeBtn.addEventListener('click', function () { dialog.close(); unlock(); });
dialog.addEventListener('click', function (e) {
if (e.target === dialog) { dialog.close(); unlock(); }
});
dialog.addEventListener('close', unlock);
}
})();
(function () {
var smooth = !(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
if (document.readyState ==='loading') document.addEventListener('DOMContentLoaded', start);
else start();
function start() {
var sliders = document.querySelectorAll('.sds.sds-slider, .sds .sds-slider');
for (var s = 0; s < sliders.length; s++) init(sliders[s]);
}
function init(root) {
var track = root.querySelector('.sds-slider__track');
if (!track) return;
var cards = track.querySelectorAll('.sds-slider__card');
if (cards.length < 2) return;
var prev = root.querySelector('[data-sds-prev]');
var next = root.querySelector('[data-sds-next]');
var dots = root.querySelectorAll('.sds-pager__dot');
root.classList.add('sds-slider--js');
function updateOverflow() {
root.classList.toggle('sds-slider--no-overflow', maxScroll() <= 1);
}
function maxScroll() { return track.scrollWidth - track.clientWidth; }
function offsets() {
var base = cards[0].offsetLeft, arr = [], i;
for (i = 0; i < cards.length; i++) arr.push(Math.min(cards[i].offsetLeft - base, maxScroll()));
return arr;
}
function nearest(x) {
var o = offsets(), best = 0, dist = Infinity, i, d;
for (i = 0; i < o.length; i++) {
d = Math.abs(o[i] - x);
if (d < dist) { dist = d; best = i; }
}
return best;
}
function atStart() { return track.scrollLeft <= 2; }
function atEnd() { return track.scrollLeft + track.clientWidth >= track.scrollWidth - 2; }
function go(left) { track.scrollTo({ left: left, behavior: smooth ?'smooth':'auto'}); }
function goTo(i) {
var o = offsets();
if (i < 0) i = 0;
if (i > o.length - 1) i = o.length - 1;
go(o[i]);
}
if (next) next.addEventListener('click', function () {
if (atEnd()) goTo(0);
else goTo(nearest(track.scrollLeft) + 1);
});
if (prev) prev.addEventListener('click', function () {
if (atStart()) go(maxScroll());
else goTo(nearest(track.scrollLeft) - 1);
});
var DRAG_THRESHOLD = 5;
var dragging = false, moved = false, pointerId = null, startX = 0, startScroll = 0, snapBack = null;
track.addEventListener('pointerdown', function (e) {
if (e.pointerType !=='mouse'|| e.button !== 0) return;
dragging = false;
moved = false;
pointerId = e.pointerId;
startX = e.clientX;
track.scrollLeft = track.scrollLeft;
startScroll = track.scrollLeft;
if (snapBack) { clearTimeout(snapBack); snapBack = null; }
});
track.addEventListener('pointermove', function (e) {
if (pointerId === null || e.pointerId !== pointerId) return;
var dx = e.clientX - startX;
if (!dragging) {
if (Math.abs(dx) < DRAG_THRESHOLD) return;
dragging = true;
moved = true;
track.classList.add('is-dragging','is-free');
track.setPointerCapture(pointerId);
}
e.preventDefault();
track.scrollLeft = startScroll - dx;
});
function endDrag(e) {
if (pointerId === null || (e.pointerId !== undefined && e.pointerId !== pointerId)) return;
if (dragging) {
track.classList.remove('is-dragging');
try { track.releasePointerCapture(pointerId); } catch (err) {}
goTo(nearest(track.scrollLeft));
snapBack = setTimeout(function () { track.classList.remove('is-free'); snapBack = null; }, 360);
}
dragging = false;
pointerId = null;
}
track.addEventListener('pointerup', endDrag);
track.addEventListener('pointercancel', endDrag);
track.addEventListener('click', function (e) {
if (!moved) return;
moved = false;
e.preventDefault();
e.stopPropagation();
});
track.addEventListener('dragstart', function (e) { e.preventDefault(); });
track.addEventListener('keydown', function (e) {
var k = e.key;
if (k ==='ArrowRight') { e.preventDefault(); if (atEnd()) goTo(0); else goTo(nearest(track.scrollLeft) + 1); }
else if (k ==='ArrowLeft') { e.preventDefault(); if (atStart()) go(maxScroll()); else goTo(nearest(track.scrollLeft) - 1); }
else if (k ==='Home') { e.preventDefault(); goTo(0); }
else if (k ==='End') { e.preventDefault(); go(maxScroll()); }
});
for (var i = 0; i < dots.length; i++) bindDot(dots[i], i);
function bindDot(dot, i) {
dot.addEventListener('click', function () { goTo(i); });
}
var ticking = false;
function sync() {
ticking = false;
var i = atEnd() ? dots.length - 1 : nearest(track.scrollLeft);
if (i < 0) i = 0;
if (i > dots.length - 1) i = dots.length - 1;
root.classList.toggle('sds-slider--more', !atEnd());
for (var k = 0; k < dots.length; k++) {
if (k === i) dots[k].setAttribute('aria-current','true');
else dots[k].removeAttribute('aria-current');
}
}
track.addEventListener('scroll', function () {
if (ticking) return;
ticking = true;
requestAnimationFrame(sync);
}, { passive: true });
sync();
updateOverflow();
var resizeTimer = null;
window.addEventListener('resize', function () {
if (resizeTimer) clearTimeout(resizeTimer);
resizeTimer = setTimeout(updateOverflow, 150);
});
}
})();
(function () {
if (!('IntersectionObserver'in window)) return;
if (document.readyState ==='loading') document.addEventListener('DOMContentLoaded', start);
else start();
function start() {
var bars = document.querySelectorAll('.sds-ctabar');
for (var i = 0; i < bars.length; i++) init(bars[i]);
}
function init(bar) {
var all = document.querySelectorAll('.sds-btn');
var watch = [];
for (var i = 0; i < all.length; i++) if (!bar.contains(all[i])) watch.push(all[i]);
var first = null, sections = document.querySelectorAll('.sds');
for (var s = 0; s < sections.length; s++) {
if (sections[s].classList.contains('sds-ctabar') || bar.contains(sections[s])) continue;
if (getComputedStyle(sections[s]).position ==='fixed') continue;
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
else e.target.setAttribute('data-sds-seen', e.isIntersecting ?'1':'0');
}
visible = 0;
for (var k = 0; k < watch.length; k++) if (watch[k].getAttribute('data-sds-seen') ==='1') visible++;
sync();
}, { threshold: 0 });
for (var m = 0; m < watch.length; m++) io.observe(watch[m]);
if (first) io.observe(first);
else {
window.addEventListener('scroll', function () {
pastFirst = window.scrollY > window.innerHeight;
sync();
}, { passive: true });
}
}
})();
(function () {
if (!window.matchMedia || !matchMedia('(prefers-reduced-motion: reduce)').matches) return;
function stop() {
var list = document.querySelectorAll('.sds-hero-video__media'), i, v;
for (i = 0; i < list.length; i++) {
v = list[i];
v.removeAttribute('autoplay');
v.autoplay = false;
try { v.pause(); } catch (e) {}
while (v.firstChild) v.removeChild(v.firstChild);
v.removeAttribute('src');
try { v.load(); } catch (e) {}
}
}
if (document.readyState ==='loading') document.addEventListener('DOMContentLoaded', stop);
else stop();
})();
(function () {
if (document.readyState ==='loading') document.addEventListener('DOMContentLoaded', start);
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
submit.title = ok ?'':'Отметьте согласие на обработку персональных данных';
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
var cleaned = phone.value.replace(/[^\d+()\s-]/g,'');
if (cleaned !== phone.value) phone.value = cleaned;
});
}
}
})();
(function () {
var smooth = !(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
if (document.readyState ==='loading') document.addEventListener('DOMContentLoaded', start);
else start();
function start() {
var links = document.querySelectorAll('[data-sds-top]'), i;
for (i = 0; i < links.length; i++) links[i].addEventListener('click', go);
startFloat();
}
function go(e) {
e.preventDefault();
if (window.sdsLenis) window.sdsLenis.scrollTo(0, { immediate: !smooth });
else window.scrollTo({ top: 0, behavior: smooth ?'smooth':'auto'});
}
function startFloat() {
if (!window.matchMedia) return;
var link = document.querySelector('.sds-footer__top');
var footer = link && link.closest('.sds-footer');
if (!link || !footer) return;
var sections = document.querySelectorAll('.sds'), second = null, count = 0, i;
for (i = 0; i < sections.length; i++) {
var s = sections[i];
if (s === footer || getComputedStyle(s).position ==='fixed') continue;
count++;
if (count === 2) { second = s; break; }
}
if (!second) return;
var gap = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--sds-space-gap-l')) || 24;
var dir ='down', lastY = window.pageYOffset;
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
link.classList.remove('sds-footer__top--pinned','is-shown');
link.style.cssText ='';
}
function sync() {
var y = window.pageYOffset;
if (!matchMedia('(min-width:1280px)').matches || y < secondY) { reset(); return; }
var floatTop = window.innerHeight - gap - linkH;
var dockTop = docY - y;
var docking = dockTop <= floatTop;
if (!pinned) { pinned = true; link.classList.add('sds-footer__top--pinned'); }
link.classList.toggle('is-shown', docking || dir ==='down');
link.style.top = (docking ? dockTop : floatTop) +'px';
link.style.right = padRight +'px';
}
function remeasure() {
if (pinned) { reset(); measure(); sync(); }
else measure();
}
measure();
sync();
window.addEventListener('scroll', function () {
var y = window.pageYOffset;
dir = y > lastY ?'down':'up';
lastY = y;
sync();
}, { passive: true });
window.addEventListener('resize', remeasure);
window.addEventListener('load', remeasure);
if ('ResizeObserver'in window) new ResizeObserver(remeasure).observe(document.body);
}
})();
(function () {
if (document.readyState ==='loading') document.addEventListener('DOMContentLoaded', start);
else start();
function start() {
var toggles = document.querySelectorAll('.sds-header__toggle'), i;
for (i = 0; i < toggles.length; i++) bind(toggles[i]);
startSpy();
}
function bind(toggle) {
var header = toggle.closest('.sds-header') || toggle;
var panel = toggle.querySelector('.sds-header__panel');
var summary = toggle.querySelector('summary.sds-header__burger');
var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
toggle.addEventListener('toggle', function () {
var kids = document.body.children, i, el;
for (i = 0; i < kids.length; i++) {
el = kids[i];
if (el === header || el.contains(header)) continue;
if (el.tagName ==='SCRIPT'|| el.tagName ==='STYLE') continue;
if (toggle.open) el.setAttribute('inert','');
else el.removeAttribute('inert');
}
if (toggle.open) requestAnimationFrame(function () { requestAnimationFrame(function () { panel.classList.add('is-shown'); }); });
else panel.classList.remove('is-shown');
});
summary.addEventListener('click', function (e) {
if (toggle.open) { e.preventDefault(); closePanel(); }
});
panel.addEventListener('click', function (e) {
if (e.target.closest('a')) closePanel();
});
function closePanel() {
if (!toggle.open) return;
panel.classList.remove('is-shown');
if (reduced) { toggle.open = false; return; }
var done = false;
function finish() {
if (done) return;
done = true;
panel.removeEventListener('transitionend', finish);
toggle.open = false;
}
panel.addEventListener('transitionend', finish);
setTimeout(finish, 300);
}
}
function startSpy() {
var links = document.querySelectorAll('.sds-header__link, .sds-header__mrow');
var byId = {}, order = [], i, href, id, el;
for (i = 0; i < links.length; i++) {
href = links[i].getAttribute('href') ||'';
if (href.charAt(0) !=='#'|| href.length < 2) continue;
id = href.slice(1);
el = document.getElementById(id);
if (!el) continue;
if (!byId[id]) { byId[id] = { el: el, links: [] }; order.push(id); }
byId[id].links.push(links[i]);
links[i].removeAttribute('aria-current');
}
if (!order.length || !('IntersectionObserver'in window)) return;
order.sort(function (a, b) { return byId[a].el.compareDocumentPosition(byId[b].el) & 4 ? -1 : 1; });
var active = {};
function setActive(id) {
for (i = 0; i < order.length; i++) {
var on = order[i] === id, l = byId[order[i]].links, j;
for (j = 0; j < l.length; j++) if (on) l[j].setAttribute('aria-current','page'); else l[j].removeAttribute('aria-current');
}
}
var headerBar = document.querySelector('.sds-header__bar');
var offset = (headerBar ? headerBar.getBoundingClientRect().height : 0) + 24;
var io = new IntersectionObserver(function (entries) {
var found = null, j;
for (j = 0; j < entries.length; j++) active[entries[j].target.id] = entries[j].isIntersecting;
for (j = 0; j < order.length; j++) if (active[order[j]]) { found = order[j]; break; }
setActive(found);
}, { rootMargin:'-'+ Math.round(offset) +'px 0px -60% 0px', threshold: 0 });
for (i = 0; i < order.length; i++) io.observe(byId[order[i]].el);
var last = order[order.length - 1];
window.addEventListener('scroll', function () {
if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) setActive(last);
}, { passive: true });
}
})();
