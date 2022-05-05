import { tableArray } from '../store/table.mjs';
import { newCard } from './card.mjs';
import { onDrop, onDragOver } from '../listeners/index.mjs';

export const generateTable = (id) => {
  return `
  <li id=${id} class="table" >
      <ul class= "do-list"></ul>
      <button class="create-card">+ Добавить карточку</button>
  </li>`;
}
//-- Генерация таблицы

export const newTable = (tableId) => {
  return new Promise((resolve) => {
    const id = tableId ?? 'a' + window.crypto.randomUUID().replaceAll('-', '');
    const str = generateTable(id);
    const tableBtn = document.getElementById('out');
    //--Генерация id  таблицы
    tableBtn.insertAdjacentHTML('beforebegin', str);
    //-- Вставляем таблицу в рабочее пространство
    const intervalId = setInterval(() => {
      const button = document.querySelector(`#${id} .create-card`);
      if (!button) {
        return;
      }
      clearInterval(intervalId);
      //-- Привязываем кнопку создания карт к таблице по значению id

      const dropZone = document.querySelector(`#${id} .do-list`);
      const table = document.getElementById(`${id}`);
      table.addEventListener('drop', onDrop);
      table.addEventListener('dragover', onDragOver);

      button.addEventListener('click', () => {
        newCard(dropZone, id)
      });

      resolve(dropZone);
    }, 16);
    //-- Определяем зону вставки и навешиваем dragDrop и DragOver на неё

    if (!tableId) {
      tableArray.push({ id, cards: [] });
      localStorage.setItem('tables', JSON.stringify(tableArray));
    }
  });
};