/* Lenis 1.3.27 · https://github.com/darkroomengineering/lenis · MIT. Вендорится как есть (минифицировано), правки сюда не вносим. */
(function(){var e=`1.3.27`;function t(e,t,n){return Math.max(e,Math.min(t,n))}function n(e,t,n){return(1-n)*e+n*t}function r(e,t,r,i){return n(e,t,1-Math.exp(-r*i))}function i(e,t){return(e%t+t)%t}var a=class{isRunning=!1;value=0;from=0;to=0;currentTime=0;lerp;duration;easing;onUpdate;advance(e){if(!this.isRunning)return;let n=!1;if(this.duration&&this.easing){this.currentTime+=e;let r=t(0,this.currentTime/this.duration,1);n=r>=1;let i=n?1:this.easing(r);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=r(this.value,this.to,this.lerp*60,e),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,n=!0)):(this.value=this.to,n=!0);n&&this.stop(),this.onUpdate?.(this.value,n)}stop(){this.isRunning=!1}fromTo(e,t,{lerp:n,duration:r,easing:i,onStart:a,onUpdate:o}){this.from=this.value=e,this.to=t,this.lerp=n,this.duration=r,this.easing=i,this.currentTime=0,this.isRunning=!0,a?.(),this.onUpdate=o}};function o(e,t){let n;return function(...r){clearTimeout(n),n=setTimeout(()=>{n=void 0,e.apply(this,r)},t)}}var s=class{width=0;height=0;scrollHeight=0;scrollWidth=0;debouncedResize;wrapperResizeObserver;contentResizeObserver;constructor(e,t,{autoResize:n=!0,debounce:r=250}={}){this.wrapper=e,this.content=t,n&&(this.debouncedResize=o(this.resize,r),this.wrapper instanceof Window?window.addEventListener(`resize`,this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener(`resize`,this.debouncedResize)}resize=()=>{this.onWrapperResize(),this.onContentResize()};onWrapperResize=()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)};onContentResize=()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)};get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},c=class{events={};emit(e,...t){let n=this.events[e]||[];for(let e=0,r=n.length;e<r;e++)n[e]?.(...t)}on(e,t){return this.events[e]?this.events[e].push(t):this.events[e]=[t],()=>{this.events[e]=this.events[e]?.filter(e=>t!==e)}}off(e,t){this.events[e]=this.events[e]?.filter(e=>t!==e)}destroy(){this.events={}}};let l={passive:!1};function u(e,t){return e===1?16.666666666666668:e===2?t:1}var d=class{touchStart={x:0,y:0};lastDelta={x:0,y:0};window={width:0,height:0};emitter=new c;constructor(e,t={wheelMultiplier:1,touchMultiplier:1}){this.element=e,this.options=t,window.addEventListener(`resize`,this.onWindowResize),this.onWindowResize(),this.element.addEventListener(`wheel`,this.onWheel,l),this.element.addEventListener(`touchstart`,this.onTouchStart,l),this.element.addEventListener(`touchmove`,this.onTouchMove,l),this.element.addEventListener(`touchend`,this.onTouchEnd,l)}on(e,t){return this.emitter.on(e,t)}destroy(){this.emitter.destroy(),window.removeEventListener(`resize`,this.onWindowResize),this.element.removeEventListener(`wheel`,this.onWheel,l),this.element.removeEventListener(`touchstart`,this.onTouchStart,l),this.element.removeEventListener(`touchmove`,this.onTouchMove,l),this.element.removeEventListener(`touchend`,this.onTouchEnd,l)}onTouchStart=e=>{let{clientX:t,clientY:n}=e.targetTouches?e.targetTouches[0]:e;this.touchStart.x=t,this.touchStart.y=n,this.lastDelta={x:0,y:0},this.emitter.emit(`scroll`,{deltaX:0,deltaY:0,event:e})};onTouchMove=e=>{let{clientX:t,clientY:n}=e.targetTouches?e.targetTouches[0]:e,r=-(t-this.touchStart.x)*this.options.touchMultiplier,i=-(n-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=t,this.touchStart.y=n,this.lastDelta={x:r,y:i},this.emitter.emit(`scroll`,{deltaX:r,deltaY:i,event:e})};onTouchEnd=e=>{this.emitter.emit(`scroll`,{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:e})};onWheel=e=>{let{deltaX:t,deltaY:n,deltaMode:r}=e,i=u(r,this.window.width),a=u(r,this.window.height);t*=i,n*=a,t*=this.options.wheelMultiplier,n*=this.options.wheelMultiplier,this.emitter.emit(`scroll`,{deltaX:t,deltaY:n,event:e})};onWindowResize=()=>{this.window={width:window.innerWidth,height:window.innerHeight}}};let f=e=>Math.min(1,1.001-2**(-10*e));var p=class{_isScrolling=!1;_isStopped=!1;_isLocked=!1;_preventNextNativeScrollEvent=!1;_resetVelocityTimeout=null;_rafId=null;_isDraggingSelection=!1;reducedMotionMediaQuery=window.matchMedia(`(prefers-reduced-motion: reduce)`);isTouching;isIos;time=0;userData={};lastVelocity=0;velocity=0;direction=0;options;targetScroll;animatedScroll;animate=new a;emitter=new c;dimensions;virtualScroll;constructor({wrapper:t=window,content:n=document.documentElement,eventsTarget:r=t,smoothWheel:i=!0,syncTouch:a=!1,syncTouchLerp:o=.075,touchInertiaExponent:c=1.7,duration:l,easing:u,lerp:p=.1,infinite:m=!1,orientation:h=`vertical`,gestureOrientation:g=h===`horizontal`?`both`:`vertical`,touchMultiplier:_=1,wheelMultiplier:v=1,autoResize:y=!0,prevent:b,virtualScroll:x,overscroll:S=!0,autoRaf:C=!1,anchors:w=!1,autoToggle:T=!1,allowNestedScroll:E=!1,__experimental__naiveDimensions:D=!1,naiveDimensions:O=D,stopInertiaOnNavigate:k=!1,respectReducedMotion:A=!0}={}){window.lenisVersion=e,window.lenis||(window.lenis={}),window.lenis.version=e,h===`horizontal`&&(window.lenis.horizontal=!0),a===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!t||t===document.documentElement)&&(t=window),typeof l==`number`&&typeof u!=`function`?u=f:typeof u==`function`&&typeof l!=`number`&&(l=1),this.options={wrapper:t,content:n,eventsTarget:r,smoothWheel:i,syncTouch:a,syncTouchLerp:o,touchInertiaExponent:c,duration:l,easing:u,lerp:p,infinite:m,gestureOrientation:g,orientation:h,touchMultiplier:_,wheelMultiplier:v,autoResize:y,prevent:b,virtualScroll:x,overscroll:S,autoRaf:C,anchors:w,autoToggle:T,allowNestedScroll:E,naiveDimensions:O,stopInertiaOnNavigate:k,respectReducedMotion:A},this.dimensions=new s(t,n,{autoResize:y}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener(`scroll`,this.onNativeScroll),this.options.wrapper.addEventListener(`scrollend`,this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener(`click`,this.onClick),this.options.wrapper.addEventListener(`pointerdown`,this.onPointerDown),this.virtualScroll=new d(r,{touchMultiplier:_,wheelMultiplier:v}),this.virtualScroll.on(`scroll`,this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener(`transitionend`,this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this.options.wrapper.removeEventListener(`scroll`,this.onNativeScroll),this.options.wrapper.removeEventListener(`scrollend`,this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener(`pointerdown`,this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener(`click`,this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(e,t){return this.emitter.on(e,t)}off(e,t){return this.emitter.off(e,t)}onScrollEnd=e=>{e instanceof CustomEvent||(this.isScrolling===`smooth`||this.isScrolling===!1)&&e.stopPropagation()};dispatchScrollendEvent=()=>{this.options.wrapper.dispatchEvent(new CustomEvent(`scrollend`,{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))};get overflow(){let e=this.isHorizontal?`overflow-x`:`overflow-y`;return getComputedStyle(this.rootElement)[e]}checkOverflow(){[`hidden`,`clip`].includes(this.overflow)?this.internalStop():this.internalStart()}onTransitionEnd=e=>{e.propertyName?.includes(`overflow`)&&e.target===this.rootElement&&this.checkOverflow()};setScroll(e){this.isHorizontal?this.options.wrapper.scrollTo({left:e,behavior:`instant`}):this.options.wrapper.scrollTo({top:e,behavior:`instant`})}onClick=e=>{let t=e.composedPath().filter(e=>e instanceof HTMLAnchorElement&&e.href).map(e=>new URL(e.href)),n=new URL(window.location.href);if(this.options.anchors){let e=t.find(e=>n.host===e.host&&n.pathname===e.pathname&&e.hash);if(e){let t=typeof this.options.anchors==`object`&&this.options.anchors?this.options.anchors:void 0,n=decodeURIComponent(e.hash);this.scrollTo(n,t);return}}if(this.options.stopInertiaOnNavigate&&t.some(e=>n.host===e.host&&n.pathname!==e.pathname)){this.reset();return}};onPointerDown=e=>{e.button===1&&this.reset()};isTouchOnSelectionHandle(e){let t=window.getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return!1;let n=e.targetTouches[0]??e.changedTouches[0];if(!n)return!1;let r=t.getRangeAt(0).getClientRects();if(r.length===0)return!1;let i=r[0],a=r[r.length-1],o=Math.hypot(n.clientX-i.left,n.clientY-i.top)<=40,s=Math.hypot(n.clientX-a.right,n.clientY-a.bottom)<=40;return o||s}onVirtualScroll=e=>{if(typeof this.options.virtualScroll==`function`&&this.options.virtualScroll(e)===!1)return;let{deltaX:t,deltaY:n,event:r}=e;if(this.emitter.emit(`virtual-scroll`,{deltaX:t,deltaY:n,event:r}),r.ctrlKey||r.lenisStopPropagation)return;let i=r.type.includes(`touch`),a=r.type.includes(`wheel`);if(i&&this.isIos&&(r.type===`touchstart`&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(r)),this._isDraggingSelection)){r.type===`touchend`&&(this._isDraggingSelection=!1);return}this.isTouching=r.type===`touchstart`||r.type===`touchmove`;let o=t===0&&n===0;if(this.options.syncTouch&&i&&r.type===`touchstart`&&o&&!this.isStopped&&!this.isLocked){this.reset();return}let s=this.options.gestureOrientation===`vertical`&&n===0||this.options.gestureOrientation===`horizontal`&&t===0;if(o||s)return;let c=r.composedPath();c=c.slice(0,c.indexOf(this.rootElement));let l=this.options.prevent,u=Math.abs(t)>=Math.abs(n)?`horizontal`:`vertical`;if(c.find(e=>e instanceof HTMLElement&&(typeof l==`function`&&l?.(e)||e.hasAttribute?.(`data-lenis-prevent`)||u===`vertical`&&e.hasAttribute?.(`data-lenis-prevent-vertical`)||u===`horizontal`&&e.hasAttribute?.(`data-lenis-prevent-horizontal`)||i&&e.hasAttribute?.(`data-lenis-prevent-touch`)||a&&e.hasAttribute?.(`data-lenis-prevent-wheel`)||this.options.allowNestedScroll&&this.hasNestedScroll(e,{deltaX:t,deltaY:n}))))return;if(this.isStopped||this.isLocked){r.cancelable&&r.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&a)){this.isScrolling=`native`,this.animate.stop(),r.lenisStopPropagation=!0;return}let d=n;this.options.gestureOrientation===`both`?d=Math.abs(n)>Math.abs(t)?n:t:this.options.gestureOrientation===`horizontal`&&(d=t),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&n>0||this.animatedScroll===this.limit&&n<0))&&(r.lenisStopPropagation=!0),r.cancelable&&r.preventDefault();let f=i&&this.options.syncTouch,p=i&&r.type===`touchend`;p&&(d=Math.sign(d)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+d,{programmatic:!1,...f?{lerp:p?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})};resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit(`scroll`,this)}onNativeScroll=()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling===`native`){let e=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-e,this.direction=Math.sign(this.animatedScroll-e),this.isStopped||(this.isScrolling=`native`),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}};reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty(`overflow`);return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty(`overflow`,`clip`);return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}raf=e=>{let t=e-(this.time||e);this.time=e,this.animate.advance(t*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))};scrollTo(e,{offset:n=0,immediate:r=!1,lock:i=!1,programmatic:a=!0,lerp:o=a?this.options.lerp:void 0,duration:s=a?this.options.duration:void 0,easing:c=a?this.options.easing:void 0,onStart:l,onComplete:u,force:d=!1,userData:p}={}){if(this.prefersReducedMotion&&(a?r=!0:(o=1,s=void 0,c=void 0)),(this.isStopped||this.isLocked)&&!d)return;let m=e,h=n;if(typeof m==`string`&&[`top`,`left`,`start`,`#`].includes(m))m=0;else if(typeof m==`string`&&[`bottom`,`right`,`end`].includes(m))m=this.limit;else{let e=null;if(typeof m==`string`?(e=m.startsWith(`#`)?document.getElementById(m.slice(1)):document.querySelector(m),e||(m===`#top`?m=0:console.warn(`Lenis: Target not found`,m))):m instanceof Element&&(e=m),e){if(this.options.wrapper!==window){let e=this.rootElement.getBoundingClientRect();h-=this.isHorizontal?e.left:e.top}let t=e.getBoundingClientRect(),n=getComputedStyle(e),r=this.isHorizontal?Number.parseFloat(n.scrollMarginLeft):Number.parseFloat(n.scrollMarginTop),i=getComputedStyle(this.rootElement),a=this.isHorizontal?Number.parseFloat(i.scrollPaddingLeft):Number.parseFloat(i.scrollPaddingTop);m=(this.isHorizontal?t.left:t.top)+this.animatedScroll-(Number.isNaN(r)?0:r)-(Number.isNaN(a)?0:a)}}if(typeof m==`number`){if(m+=h,this.options.infinite){if(a){this.targetScroll=this.animatedScroll=this.scroll;let e=m-this.animatedScroll;e>this.limit/2?m-=this.limit:e<-this.limit/2&&(m+=this.limit)}}else m=t(0,m,this.limit);if(m===this.targetScroll){l?.(this),u?.(this);return}if(this.userData=p??{},r){this.animatedScroll=this.targetScroll=m,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),u?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}a||(this.targetScroll=m),typeof s==`number`&&typeof c!=`function`?c=f:typeof c==`function`&&typeof s!=`number`&&(s=1),this.animate.fromTo(this.animatedScroll,m,{duration:s,easing:c,lerp:o,onStart:()=>{i&&(this.isLocked=!0),this.isScrolling=`smooth`,l?.(this)},onUpdate:(e,t)=>{this.isScrolling=`smooth`,this.lastVelocity=this.velocity,this.velocity=e-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=e,this.setScroll(this.scroll),a&&(this.targetScroll=e),t||this.emit(),t&&(this.reset(),this.emit(),u?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(e,{deltaX:t,deltaY:n}){let r=Date.now();e._lenis||={};let i=e._lenis,a,o,s,c,l,u,d,f,p,m;if(r-(i.time??0)>2e3){i.time=Date.now();let t=window.getComputedStyle(e);if(i.computedStyle=t,a=[`auto`,`overlay`,`scroll`].includes(t.overflowX),o=[`auto`,`overlay`,`scroll`].includes(t.overflowY),l=[`auto`].includes(t.overscrollBehaviorX),u=[`auto`].includes(t.overscrollBehaviorY),i.hasOverflowX=a,i.hasOverflowY=o,!(a||o))return!1;d=e.scrollWidth,f=e.scrollHeight,p=e.clientWidth,m=e.clientHeight,s=d>p,c=f>m,i.isScrollableX=s,i.isScrollableY=c,i.scrollWidth=d,i.scrollHeight=f,i.clientWidth=p,i.clientHeight=m,i.hasOverscrollBehaviorX=l,i.hasOverscrollBehaviorY=u}else s=i.isScrollableX,c=i.isScrollableY,a=i.hasOverflowX,o=i.hasOverflowY,d=i.scrollWidth,f=i.scrollHeight,p=i.clientWidth,m=i.clientHeight,l=i.hasOverscrollBehaviorX,u=i.hasOverscrollBehaviorY;if(!(a&&s||o&&c))return!1;let h=Math.abs(t)>=Math.abs(n)?`horizontal`:`vertical`,g,_,v,y,b,x;if(h===`horizontal`)g=Math.round(e.scrollLeft),_=d-p,v=t,y=a,b=s,x=l;else if(h===`vertical`)g=Math.round(e.scrollTop),_=f-m,v=n,y=o,b=c,x=u;else return!1;return!x&&(g>=_||g<=0)?!0:(v>0?g<_:g>0)&&y&&b}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?`x`:`y`]}get isHorizontal(){return this.options.orientation===`horizontal`}get actualScroll(){let e=this.options.wrapper;return this.isHorizontal?e.scrollX??e.scrollLeft:e.scrollY??e.scrollTop}get scroll(){return this.options.infinite?i(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(e){this._isScrolling!==e&&(this._isScrolling=e,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(e){this._isStopped!==e&&(this._isStopped=e,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(e){this._isLocked!==e&&(this._isLocked=e,this.updateClassName())}get isSmooth(){return this.isScrolling===`smooth`}get prefersReducedMotion(){return this.options.respectReducedMotion&&this.reducedMotionMediaQuery.matches}get className(){let e=`lenis`;return this.options.autoToggle&&(e+=` lenis-autoToggle`),this.isStopped&&(e+=` lenis-stopped`),this.isLocked&&(e+=` lenis-locked`),this.isScrolling&&(e+=` lenis-scrolling`),this.isScrolling===`smooth`&&(e+=` lenis-smooth`),e}updateClassName(){this.cleanUpClassName(),this.className.split(` `).forEach(e=>{this.rootElement.classList.add(e)})}cleanUpClassName(){for(let e of Array.from(this.rootElement.classList))(e===`lenis`||e.startsWith(`lenis-`))&&this.rootElement.classList.remove(e)}};globalThis.Lenis=p,globalThis.Lenis.prototype=p.prototype})();

/* SEO Design System · появление блоков при входе в экран. Один файл на всю библиотеку.
   Блок не знает своей позиции: наверху страницы элементы проявятся сразу при загрузке,
   ниже — когда до них доскроллят.
   Контент виден всегда: прятать можно только после того, как на <html> появился класс
   sds-js. Нет JS, старый браузер или prefers-reduced-motion — класса нет, блок статичен.
   Страховка: если наблюдатель не прислал ни одного ответа за 2 секунды (сломан, отключён,
   экзотическая среда), всё показывается принудительно. Контент не может остаться скрытым.
   Подключать в <head> без defer, иначе возможен мигающий кадр до скрытия. */
(function () {
  var d = document;
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  d.documentElement.classList.add('sds-js');

  function start() {
    var nodes = d.querySelectorAll('.sds .sds-anim'), i;
    function revealAll() {
      for (i = 0; i < nodes.length; i++) nodes[i].classList.add('sds-in');
    }
    try {
      var delivered = false;
      var io = new IntersectionObserver(function (entries) {
        delivered = true;
        for (var j = 0; j < entries.length; j++) {
          if (entries[j].isIntersecting) {
            entries[j].target.classList.add('sds-in');
            io.unobserve(entries[j].target);
          }
        }
      }, { threshold: 0, rootMargin: '0px 0px -5% 0px' });
      for (i = 0; i < nodes.length; i++) io.observe(nodes[i]);
      setTimeout(function () { if (!delivered) revealAll(); }, 2000);
    } catch (e) {
      revealAll();
    }
  }

  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', start);
  else start();
})();

/* SEO Design System · ленивый скролл (Lenis) для всей страницы, один файл на библиотеку.
   Подключён по умолчанию во всех клиентских проектах (вендор — vendor/lenis.min.js,
   билдится перед этим файлом в dist/sds.js и в sds.js клиентских страниц).
   prefers-reduced-motion и отсутствие Lenis (ошибка загрузки vendor-файла) — страница
   остаётся на нативном скролле, ничего не ломается.
   window.sdsLenis — общий инстанс: им пользуется site-footer.js («Наверх») вместо
   нативного scrollTo, чтобы не было двух конкурирующих плавностей.
   Лайтбокс и мобильная панель шапки блокируют нативный скролл классом/атрибутом
   (sds-lightbox-open, <details open> шапки) — Lenis их не видит и продолжил бы крутить
   страницу под открытым слоем, поэтому держим его на паузе, пока один из них активен.
   Пауза снимается по классу is-shown панели, а не по open: пока панель закрывается
   с анимацией (site-header.js: closePanel), open специально ещё стоит, но скролл
   к выбранному пункту должен пройти именно в эту паузу — иначе клик по пункту меню
   на мобильной визуально ничего не делает. */
(function () {
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (typeof Lenis === 'undefined') return;

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();

  function start() {
    var lenis = new Lenis();
    window.sdsLenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    function syncLock() {
      var locked = document.documentElement.classList.contains('sds-lightbox-open')
        || !!document.querySelector('.sds-header__panel.is-shown');
      if (locked) lenis.stop();
      else lenis.start();
    }
    new MutationObserver(syncLock).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    new MutationObserver(syncLock).observe(document.body, { attributes: true, attributeFilter: ['open', 'class'], subtree: true });
  }
})();

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

/* atom slider v1.1 · общее листание дорожки для всех блоков-слайдеров (views-slider,
   photo-slider, ...). Ищет на странице любой .sds-slider с .sds-slider__track внутри —
   блок помечает себя этими классами, а разметку track/card даёт сам. Прокрутка нативная:
   свайп работает и без этого файла. Скрипт добавляет стрелки, пагинацию, перетаскивание
   мышью, клавиатуру и зацикливание. Клонов карточек нет: «перемотка» — это прокрутка
   к началу или к концу дорожки. */
(function () {
  var smooth = !(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);

  // Файл подключается в <head>, разметки на этот момент ещё нет.
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
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

    // Карточек мало, и на этой ширине дорожка не упирается в край — стрелкам
    // и точкам листать нечего, оставлять их кликабельными означает ответ
    // без эффекта. Пересчитывается при ресайзе: брейкпоинт меняет ширину карточек.
    function updateOverflow() {
      root.classList.toggle('sds-slider--no-overflow', maxScroll() <= 1);
    }

    // Позиции карточек берём из вёрстки, а не умножением шага на индекс.
    // Последняя «страница» дорожки короче карточки: прокрутка упирается в край,
    // и кратные шагу цели туда просто не попадают — отсюда прыжки через карточку.
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
    function go(left) { track.scrollTo({ left: left, behavior: smooth ? 'smooth' : 'auto' }); }
    function goTo(i) {
      var o = offsets();
      if (i < 0) i = 0;
      if (i > o.length - 1) i = o.length - 1;
      go(o[i]);
    }

    if (next) next.addEventListener('click', function () {
      if (atEnd()) goTo(0);                                 // с конца — к началу
      else goTo(nearest(track.scrollLeft) + 1);
    });
    if (prev) prev.addEventListener('click', function () {
      if (atStart()) go(maxScroll());                       // с начала — к концу
      else goTo(nearest(track.scrollLeft) - 1);
    });

    // Перетаскивание мышью: курсор-рука, зажал и тянешь. Только мышь — на тач-экранах
    // работает родная прокрутка, перехватывать её нечем и незачем.
    // Указатель захватываем не сразу на pointerdown, а только когда сдвиг перешёл
    // порог (DRAG_THRESHOLD): ранний захват в части браузеров переадресует следом
    // идущий click на сам track — обычный клик по ссылке/кнопке внутри карточки
    // (например, lightbox-триггер в review-card) просто переставал доходить до цели.
    // На время захвата отключаем scroll-snap: иначе привязка тянет дорожку обратно.
    // После отпускания доводим до ближайшей карточки, возвращаем привязку и — если
    // сдвиг всё-таки был — гасим идущий следом click, чтобы отпускание после
    // протаскивания не срабатывало как клик по карточке под курсором.
    var DRAG_THRESHOLD = 5;
    var dragging = false, moved = false, pointerId = null, startX = 0, startScroll = 0, snapBack = null;
    track.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      dragging = false;
      moved = false;
      pointerId = e.pointerId;
      startX = e.clientX;
      track.scrollLeft = track.scrollLeft;   // гасим незаконченную плавную доводку
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
        track.classList.add('is-dragging', 'is-free');
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
        // привязку возвращаем, когда доводка закончилась, иначе она дёрнет дорожку рывком
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
    // Картинки и текст не должны «отрываться» при протаскивании.
    track.addEventListener('dragstart', function (e) { e.preventDefault(); });

    // Клавиатура: дорожка в фокусе по tabindex, стрелки листают по карточке.
    // Зацикливание такое же, как у кнопок, чтобы поведение не расходилось.
    track.addEventListener('keydown', function (e) {
      var k = e.key;
      if (k === 'ArrowRight') { e.preventDefault(); if (atEnd()) goTo(0); else goTo(nearest(track.scrollLeft) + 1); }
      else if (k === 'ArrowLeft') { e.preventDefault(); if (atStart()) go(maxScroll()); else goTo(nearest(track.scrollLeft) - 1); }
      else if (k === 'Home') { e.preventDefault(); goTo(0); }
      else if (k === 'End') { e.preventDefault(); go(maxScroll()); }
    });

    for (var i = 0; i < dots.length; i++) bindDot(dots[i], i);
    function bindDot(dot, i) {
      dot.addEventListener('click', function () { goTo(i); });
    }

    // Активная полоска: считаем по положению прокрутки, а не по кликам —
    // тогда свайп и стрелки обновляют её одинаково.
    var ticking = false;
    function sync() {
      ticking = false;
      var i = atEnd() ? dots.length - 1 : nearest(track.scrollLeft);
      if (i < 0) i = 0;
      if (i > dots.length - 1) i = dots.length - 1;
      // Пока справа есть что листать — правый край растворяется в фоне.
      root.classList.toggle('sds-slider--more', !atEnd());
      for (var k = 0; k < dots.length; k++) {
        if (k === i) dots[k].setAttribute('aria-current', 'true');
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

/* site-header v1.2 · мобильная панель забирает фокус себе.
   Панель — position:fixed поверх страницы, но содержимое под ней остаётся в табуляции:
   Tab уводил курсор в невидимую страницу. CSS этого не умеет, нативный <details> фокус
   не ловит — поэтому на время открытия соседям шапки по <body> ставится inert.
   Трогаем только прямых детей body и только пока панель открыта: ни одного состояния
   между открытиями не храним, несколько шапок на странице не предполагается (uniquePerPage).
   Файл подключается в <head>, разметки на этот момент ещё нет — ждём DOMContentLoaded.

   closePanel: открытие нативное (атрибут open уже стоит), а закрытие — сначала CSS-переход,
   потом open=false, иначе контент успевает исчезнуть (display:none у <details>) раньше
   анимации. Клик по любой ссылке внутри панели закрывает её тем же путём — переход
   по якорю или на страницу делает соседний скрипт (base-anchor.js), этому знать об этом
   не нужно (блоки независимые).

   startSpy: подсвечивает в меню пункт, соответствующий блоку на экране — только для
   ссылок-якорей на этой же странице (лендинг). Ссылка на отдельную страницу (будущие
   проекты) не трогается: её aria-current расставляет контент. */
(function () {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
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
        if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE') continue;
        if (toggle.open) el.setAttribute('inert', '');
        else el.removeAttribute('inert');
      }
      // Открытие — нативное и мгновенное (атрибут уже стоит), класс добавляем
      // на следующий кадр, чтобы transition сыграл от скрытого состояния.
      if (toggle.open) requestAnimationFrame(function () { requestAnimationFrame(function () { panel.classList.add('is-shown'); }); });
      else panel.classList.remove('is-shown');
    });

    // Закрытие по бургеру — не мгновенный toggle, а сначала анимация, потом open=false.
    summary.addEventListener('click', function (e) {
      if (toggle.open) { e.preventDefault(); closePanel(); }
    });

    // Любая ссылка в панели (пункт меню, телефон, кнопка) закрывает её —
    // переход или скролл к якорю делает соседний обработчик (base-anchor.js),
    // этому достаточно знать, что по ссылке кликнули.
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

  // Активный пункт меню по положению скролла — только для якорей на этой же
  // странице (лендинг). Пункты с ссылкой на другую страницу (будущие проекты)
  // статичны, их aria-current расставляет контент, а не этот скрипт.
  function startSpy() {
    var links = document.querySelectorAll('.sds-header__link, .sds-header__mrow');
    var byId = {}, order = [], i, href, id, el;
    for (i = 0; i < links.length; i++) {
      href = links[i].getAttribute('href') || '';
      if (href.charAt(0) !== '#' || href.length < 2) continue;
      id = href.slice(1);
      el = document.getElementById(id);
      if (!el) continue;
      if (!byId[id]) { byId[id] = { el: el, links: [] }; order.push(id); }
      byId[id].links.push(links[i]);
      links[i].removeAttribute('aria-current');
    }
    if (!order.length || !('IntersectionObserver' in window)) return;
    order.sort(function (a, b) { return byId[a].el.compareDocumentPosition(byId[b].el) & 4 ? -1 : 1; });

    var active = {};
    function setActive(id) {
      for (i = 0; i < order.length; i++) {
        var on = order[i] === id, l = byId[order[i]].links, j;
        for (j = 0; j < l.length; j++) if (on) l[j].setAttribute('aria-current', 'page'); else l[j].removeAttribute('aria-current');
      }
    }
    var headerBar = document.querySelector('.sds-header__bar');
    var offset = (headerBar ? headerBar.getBoundingClientRect().height : 0) + 24;
    var io = new IntersectionObserver(function (entries) {
      var found = null, j;
      for (j = 0; j < entries.length; j++) active[entries[j].target.id] = entries[j].isIntersecting;
      // Ничего не пересекает зону — явно снимаем активность, а не оставляем прежний
      // пункт висеть (иначе он остаётся выбранным даже после возврата в самый верх).
      for (j = 0; j < order.length; j++) if (active[order[j]]) { found = order[j]; break; }
      setActive(found);
    }, { rootMargin: '-' + Math.round(offset) + 'px 0px -60% 0px', threshold: 0 });
    for (i = 0; i < order.length; i++) io.observe(byId[order[i]].el);

    // Последний пункт короче «зоны активности» (например, подвал) может никогда не
    // попасть в неё — страница физически не может прокрутиться настолько, чтобы его
    // верх прошёл линию срабатывания. У низа страницы подсвечиваем его принудительно.
    var last = order[order.length - 1];
    window.addEventListener('scroll', function () {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) setActive(last);
    }, { passive: true });
  }
})();

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
