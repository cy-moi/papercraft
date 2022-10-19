import { exitBattle } from '../views/battle';
import { initBattle } from '../views/battle';

export const changeSession = async (e) => {
  const event = document.createEvent('HTMLEvents');
  event.initEvent('changeSession', true, true);
  event.eventName = 'changeSession';
  document.dispatchEvent(event);
  window.playground.attackers = [];
  window.it.score = 0;
  await initBattle();
};

export const changeCraftSession = async (e) => {
  const event = document.createEvent('HTMLEvents');
  event.initEvent('changeSession', true, true);
  event.eventName = 'changeSession';
  document.dispatchEvent(event);
  await exitBattle();
};

export const changeSelect = (e) => {
  const changeShapeEvent = document.createEvent('HTMLEvents');
  changeShapeEvent.initEvent('changeShape', true, true);
  changeShapeEvent.eventName = 'changeShape';
  document.dispatchEvent(changeShapeEvent);
};
export const triggerDrawPad = (e) => {
  const triggerDrawPadEvent = document.createEvent('HTMLEvents');
  triggerDrawPadEvent.initEvent('triggerDrawPad', true, true);
  triggerDrawPadEvent.eventName = 'triggerDrawPad';

  document.dispatchEvent(triggerDrawPadEvent);
};
