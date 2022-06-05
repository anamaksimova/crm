const modalDeleteConfirmOverlay = document.createElement('div');
modalDeleteConfirmOverlay.classList.add('overlay', 'delete_confirm');
modalDeleteConfirmOverlay.insertAdjacentHTML('beforeend', `
<div class="overlay__modal modal">
  <button class="modal__close">
    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="m2 2 20 20M2 22 22 2" stroke="currentColor" stroke-width="3" stroke-linecap="round" /></svg>
  </button>


      <button  class="modal__submit modal_confirm_delete" type="button">Удалить товар</button>
      <button  class="modal__submit modal_reject_delete"  type="button">Отменить удаление</button>
 
</div>
`);


export const showModalDeleteConfirm = () => {
  document.body.append(modalDeleteConfirmOverlay);
  modalDeleteConfirmOverlay.classList.add('active');
  return new Promise(resolve => {
    document.querySelector('.modal_confirm_delete').addEventListener('click', () => {
      modalDeleteConfirmOverlay.remove();
      resolve(true);
    });
    document.querySelector('.modal_reject_delete').addEventListener('click', () => {
      modalDeleteConfirmOverlay.remove();
      resolve(false);
    });
  });
};
export const modalDeleteConfirmControl = () => {
  modalDeleteConfirmOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target === modalDeleteConfirmOverlay ||
  target.closest('.modal__close')) {
      modalDeleteConfirmOverlay.remove();
    }
  });
};
