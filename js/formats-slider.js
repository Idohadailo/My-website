const swiper = new Swiper('.swiper-container', {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 12,
  breakpoints: {
    768: {
      slidesPerView: 1.2,
      spaceBetween: 20,
    },
    1280: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
  },
  pagination: {
    el: '.pagination',
    bulletClass: 'pagination__button',
    bulletActiveClass: 'pagination__button--active',
  },
  navigation: {
    nextEl: '.carousel-button.next',
    prevEl: '.carousel-button.prev',
  },
});
