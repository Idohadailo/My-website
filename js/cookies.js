document.addEventListener("DOMContentLoaded", function() {
    const widget = document.getElementById('cookie-widget');
    const modal = document.getElementById('cookie-modal');
    const closeBtn = document.getElementById('close-modal');
    const acceptNecessaryBtn = document.getElementById('accept-necessary');
    const saveSelectionBtn = document.getElementById('save-selection');

    if (!widget || !modal) {
        console.error('Cookie elements not found!');
        return;
    }

    // Открытие окна при клике на виджет
    widget.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'flex';
    });

    // Закрытие окна
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Закрытие при клике вне окна
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Обработка кликов на опции для переключения галочек
    document.querySelectorAll('.cookie-option:not(.disabled)').forEach(option => {
        option.addEventListener('click', function(e) {
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

    // КНОПКА 1: "Nur notwendige" - принять только необходимые
    if (acceptNecessaryBtn) {
        acceptNecessaryBtn.addEventListener('click', () => {
            // Сбрасываем все опциональные чекбоксы
            document.querySelectorAll('.cookie-option input:not(:disabled)').forEach(input => {
                input.checked = false;
            });
            // Убираем визуально галочки
            document.querySelectorAll('.cookie-option:not(.disabled) .checkmark').forEach(mark => {
                mark.classList.remove('checked');
            });
            
            saveConsent('necessary');
        });
    }

    // КНОПКА 2: "Auswahl speichern" - сохранить текущий выбор (что отмечено)
    if (saveSelectionBtn) {
        saveSelectionBtn.addEventListener('click', () => {
            // Собираем какие категории выбраны
            const preferences = {
                necessary: true, // Всегда включено
                preferences: document.getElementById('pref-perf')?.checked || false,
                statistics: document.getElementById('pref-stat')?.checked || false,
                marketing: document.getElementById('pref-mark')?.checked || false
            };
            
            // Сохраняем детальный выбор
            localStorage.setItem('cookieConsent', JSON.stringify(preferences));
            modal.style.display = 'none';
            
            console.log("Saved cookie preferences:", preferences);
            
            // Здесь можно инициализировать скрипты в зависимости от выбора
            if (preferences.statistics) {
                console.log("Enable analytics");
                // initAnalytics();
            }
            if (preferences.marketing) {
                console.log("Enable marketing cookies");
                // initMarketing();
            }
        });
    }

    function saveConsent(type) {
        if (type === 'necessary') {
            localStorage.setItem('cookieConsent', JSON.stringify({
                necessary: true,
                preferences: false,
                statistics: false,
                marketing: false
            }));
        }
        modal.style.display = 'none';
        console.log("Cookie consent saved:", type);
    }
});
