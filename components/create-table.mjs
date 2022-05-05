import { newTable } from '../models/table.mjs';

export const initCreateTableListener = () => {
  const createBtn = document.querySelector('.creatTable');
  createBtn.addEventListener('click', () => newTable());
}
//--  Функция создания таблички при нажатии кнопки 
