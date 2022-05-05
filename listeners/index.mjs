import { cardsArray } from '../store/card.mjs';
import { tableArray } from '../store/table.mjs';
import { findParentContainer } from '../helpers/index.mjs';


export const initCardListeners = (id) => {
  setTimeout(() => {
    const delCardButton = document.querySelector(`#${id} .del-card`);
    const dlgMenu = document.querySelector('dialog');
    const closeBtn = document.querySelector('dialog .closeBtn');
    const saveBtn = document.querySelector('dialog .save');
    const cardElement = document.getElementById(`${id}`);

    cardElement.addEventListener('dblclick', () => {
      const cardName = document.querySelector(`#${id} .text-card`)
      const input = document.querySelector('dialog #nameDo');
      input.value = cardName.textContent;
      input.dataset.cardId = cardElement.id;
      dlgMenu.showModal();
    });

    cardElement.addEventListener('click', (e) => e.preventDefault());
    delCardButton.addEventListener('dblclick', (e) => e.preventDefault());
    delCardButton.addEventListener('click', (e) => {
      const cardElement = e.target.parentElement;

      const cardDelIndex = cardsArray.findIndex((card) => cardElement.id === card.id);
      cardsArray.splice(cardDelIndex, 1);

      localStorage.setItem('cards', JSON.stringify(cardsArray));

      tableArray.forEach(tableObj => {
        const indexCard = tableObj.cards.findIndex(cardId => cardElement.id === cardId);
        if (indexCard >= 0) {
          tableObj.cards.splice(indexCard, 1)
        }
      })

      localStorage.setItem('tables', JSON.stringify(tableArray));
      cardElement.remove();
    })


    saveBtn.onclick = () => {
      const input = document.querySelector('dialog #nameDo');
      const card2 = document.querySelector(`#${id} .text-card`)
      card2.textContent = input.value;

      cardsArray.forEach((card) => {
        if (card.id === input.dataset.cardId) {
          card.text = input.value;
        }
      })

      localStorage.setItem('cards', JSON.stringify(cardsArray));
      dlgMenu.close();
    }
    //--Функциия вызова диалогового окна при нажатии на карточки для редоктирования её значчения 

    closeBtn.onclick = () => {
      const menuOut = document.querySelector('dialog.mini-menu');
      const yesOut = document.querySelector('dialog .Yes');
      const noOut = document.querySelector('dialog .No');

      menuOut.showModal();
      document.getElementById("textElement").value = "";

      yesOut.onclick = () => {
        menuOut.close();
        dlgMenu.close();
      };

      noOut.onclick = () => {
        menuOut.close();
      };
    };
    //-- Функция для отмены редактирования карточки при нажатии на кнопку закрытия menuOut
    cardElement.addEventListener('dragstart', onDragStart);
  }, 16);
};

export const onDragStart = (event) => {
  event
    .dataTransfer
    .setData('text/plain', event.target.id);
}

export const onDragOver = (event) => {
  event.preventDefault();
}

export const onDrop = (event) => {
  event.preventDefault();
  const tableElement = event.target.parentElement;
  const id = event
    .dataTransfer
    .getData('text');
  const cardElement = document.getElementById(`${id}`);
  const dropZone = findParentContainer(event.target, 'do-list');

  dropZone.appendChild(cardElement);
  event
    .dataTransfer
    .clearData();

  const card = cardsArray.find((card) => cardElement.id === card.id);
  tableArray.forEach(tableObj => {
    const index = tableObj.cards.findIndex(cardId => card.id === cardId);
    if (index >= 0) {
      tableObj.cards.splice(index, 1);
    }

    if (tableObj.id === tableElement.id) {
      tableObj.cards.push(card.id);
    }
  });

  card.tableId = tableElement.id;

  localStorage.setItem('tables', JSON.stringify(tableArray))
  localStorage.setItem('cards', JSON.stringify(cardsArray));

}
//--Функция навеживания DragAndDrop на карточку при её создании 
