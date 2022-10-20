import { addCraft, getCraft } from './api';

// [DEPRECATED]

window.addEventListener('gameInit', async (e) => {
  // window.utils = utils
  // window.config = config
  window.addCraft = addCraft;
  window.getCraft = getCraft;

  // eslint-disable-next-line no-restricted-globals
  parent.postMessage('start', window.location.origin);

  if (ENV === 'dev') {
    await init();
  }
});

async function init() {
  console.log('>>> run script');

  // const { playground, addCraft } = window
}
