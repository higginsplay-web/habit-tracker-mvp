// Створення модального вікна
const addLink = document.querySelector('.menu a:nth-child(2)');
const container = document.querySelector('.container');

// Створюємо HTML модалки
const modalHTML = `
  <div id="modal-overlay" class="overlay"></div>
  <div id="modal" class="modal">
    <h2>Нове завдання</h2>
    <input type="text" id="task-title" placeholder="Заголовок" />
    <input type="text" id="task-desc" placeholder="Опис" />
    <small class="error hidden" id="error-msg">Заповніть обидва поля</small>
    <button id="save-task" class="btn primary">Зберегти</button>
    <button id="cancel-task" class="btn">Скасувати</button>
  </div>
`;
container.insertAdjacentHTML('beforeend', modalHTML);

// Елементи модалки
const modal = document.querySelector('#modal');
const modalOverlay = document.querySelector('#modal-overlay');
const titleInput = document.querySelector('#task-title');
const descInput = document.querySelector('#task-desc');
const errorMsg = document.querySelector('#error-msg');
const saveBtn = document.querySelector('#save-task');
const cancelBtn = document.querySelector('#cancel-task');
const cards = document.querySelector('.cards');

// Відкрити модалку
addLink.addEventListener('click', e => {
  e.preventDefault();
  modal.classList.remove('hidden');
  modalOverlay.classList.remove('hidden');
  document.body.classList.add('no-scroll');
  titleInput.focus();
});

// Закрити модалку
function closeModal() {
  modal.classList.add('hidden');
  modalOverlay.classList.add('hidden');
  document.body.classList.remove('no-scroll');
  errorMsg.classList.add('hidden');
  titleInput.value = '';
  descInput.value = '';
}

cancelBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// Зберегти завдання
saveBtn.addEventListener('click', () => {
  const title = titleInput.value.trim();
  const desc = descInput.value.trim();

  if (title === '' || desc === '') {
    errorMsg.classList.remove('hidden');
  } else {
    const newCard = document.createElement('article');
    newCard.className = 'card';
    newCard.innerHTML = `
      <h3>${title}</h3>
      <p>${desc}</p>
      <button class="btn primary">Деталі</button>
    `;
    cards.appendChild(newCard);
    closeModal();
  }
});

// Обробка кнопок «Деталі» та «Редагувати»
cards.addEventListener('click', e => {
  if (e.target.classList.contains('primary')) {
    alert('Деталі завдання:\n' + e.target.parentElement.querySelector('p').textContent);
  } else if (e.target.textContent === 'Редагувати') {
    const card = e.target.parentElement;
    const currentTitle = card.querySelector('h3').textContent;
    const currentDesc = card.querySelector('p').textContent;

    titleInput.value = currentTitle;
    descInput.value = currentDesc;
    modal.classList.remove('hidden');
    modalOverlay.classList.remove('hidden');
    document.body.classList.add('no-scroll');

    saveBtn.onclick = () => {
      const newTitle = titleInput.value.trim();
      const newDesc = descInput.value.trim();

      if (newTitle === '' || newDesc === '') {
        errorMsg.classList.remove('hidden');
      } else {
        card.querySelector('h3').textContent = newTitle;
        card.querySelector('p').textContent = newDesc;
        closeModal();
        saveBtn.onclick = null; // повернути стандартну поведінку
      }
    };
  }
});
