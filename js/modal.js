document.addEventListener("DOMContentLoaded", function() {

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

    const closeWithRotation = (btn, modal) => {
        btn.classList.add('is-rotating');
        setTimeout(() => {
            closeModal(modal);
            btn.classList.remove('is-rotating');
        }, 280);
    };

    // === 1. INPUT FORM MODAL ===
    const inputModal = document.querySelector('.modal-input');
    const inputModalBtnClose = inputModal?.querySelector('.modal-input__btn-close');

    if (inputModal) {
        document.querySelectorAll('.modal-btn-open').forEach(btn => {
            btn.addEventListener('click', () => openModal(inputModal));
        });
    }

    if (inputModalBtnClose && inputModal) {
        inputModalBtnClose.addEventListener('click', () => closeWithRotation(inputModalBtnClose, inputModal));
    }

    // === 2. LEGAL MODALS (Impressum, Datenschutz) ===
    const impressumModal = document.getElementById('impressum-modal');
    const datenschutzModal = document.getElementById('datenschutz-modal');

    if (impressumModal) {
        document.querySelectorAll('a[href="#impressum"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                openModal(impressumModal);
            });
        });
    }

    if (datenschutzModal) {
        document.querySelectorAll('a[href="#datenschutz"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                openModal(datenschutzModal);
            });
        });
    }

    // === 3. COOKIE MODAL ===
    const cookieModal = document.querySelector('.cookie-modal-overlay');
    const cookieWidgetBtn = document.getElementById('cookie-widget');

    if (cookieWidgetBtn && cookieModal) {
        cookieWidgetBtn.addEventListener('click', () => openModal(cookieModal));
    }

    // Cookie accept buttons also close the modal
    ['accept-all', 'accept-necessary', 'save-selection'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn && cookieModal) {
            btn.addEventListener('click', () => closeModal(cookieModal));
        }
    });

    // === 4. CLOSE BUTTONS (with rotation animation) ===
    document.querySelectorAll('.close-legal, .close-btn, .modal-input__btn-close').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.legal-modal, .modal-input, .cookie-modal-overlay');
            if (modal) {
                closeWithRotation(this, modal);
            }
        });
    });

    // === 5. CLOSE ON BACKDROP CLICK ===
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-input') ||
            e.target.classList.contains('legal-modal') ||
            e.target.classList.contains('cookie-modal-overlay')) {
            closeModal(e.target);
        }
    });

    // === 6. CLOSE ON ESCAPE ===
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll(
                '.modal-input:not(.is-hidden), ' +
                '.legal-modal:not(.is-hidden), ' +
                '.cookie-modal-overlay:not(.is-hidden)'
            ).forEach(modal => closeModal(modal));
        }
    });
});
