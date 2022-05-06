export const createRow = ({id, title, price, category,
  discont, count, units, images}) => {
  const tr = document.createElement('tr');
  tr.classList.add('tr');
  const tdId = document.createElement('td');
  tdId.classList.add('table__cell');
  tdId.textContent = document.querySelectorAll('tr').length;

  console.log('tdId.textContent: ', tdId.textContent);

  const tdName = document.createElement('td');
  tdName.classList.add('table__cell', 'table__cell_left', 'table__cell_name');
  tdName.setAttribute('data-id', `${id}`);
  const span = document.createElement('span');
  span.classList.add('table__cell-id');
  span.textContent = `id: ${id}`;
  tdName.insertAdjacentText('beforeend', title);
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
