import { TOO_LOW, TOO_MUCH } from './constants';

export default (num, expected) => {
  if (num < expected) {
    alert(TOO_LOW);
  } else {
    alert(TOO_MUCH);
  }
};
