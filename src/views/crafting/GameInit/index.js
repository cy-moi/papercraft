import * as PIXI from 'pixi.js-legacy';
import 'Src/scripts';
import CraftApp from './Craftground';

// if (process.env.NODE_ENV === 'development') {
window.PIXI = PIXI;
// }

PIXI.extensions.remove(PIXI.InteractionManager);

document.addEventListener('DOMContentLoaded', () => {
  const craftapp = new CraftApp({
    antialias: true,
    resolution: window.devicePixelRatio || 1,
  });
  // app.ticker.autoStart = false
  // app.ticker.stop();
  // window.app = app;
  craftapp.init();
});
window.counter = 0;

window.getNewWeapon = async function (
  type,
  position,
  direction,
  speed,
  config,
  action,
) {
  // const slots = window.it.getEquipSlots();
  // console.log(slots)
  const { playground, addCraft } = window;
  const shooter = await addCraft({
    type,
    id: 'colorball',
    model: 'Weapon',
    host: playground,
    position,
    direction,
    speed,
    config,
  });
  window.addEventListener(action, (e) => {
    if (e.key === 'a') shooter.shoot();
  });
  return shooter;
};

window.selectShape = async function (shape, size = {}, radius = 0) {
  const { playground, addCraft, removeAllCrafts } = window;
  // console.log(playground.children)
  await removeAllCrafts(playground);
  window.it = await addCraft({
    id: `${shape}${playground.children.length}`,
    model: 'MobileShape',
    host: playground,
    type: shape,
    position: { x: 500, y: 500 },
    size,
    radius,
    isStatic: false,
    debug: true,
  });
};

window.addPolygonCraft = async function (sides = 3) {
  const { playground, addCraft, removeAllCrafts } = window;
  await removeAllCrafts(playground);
  window.it = await addCraft({
    id: 'temp',
    model: 'MobileShape',
    host: playground,
    type: 'polygon',
    position: { x: 500, y: 500 },
    sides,
    radius: 50,
    isStatic: false,
    debug: true,
  });
};

window.equipShoot = async function (
  type,
  position,
  direction,
  speed,
  config,
  action,
) {
  const { addCraft } = window;
  if (!window.it) throw new Error('no body selected');
  // const slots = window.it.getEquipSlots();
  // console.log(slots)
  const shooter = await addCraft({
    type,
    id: 'colorball',
    model: 'Weapon',
    host: window.it,
    position,
    direction,
    speed,
    config,
  });
  window.addEventListener(action, (e) => {
    if (e.key === 'a') shooter.shoot();
  });
};
