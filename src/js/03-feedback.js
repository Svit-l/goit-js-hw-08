import throttle from 'lodash.throttle';

// Отслеживай на форме событие input,
// и каждый раз записывай в локальное хранилище объект с полями email и message,
//   в которых сохраняй текущие значения полей формы.
//   Пусть ключом для хранилища будет строка "feedback-form-state".
// Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд.
// Для этого добавь в проект и используй библиотеку lodash.throttle.

const feedbackForm = document.querySelector('.feedback-form');
const LOCALSTORAGE_KEY = 'feedback-form-state';

feedbackForm.addEventListener(
  'input',
  throttle(evt => {
    let persistedFilters = localStorage.getItem(LOCALSTORAGE_KEY);
    persistedFilters = persistedFilters ? JSON.parse(persistedFilters) : {};
    persistedFilters[evt.target.name] = evt.target.value;
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(persistedFilters));
    console.log(persistedFilters);
  }, 500),
);

// При загрузке страницы проверяй состояние хранилища,
// и если там есть сохраненные данные, заполняй ими поля формы.
// В противном случае поля должны быть пустыми.

function initForm() {
  let persistedFilters = localStorage.getItem(LOCALSTORAGE_KEY);

  if (persistedFilters) {
    persistedFilters = JSON.parse(persistedFilters);
    Object.entries(persistedFilters).forEach(([name, value]) => {
      feedbackForm.elements[name].value = value;
    });
  }
}

initForm();

feedbackForm.addEventListener('submit', evt => {
  evt.preventDefault();
  // проверка, заполнен ли email
  const inputName = feedbackForm.email.value.trim();
  if (inputName !== '') {
    console.log('Отправляем форму');

    // выводи объект с полями email, message и текущими их значениями в консоль.
    let persistedFilters = localStorage.getItem(LOCALSTORAGE_KEY);
    persistedFilters = JSON.parse(persistedFilters);
    console.log(persistedFilters);

    // При сабмите формы очищай хранилище и поля формы,
    evt.currentTarget.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);
    return;
  }
  return;
});
