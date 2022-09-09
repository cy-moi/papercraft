// import Application from './core/Application';
// import * as PIXI from 'pixi.js';
// import './scripts';

// if (process.env.NODE_ENV === 'development') {
//   // required for pixi dev tools to work
//   window.PIXI = PIXI;
// }

// document.addEventListener(
//   'DOMContentLoaded',
//   () => {
//     const app = new Application({
//       antialias: true,
//       resolution:window.devicePixelRatio || 1
//     })
//     // app.ticker.autoStart = false
//     app.ticker.stop()
//     window.app = app
//     app.init()
//   }
// );

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

// window.counter = 0;
