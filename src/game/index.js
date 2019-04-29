import TO_FIND from './random';
import getNum from './input';
import success from './success';
import info from './userInfo';
import turns from './turns';

export default () => {
  alert('Została wylosowana liczba z przedziału 1-50. Zgaduj!');
  let total = 1;
  let num = getNum();
  while (num !== TO_FIND) {
    info(num, TO_FIND);
    num = getNum();
    total = turns(total);
  }
  success(total);
};
