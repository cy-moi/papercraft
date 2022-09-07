import {utils, config, addCraft, getCraft} from '../api'
window.addEventListener('gameInit', async (e) => {
  window.utils = utils
  window.config = config
  window.addCraft = addCraft
  window.getCraft = getCraft

  parent.postMessage('start', window.location.origin);

  console.log(ENV)
  if (ENV === 'dev') {
    await init()
  }
})