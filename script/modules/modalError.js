const modalErrorOverlay = document.createElement('div');
modalErrorOverlay.classList.add('overlay');
modalErrorOverlay.insertAdjacentHTML('beforeend', `
<div class="overlay__modal error_undefined">
  <button class="modal__close">
    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="m2 2 20 20M2 22 22 2" stroke="currentColor" stroke-width="3" stroke-linecap="round" /></svg>
  </button>

<img class="error_img" src="../img/error.svg"> 
<p class="error_text">Что-то пошло не так</p>
 
</div>
`);


export const showError = (status, statusText) => {
  // document.querySelector('.modal_first').append(modalErrorOverlay);
  document.body.append(modalErrorOverlay);
  modalErrorOverlay.classList.add('active');
  document.querySelector('.error_text').textContent = `${status}: ${statusText}`;
};

export const modalErrorControl = () => {
  modalErrorOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target === modalErrorOverlay ||
    target.closest('.modal__close')) {
      modalErrorOverlay.remove();
    }
  });
};
