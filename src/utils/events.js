import { exitBattle } from '../views/battle';
import { initBattle } from '../views/battle';

export const changeSession = (e) => {
  const event = document.createEvent('HTMLEvents');
  event.initEvent('changeSession', true, true);
  event.eventName = 'changeSession';
  document.dispatchEvent(event);
  initBattle();
};

export const changeCraftSession = (e) => {
  const event = document.createEvent('HTMLEvents');
  event.initEvent('changeSession', true, true);
  event.eventName = 'changeSession';
  document.dispatchEvent(event);
  exitBattle();
};
