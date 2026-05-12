(function () {
  var DURATION = 700;
  var HEADER_OFFSET = 80;

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }

  /* Smooth anchor scroll ----------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (!href || href === '#') return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();

        var start = window.pageYOffset;
        var targetY = target.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
        var startTime = null;

        anchor.blur();

        var _isTouch = navigator.maxTouchPoints > 0;

        if (_isTouch) {
          /* Mobile: add class to suppress sticky-hover color+underline.
             Remove it when browser itself releases sticky hover (next touchstart). */
          anchor.classList.add('link--active');
          var _activeTimer;
          function _removeActive() {
            anchor.classList.remove('link--active');
            document.removeEventListener('touchstart', _removeActive);
            clearTimeout(_activeTimer);
          }
          document.addEventListener('touchstart', _removeActive, { once: true, passive: true });
          _activeTimer = setTimeout(_removeActive, 4000);
        } else {
          /* Desktop: pointer-events:none kills :hover at browser level instantly. */
          anchor.style.setProperty('pointer-events', 'none');
        }

        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          var elapsed = timestamp - startTime;
          var progress = Math.min(elapsed / DURATION, 1);
          window.scrollTo(0, start + (targetY - start) * easeInOutCubic(progress));
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            anchor.blur();
            if (!_isTouch) {
              setTimeout(function () { anchor.style.removeProperty('pointer-events'); }, 800);
            }
          }
        }
        requestAnimationFrame(step);
      });
    });
  });

  /* Align info panel bottom to form button bottom ---------------- */
  function alignInfoPanel() {
    var button = document.querySelector('.contact-section__button');
    var form   = document.querySelector('.contact-section__form');
    var info   = document.querySelector('.contact-section__info');
    if (!button || !form || !info) return;

    info.style.height = '';

    if (window.innerWidth < 900) return;

    requestAnimationFrame(function () {
      var fY = form.getBoundingClientRect().top;
      var bY = button.getBoundingClientRect().bottom;
      var h  = Math.round(bY - fY);
      if (h > 60) info.style.height = h + 'px';
    });
  }

  document.addEventListener('DOMContentLoaded', alignInfoPanel);
  window.addEventListener('resize', function () {
    clearTimeout(window._contactResizeTimer);
    window._contactResizeTimer = setTimeout(alignInfoPanel, 150);
  });
}());
