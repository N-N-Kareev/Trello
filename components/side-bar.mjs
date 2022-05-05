export const openMenu = () => {
  const sideBar = document.querySelector('.side-bar');
  const menuBtn = document.querySelector('.side-menu');

  menuBtn.addEventListener('click', () => {
    sideBar.classList.toggle('side-bar_active');
  })
}
//-- Функция открытия SideBar  по нажатию кнопки 
