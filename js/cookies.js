document.addEventListener("DOMContentLoaded", function() {
    // Modal open/close is fully managed by modal.js
    // This file handles only consent business logic (checkboxes, localStorage)

    // Toggle checkmarks on option click
    document.querySelectorAll('.cookie-option:not(.disabled)').forEach(option => {
        option.addEventListener('click', function() {
            const checkbox = this.querySelector('input[type="checkbox"]');
            const checkmark = this.querySelector('.checkmark');
            checkbox.checked = !checkbox.checked;
            if (checkbox.checked) {
                checkmark.classList.add('checked');
            } else {
                checkmark.classList.remove('checked');
            }
        });
    });

    function saveConsent(preferences) {
        localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    }

    // "Alle akzeptieren" — accept all
    const acceptAllBtn = document.getElementById('accept-all');
    if (acceptAllBtn) {
        acceptAllBtn.addEventListener('click', () => {
            const prefCheckbox = document.getElementById('pref-perf');
            if (prefCheckbox) {
                prefCheckbox.checked = true;
                const mark = prefCheckbox.closest('.cookie-option')?.querySelector('.checkmark');
                if (mark) mark.classList.add('checked');
            }
            saveConsent({ necessary: true, preferences: true });
        });
    }

    // "Nur notwendige" — accept only required cookies
    const acceptNecessaryBtn = document.getElementById('accept-necessary');
    if (acceptNecessaryBtn) {
        acceptNecessaryBtn.addEventListener('click', () => {
            const prefCheckbox = document.getElementById('pref-perf');
            if (prefCheckbox) {
                prefCheckbox.checked = false;
                const mark = prefCheckbox.closest('.cookie-option')?.querySelector('.checkmark');
                if (mark) mark.classList.remove('checked');
            }
            saveConsent({ necessary: true, preferences: false });
        });
    }

    // "Auswahl speichern" — save current selection
    const saveSelectionBtn = document.getElementById('save-selection');
    if (saveSelectionBtn) {
        saveSelectionBtn.addEventListener('click', () => {
            saveConsent({
                necessary: true,
                preferences: document.getElementById('pref-perf')?.checked || false
            });
        });
    }
});
