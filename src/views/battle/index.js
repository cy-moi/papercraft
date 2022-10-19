import config from './config';
import { battleColors } from 'Src/utils/colors';

export const initBattle = async () => {
  const {
    // eslint-disable-next-line no-unused-vars
    addCraft,
    playground,
    it,
  } = window;
  // app.viewport.fit(it);
  // app.viewport.follow(it);
  window.battle = true;

  it.setPosition(config.boundary.width / 2.0, config.boundary.height / 2.0);

  const followers = playground.craftAll.filter((el) => el.follow === it);

  playground.craftAll.reduceRight((acc, e, ind) => {
    if (e !== window.it && followers.indexOf(e) === -1) {
      e.removeSelf();
    }
  }, []);
  
  it.buttonMode = false;

  playground.attackers = [];

  const seeds = Array.from({ length: 10 }, () =>
    Math.floor(Math.random() * config.game.width),
  );

  addCraft({
    id: 'wall',
    model: 'BasicShape',
    host: playground,
    type: 'rectangle',
    position: { x: config.boundary.width / 2.0, y: 20 },
    size: { width: config.boundary.width, height: 20 },
    isStatic: true,
    debug: false,
    health: Infinity,
    mouseHandler: () => {
      console.log('do nothing');
    },
    color: battleColors.yellow,
  });

  // add a wall to the playground to prevent the craft from going out of bounds
  addCraft({
    id: 'wall',
    model: 'BasicShape',
    host: playground,
    type: 'rectangle',
    position: { x: config.boundary.width, y: config.boundary.height / 2.0 },
    size: { width: 20, height: config.boundary.height },
    isStatic: true,
    debug: false,
    health: Infinity,
    mouseHandler: () => {
      console.log('do nothing');
    },
    color: battleColors.yellow,
  });

  // add a wall to the playground to prevent the craft from going out of bounds
  addCraft({
    id: 'wall',
    model: 'BasicShape',
    host: playground,
    type: 'rectangle',
    position: {
      x: config.boundary.width / 2.0,
      y: config.boundary.height - 20,
    },
    size: { width: config.boundary.width, height: 20 },
    isStatic: true,
    debug: false,
    health: Infinity,
    mouseHandler: () => {
      console.log('do nothing');
    },
    color: battleColors.yellow,
  });

  // add a wall to the playground to prevent the craft from going out of bounds
  addCraft({
    id: 'wall',
    model: 'BasicShape',
    host: playground,
    type: 'rectangle',
    position: { x: 0, y: config.boundary.height / 2.0 },
    size: { width: 20, height: config.boundary.height },
    isStatic: true,
    debug: false,
    health: Infinity,
    mouseHandler: () => {
      console.log('do nothing');
    },
    color: battleColors.yellow,
  });

  // add the random obstacles to the playground
  seeds.forEach(async (value, id) => {
    // add indestructible obstacles to the playground
    addCraft({
      id,
      model: 'BasicShape',
      host: playground,
      type: 'rectangle',
      position: {
        x: Math.random() * (config.boundary.width - 100) + 100,
        y: Math.random() * (config.boundary.height - 100) + 100,
      },
      size: { width: Math.random() * 100, height: Math.random() * 100 },
      isStatic: true,
      debug: false,
      mouseHandler: () => {
        console.log('do nothing');
      },
      color: battleColors.yellow,
    });

    addCraft({
      id: 'moveObstacles',
      model: 'MobileShape',
      host: playground,
      type: 'rectangle',
      position: { x: 500, y: config.boundary.height / 2.0 },
      size: { width: 20, height: 200 },
      isStatic: true,
      debug: false,
      health: Infinity,
      mouseHandler: () => {
        console.log('do nothing');
      },
      color: battleColors.red,
    });

    // add destructible obstacles to the playground
    addCraft({
      id: 'moveObstacles',
      model: 'MobileShape',
      host: playground,
      type: 'circle',
      position: { x: 200, y: config.boundary.height / 4.0 },
      radius: Math.random() * 30 + 10,
      isStatic: true,
      debug: false,
      health: 200,
      mouseHandler: () => {
        console.log('do nothing');
      },
      color: battleColors.red,
    });
    addCraft({
      id: 'moveObstacles',
      model: 'MobileShape',
      host: playground,
      type: 'polygon',
      position: { x: 200, y: config.boundary.height / 4.0 },
      radius: Math.random() * 30 + 10,
      sides: Math.random() * 15 + 5,
      isStatic: true,
      debug: false,
      health: 200,
      mouseHandler: () => {
        console.log('do nothing');
      },
      color: battleColors.red,
    });
  });

  // create ennemies
  const attacker = await addCraft({
    id: 'attacker',
    model: 'AutoShape',
    host: playground,
    type: 'polygon',
    aim: it,
    position: { x: 200, y: config.boundary.height / 4.0 },
    radius: Math.random() * 50 + 30,
    sides: 5,
    isStatic: false,
    debug: true,
    health: 100,
    mouseHandler: () => {
      console.log('do nothing');
    },
    color: battleColors.green,
  });
  // spawn attacker on the playground
  playground.attackers.unshift(attacker);

  attacker.getEquipSlots().forEach(async (slot, ind) => {
    const shooter = await addCraft({
      type: 'laser',
      id: 'shooter',
      model: 'AutoShooter',
      follow: attacker,
      host: playground,
      lifeSpan: 100,
      slot: ind,
      speed: 20,
      direction: Math.PI * 2.0 * 0.5 * (ind + 1),
      config: {
        size: { width: 20, height: 2 },
      },
      color: battleColors.purple,
    });
    shooter.parent = playground;
    shooter.autoAim(it);
  });
};

export const exitBattle = async () => {
  // eslint-disable-next-line no-unused-vars
  const { playground, it, removeAllCrafts } = window;
  window.battle = false;
  playground.attackers[0].follower = undefined;
  // const followers = playground.craftAll.filter((el) => el.follow === it);

  // remove everything else but the player
  playground.craftAll.reduceRight((acc, e, ind) => {
    // if(e.id === 'autoshooter') e.removeSelf();
    if (e !== window.it) {
      e.removeSelf();
    }
  }, []);
  
  console.log(playground.craftAll);

  playground.attackers[0].removeSelf();
  playground.attackers = [];
  // check if the player dead
  if (it.health > 0) {
    it.buttonMode = true;
    it.health = 100;
  } else {
    it.removeSelf();
  }
};
