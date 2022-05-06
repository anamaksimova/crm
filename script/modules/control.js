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


  modalForm.addEventListener('change', e => {
    if (e.target === modalPrice || e.target === modalCount) {
      document.querySelector('.modal__total-price').textContent =
    crmTotalPrice() + modalCount.value * modalPrice.value;
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
  });
};
