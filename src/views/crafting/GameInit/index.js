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
  // console.log(playground.children)
  // await removeAllCrafts(playground);
  window.it = await addCraft({
    id: `${shape}`,
    model: "MobileShape",
    host: playground,
    type: shape,
    position: {x: 500, y: 500},
    size,
    radius,
    isStatic: false,
    debug: true 
  })
}

window.testPolygon = async function() {
  const { playground, addCraft, removeAllCrafts} =  window;
  await addCraft({
    id: "temp",
    model: "MobileShape",
    host: playground,
    type: "polygon",
    position: {x: 500, y: 500},
    sides: 3,
    radius: 50,
    isStatic: false,
    debug: true
  })
}

window.equipShoot = async function(type, position, direction, speed, config, action) {
  const { playground, addCraft, removeAllCrafts } = window;
  if(!window.it) throw new Error("no body selected");
  const shooter = await addCraft({
    type,
    id: "colorball",
    model: "Weapon",
    host: window.it,
    position,
    direction,
    speed,
    config
  })
  window.addEventListener(action, (e)=>{
    if(e.key === "a") shooter.shoot();
  })
}
