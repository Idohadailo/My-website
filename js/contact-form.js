(function () {
  var ERP_URL   = 'https://erp.idnex.de/api/resource/Lead';
  var ERP_TOKEN = 'token e48df49ba1f2f34:70db560d7fd1823';

  var MESSAGES = {
    de: {
      sending:        'Wird gesendet…',
      success:        'Vielen Dank! Ich melde mich in Kürze.',
      error:          'Etwas ist schiefgelaufen. Bitte schreiben Sie uns direkt an info@idnex.de',
      required_name:  'Bitte geben Sie Ihren Namen ein.',
      required_email: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
    },
    en: {
      sending:        'Sending…',
      success:        'Thank you! I\'ll be in touch shortly.',
      error:          'Something went wrong. Please email us directly at info@idnex.de',
      required_name:  'Please enter your name.',
      required_email: 'Please enter a valid email address.'
    },
    ua: {
      sending:        'Надсилання…',
      success:        'Дякуємо! Я зв\'яжуся з вами найближчим часом.',
      error:          'Щось пішло не так. Напишіть нам на info@idnex.de',
      required_name:  'Будь ласка, введіть ваше ім\'я.',
      required_email: 'Будь ласка, введіть дійсну адресу електронної пошти.'
    },
    ru: {
      sending:        'Отправка…',
      success:        'Спасибо! Я свяжусь с вами в ближайшее время.',
      error:          'Что-то пошло не так. Напишите нам на info@idnex.de',
      required_name:  'Пожалуйста, введите ваше имя.',
      required_email: 'Пожалуйста, введите корректный адрес электронной почты.'
    }
  };

  function getLang() {
    return new URLSearchParams(window.location.search).get('lang')
      || localStorage.getItem('idnex-lang')
      || 'de';
  }

  function msg(key) {
    var lang = getLang();
    return (MESSAGES[lang] || MESSAGES.de)[key];
  }

  function showStatus(el, text, type) {
    el.textContent = text;
    el.className   = 'form-status form-status--' + type;
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function isValidEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('form[name="contact-form"]');
    if (!form) return;

    var btn         = form.querySelector('[type="submit"]');
    var btnOrigText = btn ? btn.textContent.trim() : '';
    var statusEl    = document.getElementById('form-status');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name    = (form.querySelector('#user-name')    || {}).value || '';
      var phone   = (form.querySelector('#user-tel')     || {}).value || '';
      var email   = (form.querySelector('#user-email')   || {}).value || '';
      var message = (form.querySelector('#user-message') || {}).value || '';

      // Validate required fields
      if (!name.trim()) {
        showStatus(statusEl, msg('required_name'), 'err');
        form.querySelector('#user-name').focus();
        return;
      }
      if (!email.trim() || !isValidEmail(email.trim())) {
        showStatus(statusEl, msg('required_email'), 'err');
        form.querySelector('#user-email').focus();
        return;
      }

      if (btn) { btn.disabled = true; btn.textContent = msg('sending'); }
      if (statusEl) { statusEl.textContent = ''; statusEl.className = 'form-status'; }

      var payload = {
        lead_name:   name.trim(),
        email_id:    email.trim(),
        lead_source: 'Website'
      };
      if (phone.trim())   payload.mobile_no = phone.trim();
      if (message.trim()) payload.notes     = [{ note: message.trim() }];

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
          showStatus(statusEl, msg('success'), 'ok');
          if (btn) { btn.disabled = false; btn.textContent = btnOrigText; }
        } else {
          throw new Error(data.exception || 'unknown');
        }
      })
      .catch(function () {
        showStatus(statusEl, msg('error'), 'err');
        if (btn) { btn.disabled = false; btn.textContent = btnOrigText; }
      });
    });
  });
}());
