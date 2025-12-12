document.addEventListener('DOMContentLoaded', function() {
    // Находим все необходимые элементы
    const menuContainer = document.getElementById('quick-menu-container');
    const toggleBtn = document.getElementById('toggle-btn');
    const contactPanel = document.getElementById('contact-panel');
    const openContactBtn = document.getElementById('open-contact-btn');
    const closeContactBtn = document.querySelector('#contact-panel .close-btn');
    const socialPanel = document.getElementById('social-panel');
    const openSocialBtn = document.getElementById('open-social-btn');
    const closeSocialBtn = document.querySelector('#social-panel .close-btn');

    // Логика для Quick Menu
    if (menuContainer && toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            if (menuContainer.classList.contains('is-open')) {
                if(contactPanel) contactPanel.classList.remove('is-visible');
                if(socialPanel) socialPanel.classList.remove('is-visible');
            }
            menuContainer.classList.toggle('is-open');
        });
    }

    // Логика для открытия панели контактов
    if (contactPanel && openContactBtn) {
        openContactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if(socialPanel) socialPanel.classList.remove('is-visible');
            contactPanel.classList.add('is-visible');
            menuContainer.classList.add('is-open');
        });
    }

    // Логика для открытия панели соцсетей
    if (socialPanel && openSocialBtn) {
        openSocialBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            if(contactPanel) contactPanel.classList.remove('is-visible');
            socialPanel.classList.add('is-visible');
            menuContainer.classList.add('is-open');
        });
    }

    // Логика для закрытия панелей (крестики)
    if (contactPanel && closeContactBtn) {
        closeContactBtn.addEventListener('click', () => contactPanel.classList.remove('is-visible'));
    }
    if (socialPanel && closeSocialBtn) {
        closeSocialBtn.addEventListener('click', () => socialPanel.classList.remove('is-visible'));
    }
});
