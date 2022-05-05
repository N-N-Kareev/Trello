export const findParentContainer = (element, className) => {
  if (!element.classList) {
    return findParentContainer(element.parentElement, className);
  }

  if (element.classList.contains(className)) {
    return element;
  }

  if (element.parentElement.classList.contains(className)) {
    return element.parentElement;
  }

  return findParentContainer(element.parentElement, className);
}
//-- Функия проверки родительского элемента для карточки при выполнении DragAndDrop
