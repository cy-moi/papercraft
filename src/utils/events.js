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

export const changeSelect = (e) => {
  const changeShapeEvent = document.createEvent('HTMLEvents');
  changeShapeEvent.initEvent('changeShape', true, true);
  changeShapeEvent.eventName = 'changeShape';
  document.dispatchEvent(changeShapeEvent);
};
