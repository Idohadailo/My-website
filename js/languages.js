// Находим на странице кнопку и список языков
const langBtn = document.querySelector('.header__lang-btn');
const langList = document.querySelector('.header__lang-list');

// Добавляем "слушателя" кликов на кнопку
langBtn.addEventListener('click', function() {
  // При каждом клике добавляем или убираем класс 'is-open' у списка
  langList.classList.toggle('is-open');
});

// Бонус: закрываем список, если пользователь кликнул в любом другом месте экрана
document.addEventListener('click', function(event) {
  // Проверяем, был ли клик ВНЕ всего блока переключателя
  const isClickInside = langBtn.contains(event.target) || langList.contains(event.target);

  if (!isClickInside) {
    // Если клик был снаружи, убираем класс 'is-open', чтобы закрыть список
    langList.classList.remove('is-open');
  }
});
