'use scrict';

let goods = [
  {
    id: 1,
    title: 'Смартфон Xiaomi 11T 8/128GB',
    price: 27000,
    category: 'mobile-phone',
    discont: false,
    count: 3,
    units: 'шт',
    images: {
      small: 'img/smrtxiaomi11t-m.jpg',
      big: 'img/smrtxiaomi11t-b.jpg',
    },
  },
  {
    id: 2,
    title: 'Радиоуправляемый автомобиль Cheetan',
    price: 4000,
    category: 'toys',
    discont: 5,
    count: 1,
    units: 'шт',
    images: {
      small: 'img/cheetancar-m.jpg',
      big: 'img/cheetancar-b.jpg',
    },
  },
];
// const modal_title = document.querySelector('.modal__title');
// console.log('modal_title: ', modal_title);
const crm_total_price = () => {
  let totalPrice = 0;
  const trs = document.querySelectorAll('tr');
  console.log('trs: ', trs);
  for (let tr = 1; tr < trs.length; tr++) {
    const count = trs[tr].children[4].textContent;
    const price = trs[tr].children[5].textContent.slice(1);
    totalPrice += count * price;
  }
  document.querySelector('.crm__total-price').textContent = `$ ${totalPrice}`;
  return totalPrice;
};

const modalForm = document.querySelector('.modal__form');


const modalCheckboxDiscount = document.querySelector('.modal__checkbox');

document.querySelector('#name').setAttribute('name', 'title');
const modalInputDiscount = document.querySelector('.modal__input_discount');
modalInputDiscount.setAttribute('type', 'number');
document.querySelector('#count').setAttribute('type', 'number');
document.querySelector('#price').setAttribute('type', 'number');
const inputs = document.querySelectorAll('.modal__input');
for (const input of inputs) {
  input.setAttribute('required', '');
}


const createRow = ({id, title, price, category,
  discont, count, units, images}) => {
  const tr = document.createElement('tr');
  tr.classList.add('tr');
  const tdId = document.createElement('td');
  tdId.classList.add('table__cell');
  tdId.textContent = id;

  const tdName = document.createElement('td');
  tdName.classList.add('table__cell', 'table__cell_left', 'table__cell_name');
  tdName.setAttribute('data-id', `${id}`);
  const span = document.createElement('span');
  span.classList.add('table__cell-id');
  span.textContent = `id: ${id}`;
  tdName.insertAdjacentText('beforeend', title);
  // tdName.textContent = title;
  tdName.insertAdjacentElement('afterbegin', span);


  const tdCategory = document.createElement('td');
  tdCategory.classList.add('table__cell', 'table__cell_left');
  tdCategory.textContent = category;

  const tdQuantityName = document.createElement('td');
  tdQuantityName.classList.add('table__cell');
  tdQuantityName.textContent = units;

  const tdNumberOfItems = document.createElement('td');
  tdNumberOfItems.classList.add('table__cell');
  tdNumberOfItems.textContent = count;

  const tdPriceOne = document.createElement('td');
  tdPriceOne.classList.add('table__cell');
  tdPriceOne.textContent = `$${price}`;

  const tdPriceTotal = document.createElement('td');
  tdPriceTotal.classList.add('table__cell');
  tdPriceTotal.textContent = `$${price * count}`;


  const tdBtns = document.createElement('td');
  tdBtns.classList.add('table__cell', 'table__cell_btn-wrapper');
  const btnPic = document.createElement('button');

  btnPic.classList.add('table__btn', 'table__btn_pic');
  const btnEdit = document.createElement('button');
  btnEdit.classList.add('table__btn', 'table__btn_edit');
  const btnDel = document.createElement('button');
  btnDel.classList.add('table__btn', 'table__btn_del');
  tdBtns.append(btnPic, btnEdit, btnDel);


  tr.append(tdId, tdName, tdCategory, tdQuantityName, tdNumberOfItems,
      tdPriceOne, tdPriceTotal, tdBtns);

  return tr;
};

const table = document.querySelector('.table__body');
const renderGoods = (data) => {
  const rows = data.map(createRow);
  table.append(...rows);
  crm_total_price();
  return rows;
};

renderGoods(goods);


const btnAddGoods = document.querySelector('.panel__add-goods');
const overlay = document.querySelector('.overlay');
const form = document.querySelector('.overlay__modal');
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
  document.querySelector('.modal__total-price').textContent = crm_total_price();
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

table.addEventListener('click', e => {
  if (e.target.closest('.table__btn_del')) {
    [...goods] = goods.filter(
        i => i.id != e.target.closest('.tr').firstElementChild.textContent);

    e.target.closest('.tr').remove();
    crm_total_price();
    console.log(goods);
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

const addItemData = (item) => {
  goods.push(item);
  console.log('goods: ', goods);
};

const addItemPage = (item) => {
  table.append(createRow(item));
};
modalForm.addEventListener('submit', e => {
  e.preventDefault();
  const target = e.target;
  const formData = new FormData(target);
  const newItem = Object.fromEntries(formData);
  newItem.id = generatedId;
  console.log('newItem: ', newItem);

  addItemData(newItem);
  addItemPage(newItem);
  crm_total_price();
  modalForm.reset();
  closeModal();
});

const modalPrice = document.querySelector('#price');
const modalCount = document.querySelector('#count');
modalForm.addEventListener('change', e => {
  if (e.target === modalPrice || e.target === modalCount) {
    document.querySelector('.modal__total-price').textContent =
    crm_total_price() + modalCount.value * modalPrice.value;
  }
});

