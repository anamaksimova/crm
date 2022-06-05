import {modalControl, tableControl} from './modules/control.js';
import {
   getElements, renderGoods, categoryList} from './modules/service.js';

{
  const init = (selectorApp) => {
    const div = document.querySelector('.container');
    div.id = 'app';
    const app = document.querySelector(selectorApp);

    const {
      modalInputDiscount,
      modalForm,
      modalCheckboxDiscount,
      btnAddGoods,
      overlay,
      modalPrice,
      modalCount,
      table,
    } = getElements(app);
    // функционал


    renderGoods(table);
    tableControl(table);
    modalControl(modalForm, modalCheckboxDiscount, btnAddGoods,
        overlay, modalPrice, modalCount, table, modalInputDiscount);
  };
  categoryList();

  window.crmInit = init;
}
