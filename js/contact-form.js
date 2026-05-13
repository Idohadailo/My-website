(function () {
  var ERP_URL    = 'https://erp.idnex.de/api/resource/Lead';
  var ERP_TOKEN  = 'token e48df49ba1f2f34:70db560d7fd1823';

  var MESSAGES = {
    de: {
      sending:  'Wird gesendet…',
      success:  'Vielen Dank! Ich melde mich in Kürze.',
      error:    'Etwas ist schiefgelaufen. Bitte schreiben Sie uns direkt an info@idnex.de'
    },
    en: {
      sending:  'Sending…',
      success:  'Thank you! I\'ll be in touch shortly.',
      error:    'Something went wrong. Please email us directly at info@idnex.de'
    },
    ua: {
      sending:  'Надсилання…',
      success:  'Дякуємо! Я зв\'яжуся з вами найближчим часом.',
      error:    'Щось пішло не так. Напишіть нам на info@idnex.de'
    },
    ru: {
      sending:  'Отправка…',
      success:  'Спасибо! Я свяжусь с вами в ближайшее время.',
      error:    'Что-то пошло не так. Напишите нам на info@idnex.de'
    }
  };

  function getLang() {
    var p = new URLSearchParams(window.location.search).get('lang');
    var s = localStorage.getItem('idnex-lang');
    return (p || s || 'de');
  }

  function msg(key) {
    var lang = getLang();
    return (MESSAGES[lang] || MESSAGES.de)[key];
  }

  document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('form[name="contact-form"]');
    if (!form) return;

    var btn         = form.querySelector('[type="submit"]');
    var btnOrigText = btn ? btn.textContent.trim() : '';
    var statusEl    = document.getElementById('form-status');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name    = (form.querySelector('#user-name')   || {}).value || '';
      var phone   = (form.querySelector('#user-tel')    || {}).value || '';
      var email   = (form.querySelector('#user-email')  || {}).value || '';
      var message = (form.querySelector('#user-message')|| {}).value || '';

      if (btn) { btn.disabled = true; btn.textContent = msg('sending'); }
      if (statusEl) { statusEl.textContent = ''; statusEl.className = 'form-status'; }

      var payload = {
        lead_name:   name,
        email_id:    email,
        mobile_no:   phone,
        lead_source: 'Website'
      };
      if (message) {
        payload.notes = [{ note: message }];
      }

      fetch(ERP_URL, {
        method:  'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': ERP_TOKEN
        },
        body: JSON.stringify(payload)
      })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.data && data.data.name) {
          form.reset();
          if (statusEl) {
            statusEl.textContent = msg('success');
            statusEl.className   = 'form-status form-status--ok';
          }
          if (btn) { btn.disabled = false; btn.textContent = btnOrigText; }
        } else {
          throw new Error(data.exception || 'unknown error');
        }
      })
      .catch(function () {
        if (statusEl) {
          statusEl.textContent = msg('error');
          statusEl.className   = 'form-status form-status--err';
        }
        if (btn) { btn.disabled = false; btn.textContent = btnOrigText; }
      });
    });
  });
}());
