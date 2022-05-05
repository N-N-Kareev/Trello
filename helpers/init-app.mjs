import { newTable } from '../models/table.mjs';
import { newCard } from '../models/card.mjs';
import { tableArray } from '../store/table.mjs';
import { cardsArray } from '../store/card.mjs';

export const initApp = () => {
  let tables = localStorage.getItem('tables');
  if (!tables) {
    return;
  }

  let cards = localStorage.getItem('cards');
  if (cards) {
    cards = JSON.parse(cards);
  }

  tables = JSON.parse(tables);
  tables.forEach(async (table) => {
    const dropZone = await newTable(table.id);
    if (table.cards.length) {
      table.cards.forEach(cardId => {
        const cardObject = cards.find(card => card.id === cardId);
        newCard(dropZone, table.id, cardObject);
      });
    }
  });

  tableArray.push(...tables);
  if (cards) {
    cardsArray.push(...cards);
  }
}
//--Функция для рендера страници из Locale Storage.
