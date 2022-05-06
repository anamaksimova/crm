import {createRow} from './createElements.js';
export const goods = [
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

export const crmTotalPrice = () => {
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

export const getElements = () => {
  document.querySelector('#name').setAttribute('name', 'title');
  const modalInputDiscount = document.querySelector('.modal__input_discount');
  modalInputDiscount.setAttribute('type', 'number');
  document.querySelector('#count').setAttribute('type', 'number');
  document.querySelector('#price').setAttribute('type', 'number');
  const inputs = document.querySelectorAll('.modal__input');
  for (const input of inputs) {
    input.setAttribute('required', '');
  }

  const modalForm = document.querySelector('.modal__form');
  const modalCheckboxDiscount = document.querySelector('.modal__checkbox');
  const btnAddGoods = document.querySelector('.panel__add-goods');
  const overlay = document.querySelector('.overlay');
  const modalPrice = document.querySelector('#price');
  const modalCount = document.querySelector('#count');
  const table = document.querySelector('.table__body');

  return {
    modalInputDiscount,
    modalForm,
    modalCheckboxDiscount,
    btnAddGoods,
    overlay,
    modalPrice,
    modalCount,
    table,
  };
};


export const addItemData = (item) => {
  goods.push(item);
  console.log('goods: ', goods);
};

export const addItemPage = (item, table) => {
  table.append(createRow(item));
};

export const renderGoods = (data, table) => {
  const rows = [];
  data.forEach(element => {
    const row = createRow(element);
    table.append(row);
    rows.push(row);
  });

  crmTotalPrice();
  return rows;
};
