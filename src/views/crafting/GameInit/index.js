import Application from './Craftground';
import * as PIXI from 'pixi.js';
import 'Src/scripts';

if (process.env.NODE_ENV === 'development') {
  window.PIXI = PIXI;
}

document.addEventListener('DOMContentLoaded', async () => {
  const app = new Application({
    antialias: true,
    resolution: window.devicePixelRatio || 1,
  });
  // app.ticker.autoStart = false
  // app.ticker.stop();
  window.app = app;
  await app.init();
});
window.counter = 0;

window.selectShape = async function add(
  shape,
  size = {},
  radius = 0,
  sides = 0,
  type = '',
) {
  const { playground, addCraft } = window;
  // console.log(playground.children)
  // await removeAllCrafts(playground);
  window.it = await addCraft({
    id: 'actor',
    model: 'MobileShape',
    host: playground,
    type: type === '' ? shape : type,
    position: {
      x: 500,
      y: 500,
    },
    size,
    sides,
    radius,
    isStatic: false,
    debug: true,
  });
};

window.addPolygonCraft = async function add(sides = 3, size = 50) {
  const { playground, addCraft } = window;
  await addCraft({
    id: 'actor',
    model: 'MobileShape',
    host: playground,
    type: 'polygon',
    position: {
      x: 500,
      y: 500,
    },
    sides,
    radius: size ? size : 50,
    isStatic: false,
    debug: true,
  });
};

window.equipShoot = async function shoot(
  type,
  slot,
  speed,
  direction,
  config,
  color,
  action,
  lifeSpan = 10,
) {
  const { playground, addCraft } = window;
  if (!window.it) throw new Error('no body selected');
  // const slots = window.it.getEquipSlots();
  // console.log(slots)
  const shooter = await addCraft({
    type,
    id: 'shooter',
    model: 'Weapon',
    follow: window.it,
    host: playground,
    color,
    lifeSpan,
    slot,
    speed,
    direction,
    config,
  });
  window.addEventListener(action, (e) => {
    if (e.key === 'a') shooter.shoot();
  });
};
