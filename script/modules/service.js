import {createRow} from './createElements.js';

export const crmTotalPrice = () => {
  let totalPrice = 0;
  const trs = document.querySelectorAll('tr');
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
  const modalCategory = document.querySelector('#category');
  const modalName = document.querySelector('#name');
  const modalDescription = document.querySelector('#description');
  const modalUnits = document.querySelector('#units');


  return {
    modalInputDiscount,
    modalForm,
    modalCheckboxDiscount,
    btnAddGoods,
    overlay,
    modalPrice,
    modalCount,
    table,
    modalCategory,
    modalName,
    modalDescription,
    modalUnits,
  };
};


export const addItemData = async (item) => {
  const fetchPOST = await fetch('http://localhost:3001/api/goods', {
    method: 'POST',
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
      'Content-Type': 'application/JSON',
    },
  });
  const response = await fetchPOST.json();
  const id = response.id;
  return {id, fetchPOST};
};

export const addItemPage = (item, table) => {
  table.append(createRow(item));
};
export const loadGoods = async () => {
  const result = await fetch('http://localhost:3001/api/goods');
  const goods = await result.json();
  return goods;
};
export const renderGoods = async (table) => {
  const data = await loadGoods();
  const rows = [];
  data.forEach(element => {
    const row = createRow(element);
    table.append(row);
    rows.push(row);
  });

  crmTotalPrice();
  return rows;
};
export const renderGoodsFilter = async (search, table) => {
  
  const data = await loadGoods();
  console.log('data: ', data);
  const rows = [];
  const reg = search.toLowerCase();
  if (reg === '') {
    table.textContent = '';
    renderGoods(table);
  } else {
    table.textContent = '';
    data.forEach(element => {
      const title = element.title.toLowerCase();
      const category = element.category.toLowerCase();
      if (title.match(reg) || category.match(reg)) {
        const row = createRow(element);
        table.append(row);
        rows.push(row);
      }
    });
  }

  crmTotalPrice();
  return rows;
};

export const loadCategories = async () => {
  const result = await fetch('http://localhost:3001/api/category');
  const categories = await result.json();
  return categories;
};
export const categoryList = async () => {
  const {modalCategory} = getElements();
  modalCategory.setAttribute('list', 'category-list');

  document.querySelector('.modal__label_category').insertAdjacentHTML(
      'afterend', `<datalist id="category-list">
    </datalist>`);
  const datalist = document.querySelector('#category-list');
  const data = await loadCategories();
  data.forEach(element => {
    datalist.insertAdjacentHTML(`beforeend`, `
   <option value=${element}></option>`);
  });
};
