(function () {
  var KEY = 'idnex-theme';
  var html = document.documentElement;

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;

    var sunIcon = btn.querySelector('.theme-icon--sun');
    var moonIcon = btn.querySelector('.theme-icon--moon');

    function syncIcons() {
      var isLight = html.getAttribute('data-theme') === 'light';
      sunIcon.style.display = isLight ? 'none' : 'block';
      moonIcon.style.display = isLight ? 'block' : 'none';
    }

    syncIcons();

    btn.addEventListener('click', function () {
      var isLight = html.getAttribute('data-theme') === 'light';
      if (isLight) {
        html.removeAttribute('data-theme');
        localStorage.setItem(KEY, 'dark');
      } else {
        html.setAttribute('data-theme', 'light');
        localStorage.setItem(KEY, 'light');
      }
      syncIcons();
    });
  });
}());
