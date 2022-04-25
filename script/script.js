'use scrict';

const goods = [
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

// const modal_form = document.querySelector('.modal__form');
// console.log('modal_form: ', modal_form);

// const modal_checkbox_discount = document.querySelector('.modal__checkbox');
// console.log('modal_checkbox: ', modal_checkbox);

// const modal_input_discount = document.querySelector('.modal__input_discount');
// console.log('modal_input_discount: ', modal_input_discount);

const createRow = ({id, title, price, category,
  discont, count, units, images}) => {
  const tr = document.createElement('tr');
  const tdId = document.createElement('td');
  tdId.classList.add('table__cell');
  tdId.textContent = id;

  const tdName = document.createElement('td');
  tdName.classList.add('table__cell', 'table__cell_left', 'table__cell_name');
  tdName.setAttribute('data-id', `${id}`);
  const span = document.createElement('span');
  span.classList.add('table__cell-id');
  span.textContent = `id: ${id}`;
  tdName.textContent = title;
  tdName.append(span);


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
  tdPriceOne.textContent = price;

  const tdPriceTotal = document.createElement('td');
  tdPriceTotal.classList.add('table__cell');
  tdPriceTotal.textContent = price * count;


  const tdBtns = document.createElement('td');
  tdBtns.classList.add('table__cell', 'table__cell_btn-wrapper');
  const btnPic = document.createElement('button');
  btnPic.textContent = images;
  btnPic.classList.add('table__btn', 'table__btn_pic');
  const btnEdit = document.createElement('button');
  btnEdit.classList.add('table__btn', 'table__btn_edit');
  const btnDel = document.createElement('button');
  btnDel.classList.add('table__btn', 'table__btn_del');
  tdBtns.append(btnPic, btnPic, btnDel);


  tr.append(tdId, tdName, tdCategory, tdQuantityName, tdNumberOfItems,
      tdPriceOne, tdPriceTotal, tdBtns);

  return tr;
};

const renderGoods = (data) => {
  const table = document.createElement('table');
  const rows = data.map(createRow);
  table.append(...rows);

  return table;
};

console.log(renderGoods(goods));

