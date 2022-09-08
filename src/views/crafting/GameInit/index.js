import Application from './Craftground';
import * as PIXI from 'pixi.js';
import 'Src/scripts';

if (process.env.NODE_ENV === 'development') {
  window.PIXI = PIXI;
}

document.addEventListener(
  'DOMContentLoaded',
  () => {
    const app = new Application({
      antialias: true,
      resolution:window.devicePixelRatio || 1
    })
    // app.ticker.autoStart = false
    app.ticker.stop()
    window.app = app
    app.init()
  }
);
window.counter = 0;

window.selectShape = async function(shape, size = {}, radius = 0) {
  const { playground, addCraft, removeAllCrafts } = window;
  console.log(playground.children)
  await addCraft({
    id: `${shape}`,
    model: "MobileShape",
    host: playground,
    type: shape,
    position: {x: 500, y: 500},
    size,
    radius,
    isStatic: false,
    debug: false
  })
}

// window.spawnRandomShape = async function() {
//   const { playground, addCraft } = window
//   if(Math.random() > 0.5) {
//       await addCraft({
//       id: "shape",
//       model: "MobileShape",
//       host: playground,
//       type: 'circle',
//       position: {
//         x: Math.floor(Math.random() * 500),
//         y: Math.floor(Math.random() * 500)
//       },
//       size: {},
//       radius:  Math.floor(Math.random() * 100),
//       isStatic: false,
//       debug: false
//     })
//   } else {
//     await addCraft({
//       id: "shape",
//       model: "MobileShape",
//       host: playground,
//       type: 'rectangle',
//       position: {
//         x: Math.floor(Math.random() * 500),
//         y: Math.floor(Math.random() * 500)
//       },
//       size: {
//         width: Math.floor(Math.random() * 500),
//         height: Math.floor(Math.random() * 500)
//       },
//       radius:  Math.floor(Math.random() * 100),
//       isStatic: false,
//       debug: false
//     })
//   }
// }


