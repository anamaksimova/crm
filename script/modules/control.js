import {crmTotalPrice,
  addItemData,
  addItemPage,
  renderGoodsFilter,
  renderGoods,
  getElements, URLS} from './service.js';
import {showModalDeleteConfirm,
  modalDeleteConfirmControl} from './modalDeleteConfirm.js';
import {showError, modalErrorControl} from './modalError.js';
const {modalForm,
  table,
  modalInputDiscount,
  modalPrice,
  modalCount,
  modalCategory,
  modalName,
  modalDescription,
  modalUnits, overlay,
} = getElements();
const itemModalId = document.querySelector('.vendor-code__id');
const inputImg = document.querySelector('.modal__file');
const fieldset = document.querySelector('.modal__fieldset');
const preview = document.createElement('img');
preview.style.display = 'none';
fieldset.append(preview);
preview.classList.add('preview', 'image-container');
const fileError = document.createElement('p');
const closeModal = () => {
  overlay.classList.remove('active');
  preview.style.display = 'none';
  fileError.remove();
  modalForm.reset();
};

const searchInput = document.querySelector('.panel__input');
searchInput.addEventListener('change', (e) => {
  setTimeout(() => {
    renderGoodsFilter(searchInput.value, table);
  }, 300);
});


export const modalControl = (modalForm, modalCheckboxDiscount, btnAddGoods,
    overlay, modalPrice, modalCount, table, modalInputDiscount) => {
  btnAddGoods.addEventListener('click', () => {
    overlay.classList.add('active');
    itemModalId.textContent = '';
    document.querySelector('.modal__total-price').textContent = crmTotalPrice();
  });

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
  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('loadend', () => {
      resolve(reader.result);
    });
    reader.addEventListener('error', err => {
      reject(err);
    });
    reader.readAsDataURL(file);
  });
  modalForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const target = e.target;
    const formData = new FormData(target);

    const newItem = Object.fromEntries(formData);
    newItem.image = await toBase64(newItem.image);

    if (Number(itemModalId.textContent) > 0) {
      const id = await fetchEdit(itemModalId.textContent, newItem)
          .then((data) => {
            if (data.ok) {
              while (table.firstChild) {
                table.removeChild(table.firstChild);
              }
              renderGoods(table);
            } else {
              modalErrorControl();
              showError(data.status, data.statusText);
            }
          },
          );
    } else {
      const {id, fetchPOST} = await addItemData(newItem);
      if (fetchPOST.ok) {
        newItem.id = id;
        addItemPage(newItem, table);
      } else {
        modalErrorControl();
        showError(fetchPOST.status, fetchPOST.statusText);
      }
    }

    crmTotalPrice();
    modalForm.reset();
    closeModal();
  });


  modalForm.addEventListener('change', e => {
    if (e.target === modalPrice || e.target === modalCount) {
      document.querySelector('.modal__total-price').textContent =
    crmTotalPrice() + modalCount.value * modalPrice.value;
    }
    if (e.target === inputImg) {
      fileError.remove();
      if (inputImg.files[0].size <= 1000000) {
        preview.style.display = '';

        if (!fieldset.lastElementChild.classList.contains('preview') &&
      inputImg.files.length > 0) {
          const src = URL.createObjectURL(inputImg.files[0]);
          preview.src = src;
          preview.style.display = '';
        } else if (fieldset.lastElementChild.classList.contains('preview') &&
      inputImg.files.length > 0) {
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
const fetchDelete = async (id) => {
  const answer = await fetch(`${URLS}api/goods/${id}`, {
    method: 'DELETE',
  });
};
const modalEdit = async (id) => {
  const response = await fetch(`${URLS}api/goods/${id}`);
  const element = await response.json();

  modalInputDiscount.value = element.discount;
  modalPrice.value = element.price;
  modalCount.value = element.count;
  modalCategory.value = element.category;
  modalName.value = element.title;
  modalUnits.value = element.units;
  modalDescription.value = element.description;
  itemModalId.textContent = `${id}`;
  preview.style.display = '';
  preview.src =`${URLS}${element.image}/`;
};
const fetchEdit = async (id, item) => {
  const answer = await fetch(`${URLS}api/goods/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      title: item.title,
      price: item.price,
      description: item.description,
      category: item.category,
      discount: item.discount,
      count: item.count,
      units: item.units,
      image: item.image,
    }),
    headers: {

    },
  });
  return answer;
};

export const tableControl = async (table) => {
  table.addEventListener('click', async (e) => {
    if (e.target.closest('.table__btn_del')) {
      modalDeleteConfirmControl();
      const confirm = await showModalDeleteConfirm();

      const id = +e.target.closest('.tr').children[1].dataset.id;
      if (confirm) {
        fetchDelete(id)
            .then(() => {
              while (table.firstChild) {
                table.removeChild(table.firstChild);
              }
              renderGoods(table);
            },
            );
      }
      crmTotalPrice();
    }

    if (e.target.closest('.table__btn_pic')) {
      const urlPhoto = `${URLS}${e.target.dataset.pic}/`;
      const win = open(urlPhoto, 'photo', `popup, width=800, height=600, 
       top=${screen.height / 2 - 300}, left=${screen.width / 2 - 400}`);
    }

    if (e.target.closest('.table__btn_edit')) {
      const {
        overlay,
      } = getElements();
      overlay.classList.add('active');
      const editId = +e.target.closest('.tr').children[1].dataset.id;

      modalEdit(editId);
    }
  });
};
