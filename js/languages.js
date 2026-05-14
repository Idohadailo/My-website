(function () {
  var SUPPORTED = ['de', 'en', 'ua', 'ru'];
  var DEFAULT_LANG = 'de';
  var HTML_LANG_MAP = { de: 'de', en: 'en', ua: 'uk', ru: 'ru' };

  function getLang() {
    var urlParam = new URLSearchParams(window.location.search).get('lang');
    if (urlParam && SUPPORTED.indexOf(urlParam) !== -1) return urlParam;
    var stored = localStorage.getItem('idnex-lang');
    if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;
    return DEFAULT_LANG;
  }

  function applyLang(lang) {
    var t = window.i18n && window.i18n[lang];
    if (!t) return;

    document.documentElement.setAttribute('lang', HTML_LANG_MAP[lang] || lang);

    var titleEl = document.querySelector('title');
    if (titleEl && t.meta_title) titleEl.textContent = t.meta_title;
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && t.meta_desc) metaDesc.setAttribute('content', t.meta_desc);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.textContent = t[key];
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (t[key] !== undefined) el.innerHTML = t[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) el.setAttribute('placeholder', t[key]);
    });

    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.classList.toggle('is-active', el.getAttribute('data-lang') === lang);
    });

    document.querySelectorAll('#booking-page-link, #modal-booking-link').forEach(function(el) {
      el.href = './book.html?lang=' + lang;
    });
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) return;
    localStorage.setItem('idnex-lang', lang);
    applyLang(lang);
    var url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    history.replaceState(null, '', url.toString());
  }

  document.addEventListener('DOMContentLoaded', function () {
    var langBtn = document.querySelector('.header__lang-btn');
    var langList = document.querySelector('.header__lang-list');

    if (langBtn && langList) {
      langBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        langList.classList.toggle('is-open');
      });
      document.addEventListener('click', function (e) {
        if (!langBtn.contains(e.target) && !langList.contains(e.target)) {
          langList.classList.remove('is-open');
        }
      });
      langList.addEventListener('click', function (e) {
        var link = e.target.closest('[data-lang]');
        if (link) {
          e.preventDefault();
          setLang(link.getAttribute('data-lang'));
          langList.classList.remove('is-open');
        }
      });
    }

    applyLang(getLang());
  });
}());
