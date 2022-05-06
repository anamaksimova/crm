import {modalControl, tableControl} from './modules/control.js';
import {goods, getElements, renderGoods} from './modules/service.js';

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

    renderGoods(goods, table);
    tableControl(goods, table);
    modalControl(modalForm, modalCheckboxDiscount, btnAddGoods,
        overlay, modalPrice, modalCount, table, modalInputDiscount);
  };

  window.crmInit = init;
}
