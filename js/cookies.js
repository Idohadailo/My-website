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

    // "Nur notwendige" — accept only required cookies
    const acceptNecessaryBtn = document.getElementById('accept-necessary');
    if (acceptNecessaryBtn) {
        acceptNecessaryBtn.addEventListener('click', () => {
            document.querySelectorAll('.cookie-option input:not(:disabled)').forEach(input => {
                input.checked = false;
            });
            document.querySelectorAll('.cookie-option:not(.disabled) .checkmark').forEach(mark => {
                mark.classList.remove('checked');
            });
            localStorage.setItem('cookieConsent', JSON.stringify({
                necessary: true,
                preferences: false,
                statistics: false,
                marketing: false
            }));
        });
    }

    // "Auswahl speichern" — save current selection
    const saveSelectionBtn = document.getElementById('save-selection');
    if (saveSelectionBtn) {
        saveSelectionBtn.addEventListener('click', () => {
            const preferences = {
                necessary: true,
                preferences: document.getElementById('pref-perf')?.checked || false,
                statistics: document.getElementById('pref-stat')?.checked || false,
                marketing: document.getElementById('pref-mark')?.checked || false
            };
            localStorage.setItem('cookieConsent', JSON.stringify(preferences));
        });
    }
});
