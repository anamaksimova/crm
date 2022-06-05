export const createRow = ({id, title, price, category,
  discont, count, units, image}) => {
  const tr = document.createElement('tr');
  tr.classList.add('tr');

  tr.insertAdjacentHTML('beforeend', `
  <td class="table__cell ">${document.querySelectorAll('tr').length}</td>
  <td class="table__cell table__cell_left table__cell_name" data-id=${id}>
    <span class="table__cell-id">id: ${id}</span>${title}</td>
  <td class="table__cell table__cell_left">${category}</td>
  <td class="table__cell">${units}</td>
  <td class="table__cell">${count}</td>
  <td class="table__cell">$${price}</td>
  <td class="table__cell">$${price * count}</td>
  <td class="table__cell table__cell_btn-wrapper">
    <button class="table__btn table__btn_pic" data-pic="${image}"></button>
    <button class="table__btn table__btn_edit"></button>
    <button class="table__btn table__btn_del"></button>
  </td>
`);

  return tr;
};

