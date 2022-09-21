import config from 'Core/config';
import {
  addCraft, getCraft, waitFrameToStop, removeAllCrafts
} from './api'

window.addEventListener('gameInit', async (e) => {
  window.config = config
  window.addCraft = addCraft
  window.getCraft = getCraft
  window.removeAllCrafts = removeAllCrafts
  window.waitFrameToStop = waitFrameToStop

  // eslint-disable-next-line no-restricted-globals
  parent.postMessage('start', window.location.origin);

  console.log(ENV)
  if (ENV === 'dev') {
    await init()
  }
})

async function init() {
  console.log('>>> run script')

  // const { playground, addCraft } = window
}
