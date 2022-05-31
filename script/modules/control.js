import {crmTotalPrice,
  addItemData,
  addItemPage,
  renderGoods} from './service.js';
export const modalControl = (modalForm, modalCheckboxDiscount, btnAddGoods,
    overlay, modalPrice, modalCount, table, modalInputDiscount) => {
  const ids = [];
  let generatedId;
  const generateId = () => {
    console.log('ids: ', ids);
    generatedId = Math.round(Math.random() * (1000000 - 5) + 5);
    console.log('generatedId: ', generatedId);
    if (!ids.includes(generatedId)) {
      ids.push(generatedId);
      console.log('ids: ', ids);

      return generatedId;
    } else {
      generateId();
    }
  };
  btnAddGoods.addEventListener('click', () => {
    overlay.classList.add('active');
    const itemId = document.querySelector('.vendor-code__id');
    const generatedId = generateId();
    itemId.textContent = generatedId;
    document.querySelector('.modal__total-price').textContent = crmTotalPrice();
  });


  const closeModal = () => {
    overlay.classList.remove('active');
    modalForm.reset();
  };

  overlay.addEventListener('click', e => {
    const target = e.target;
    if (target === overlay ||
  target.closest('.modal__close')) {
      closeModal();
    }
  });

  modalCheckboxDiscount.addEventListener('change', e => {
    if (modalCheckboxDiscount.checked === true) {
      modalInputDiscount.removeAttribute('disabled');
      modalInputDiscount.setAttribute('required', '');
    }
    if (modalCheckboxDiscount.checked === false) {
      modalInputDiscount.removeAttribute('required');
      modalInputDiscount.setAttribute('disabled', '');
      modalInputDiscount.value = '';
    }
  });

  modalForm.addEventListener('submit', e => {
    e.preventDefault();
    const target = e.target;
    const formData = new FormData(target);
    const newItem = Object.fromEntries(formData);
    newItem.id = generatedId;
    console.log('newItem: ', newItem);

    addItemData(newItem);
    addItemPage(newItem, table);
    crmTotalPrice();
    modalForm.reset();
    closeModal();
  });


  const inputImg = document.querySelector('.modal__file');
  const fieldset = document.querySelector('.modal__fieldset');
  const preview = document.createElement('img');
  preview.classList.add('preview');
  const fileError = document.createElement('p');
  modalForm.addEventListener('change', e => {
    if (e.target === modalPrice || e.target === modalCount) {
      document.querySelector('.modal__total-price').textContent =
    crmTotalPrice() + modalCount.value * modalPrice.value;
    }
    if (e.target === inputImg) {
      if (inputImg.files[0].size <= 1000) {
        fileError.remove();
        if (!fieldset.lastElementChild.classList.contains('preview') &&
      inputImg.files.length > 0) {
          console.log('size', inputImg.files[0].size);
          const src = URL.createObjectURL(inputImg.files[0]);
          preview.src = src;
          fieldset.append(preview);
        } else if (fieldset.lastElementChild.classList.contains('preview') &&
      inputImg.files.length > 0) {
          console.log('size', inputImg.files[0].size);
          const src = URL.createObjectURL(inputImg.files[0]);
          preview.src = src;
        }
      } else {
        preview.remove();
        fileError.style.color = 'red';
        fileError.textContent = 'ИЗОБРАЖЕНИЕ НЕ ДОЛЖНО ПРЕВЫШАТЬ РАЗМЕР 1 МБ';
        fieldset.append(fileError);
      }
    }
  });
};

export const tableControl = (goods, table) => {
  table.addEventListener('click', e => {
    if (e.target.closest('.table__btn_del')) {
      for (let index = 0; index < goods.length; index++) {
        const element = goods[index];
        if (element.id === +e.target.closest('.tr').children[1].dataset.id) {
          goods.splice(index, 1);
          while (table.firstChild) {
            table.removeChild(table.firstChild);
          }
          renderGoods(goods, table);
        }
      }

      crmTotalPrice();
    }

    if (e.target.closest('.table__btn_pic')) {
      const urlPhoto = e.target.dataset.pic;
      const win = open(urlPhoto, 'photo', `popup, width=800, height=600, 
       top=${screen.height / 2 - 300}, left=${screen.width / 2 - 400}`);
    }
  });
};
