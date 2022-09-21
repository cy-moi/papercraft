import Application from "./Craftground";
import * as PIXI from "pixi.js";
import "Src/scripts";

if (process.env.NODE_ENV === "development") {
  window.PIXI = PIXI;
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new Application({
    antialias: true,
    resolution: window.devicePixelRatio || 1,
  });
  // app.ticker.autoStart = false
  app.ticker.stop();
  window.app = app;
  app.init();
});
window.counter = 0;

window.selectShape = async function (shape, size = {}, radius = 0) {
  const { playground, addCraft } = window;
  // console.log(playground.children)
  // await removeAllCrafts(playground);
  window.it = await addCraft({
    id: `${shape}`,
    model: "MobileShape",
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
  const { playground, addCraft } = window;
  await addCraft({
    id: "temp",
    model: "MobileShape",
    host: playground,
    type: "polygon",
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
  action
) {
  const { addCraft } = window;
  if (!window.it) throw new Error("no body selected");
  const slots = window.it.getEquipSlots();
  console.log(slots)
  const shooter = await addCraft({
    type,
    id: "colorball",
    model: "Weapon",
    host: window.it,
    position: slots[0].slot,
    direction: slots[0].direction,
    speed,
    config,
  });
  window.addEventListener(action, (e) => {
    if (e.key === "a") shooter.shoot();
  });
};
