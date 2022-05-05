import { cardsArray } from '../store/card.mjs';
import { tableArray } from '../store/table.mjs';
import { initCardListeners } from '../listeners/index.mjs';

export const generateCard = (id, text) => {
  return `
  <li id=${id} draggable="true" class="card">
    <span class="text-card">${text}</span>
    <button class="del-card">✕</button>
  </li> `;
}
//-- Карточки

export const newCard = (tableElement, tableId, cardObject = null) => {
  const id = cardObject?.id ?? 'c' + window.crypto.randomUUID();
  const cardData = {
    id,
    tableId,
    text: cardObject?.text ?? 'Дело',
    priority: cardObject?.priority ?? 'low',
  } // low, medium. high
  //-- Значения карточки которые записываютя в массив для LocalStorage

  const str = generateCard(id, cardData.text);

  tableElement.insertAdjacentHTML('beforeend', str);
  //-- Вставка карточки в ul  таблицы

  console.log('cardObject', cardObject);
  if (!cardObject) {
    cardsArray.push(cardData);
    tableArray.forEach((table) => {
      if (table.id === tableId) {
        table.cards.push(id);
      }
    });
    //-- Записываем значение id table в критерии карточки

    localStorage.setItem('tables', JSON.stringify(tableArray))
    localStorage.setItem('cards', JSON.stringify(cardsArray));
  }

  initCardListeners(id);
}
