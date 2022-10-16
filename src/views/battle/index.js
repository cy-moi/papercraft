import config from './config';

export const initBattle = async () => {
  const { addCraft, playground, it, removeAllCrafts } = window;
  // app.viewport.fit(it);
  // app.viewport.follow(it);

  const followers = playground.craftAll.filter((el) => el.follow === it);

  removeAllCrafts(playground);
  it.buttonMode = false;
  playground.addChild(it);
  followers.forEach((s) => playground.addChild(s));

  // const obstacles = [];
  // const attackers = [];

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
  });

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
  });

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
  });

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
  });

  seeds.forEach(async (value, id) => {
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
    });

    addCraft({
      id: 'moveObstacles',
      model: 'MobileShape',
      host: playground,
      type: 'circle',
      position: { x: 200, y: config.boundary.height / 4.0 },
      radius: Math.random() * 50,
      isStatic: true,
      debug: false,
      health: Infinity,
      mouseHandler: () => {
        console.log('do nothing');
      },
    });
  });

  const attacker = await addCraft({
    id: 'attackers',
    model: 'AutoShape',
    host: playground,
    type: 'polygon',
    aim: it,
    position: { x: 200, y: config.boundary.height / 4.0 },
    radius: Math.random() * 50 + 50,
    sides: 5,
    isStatic: false,
    debug: true,
    health: 200,
    mouseHandler: () => {
      console.log('do nothing');
    },
  });

  attacker.getEquipSlots().forEach(async (slot, ind) => {
    const shooter = await addCraft({
      type: 'laser',
      id: 'shooter',
      model: 'AutoShooter',
      follow: attacker,
      host: playground,
      color: '0xFF0000',
      lifeSpan: 100,
      slot: ind,
      speed: 20,
      direction: 1.0,
      config: {
        size: { width: 20, height: 2 },
      },
    });
    shooter.autoAim(it);
  });
};

export const exitBattle = () => {
  const { playground, it, removeAllCrafts } = window;
  removeAllCrafts(playground);
  it.buttonMode = true;
  it.health = 100;
  playground.addChild(it);
};
