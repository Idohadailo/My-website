document.addEventListener("DOMContentLoaded", function() {
    
    // === Универсальные функции управления модалями ===
    const openModal = (modal) => {
        if (modal) {
            modal.classList.remove('is-hidden');
            document.body.style.overflow = 'hidden';
        }
    };
    
    const closeModal = (modal) => {
        if (modal) {
            modal.classList.add('is-hidden');
            document.body.style.overflow = '';
        }
    };
    
    // === 1. INPUT FORM MODAL ===
    const inputModal = document.querySelector('.modal-input');
    const inputModalBtnOpen = document.querySelector('.modal-btn-open');
    const inputModalBtnClose = inputModal?.querySelector('.modal-input__btn-close');
    
    if (inputModalBtnOpen && inputModal) {
        inputModalBtnOpen.addEventListener('click', () => {
            console.log('Opening input modal'); // ← Для отладки
            openModal(inputModal);
        });
    }
    
    if (inputModalBtnClose && inputModal) {
        inputModalBtnClose.addEventListener('click', () => {
            console.log('Closing input modal'); // ← Для отладки
            closeModal(inputModal);
        });
    }
    
    // === 2. LEGAL MODALS (Impressum, Datenschutz) ===
    const impressumModal = document.getElementById('impressum-modal');
    const datenschutzModal = document.getElementById('datenschutz-modal');
    
    const impressumLink = document.querySelector('a[href="#impressum"]');
    const datenschutzLink = document.querySelector('a[href="#datenschutz"]');
    
    if (impressumLink && impressumModal) {
        impressumLink.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Opening impressum modal'); // ← Для отладки
            openModal(impressumModal);
        });
    }
    
    if (datenschutzLink && datenschutzModal) {
        datenschutzLink.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Opening datenschutz modal'); // ← Для отладки
            openModal(datenschutzModal);
        });
    }
    
    // === 3. COOKIE MODAL (если есть) ===
    const cookieModal = document.querySelector('.cookie-modal-overlay');
    const cookieWidgetBtn = document.getElementById('cookie-widget');
    
    if (cookieWidgetBtn && cookieModal) {
        cookieWidgetBtn.addEventListener('click', () => {
            console.log('Opening cookie modal'); // ← Для отладки
            openModal(cookieModal);
        });
    }
    
    // === 4. УНИВЕРСАЛЬНОЕ ЗАКРЫТИЕ ЧЕРЕЗ КРЕСТИК ===
    const allCloseButtons = document.querySelectorAll(
        '.close-legal, .close-btn, .modal-input__btn-close'
    );
    
    allCloseButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('Close button clicked'); // ← Для отладки
            const modal = this.closest('.legal-modal, .modal-input, .cookie-modal-overlay');
            if (modal) {
                closeModal(modal);
            }
        });
    });
    
    // === 5. ЗАКРЫТИЕ ПРИ КЛИКЕ ВНЕ МОДАЛЬНОГО ОКНА ===
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-input') || 
            e.target.classList.contains('legal-modal') ||
            e.target.classList.contains('cookie-modal-overlay')) {
            console.log('Clicked outside modal'); // ← Для отладки
            closeModal(e.target);
        }
    });
    
    // === 6. ЗАКРЫТИЕ ПО КЛАВИШЕ ESCAPE ===
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            console.log('Escape pressed'); // ← Для отладки
            const openModals = document.querySelectorAll(
                '.modal-input:not(.is-hidden), ' +
                '.legal-modal:not(.is-hidden), ' +
                '.cookie-modal-overlay:not(.is-hidden)'
            );
            openModals.forEach(modal => closeModal(modal));
        }
    });
    
    // === ОТЛАДКА: Покажем найденные элементы ===
    console.log('Input modal:', inputModal);
    console.log('Open button:', inputModalBtnOpen);
    console.log('Close button:', inputModalBtnClose);
    console.log('Impressum modal:', impressumModal);
    console.log('Datenschutz modal:', datenschutzModal);
});
