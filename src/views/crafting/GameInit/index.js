import Application from './Craftground';
import * as PIXI from 'pixi.js';
import 'Src/scripts';

if (process.env.NODE_ENV === 'development') {
  window.PIXI = PIXI;
}

/**
 * Initializes the game once the page is loaded.
 */
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

/**
 * Creates a new shape and adds it to the playground.
 * @param shape - shape of the craft
 * @param size - size of the craft (width and height)
 * @param radius - radius of the craft (for circle)
 * @param sides - number of sides of the craft (for polygon)
 * @param type - type of the craft
 * @returns {Promise<void>} - returns a promise that resolves when the craft is created
 */
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

/**
 * Adds a weapon to the selected craft's stick slot.
 * @param type - type of the weapon
 * @param slot - slot where the weapon will be added
 * @param speed - bullet speed of the weapon
 * @param direction - direction of the weapon's bullets
 * @param config
 * @param color - color of the weapon
 * @param action - action to activate the weapon
 * @param lifeSpan - lifespan of the weapon's bullets
 * @returns {Promise<void>}
 */
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
