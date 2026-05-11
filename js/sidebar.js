document.addEventListener('DOMContentLoaded', function() {
    const menuContainer = document.getElementById('quick-menu-container');
    const toggleBtn = document.getElementById('toggle-btn');
    const contactSocialPanel = document.getElementById('contact-social-panel');
    const openContactSocialBtn = document.getElementById('open-contact-social-btn');
    const closeContactSocialBtn = document.getElementById('close-contact-social-btn');

    // Toggle sidebar
    if (menuContainer && toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (menuContainer.classList.contains('is-open')) {
                if (contactSocialPanel) contactSocialPanel.classList.remove('is-visible');
            }
            menuContainer.classList.toggle('is-open');
        });
    }

    // Open combined contact+social panel
    if (contactSocialPanel && openContactSocialBtn) {
        openContactSocialBtn.addEventListener('click', (e) => {
            e.preventDefault();
            contactSocialPanel.classList.add('is-visible');
            if (menuContainer) menuContainer.classList.add('is-open');
        });
    }

    // Close combined panel via × button (with rotation animation)
    if (contactSocialPanel && closeContactSocialBtn) {
        closeContactSocialBtn.addEventListener('click', () => {
            closeContactSocialBtn.classList.add('is-rotating');
            setTimeout(() => {
                contactSocialPanel.classList.remove('is-visible');
                closeContactSocialBtn.classList.remove('is-rotating');
            }, 280);
        });
    }

    // Nav links: close sidebar on click
    document.querySelectorAll('.menu-nav-link[href^="#"]:not([id])').forEach(link => {
        link.addEventListener('click', () => {
            if (menuContainer) menuContainer.classList.remove('is-open');
            if (contactSocialPanel) contactSocialPanel.classList.remove('is-visible');
        });
    });
});
