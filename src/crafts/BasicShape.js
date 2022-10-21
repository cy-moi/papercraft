import { Container, Graphics, Sprite } from 'pixi.js';
import { changeSelect, changeCraftSession } from '../utils/events';
import Matter from 'matter-js';
import * as utils from '../utils/vec';
import { colors } from '../utils/colors';
import {
  bindKeyHandler,
  unbindKeyHandler,
  unbindKeyAction,
  bindKeyAction,
} from '../utils/keyboard';
import EquipSlotHint from './EquipSlot';

export const North = { x: 0, y: -1 };

class BasicShape extends Container {
  constructor(id, options) {
    super();
    this.id = id;
  }

  async init({
    type,
    position: { x, y } = {},
    size: { width, height } = {},
    radius = 10,
    sides,
    health,
    isStatic,
    debug,
    baseStats,
    texture,
    color,
    mouseHandler,
  }) {
    const { engine } = window.playground;
    this.engine = engine;
    this.graphics = new Graphics();

    this.color = color || colors[Object.keys(colors)[this.getRandomInt(4)]];
    this.health = health || 10;
    this.score = 0;
    this.weapons = []; // this is for a easier retrieval of weapons

    // call Matter.js to generate the physical model
    switch (type) {
      case 'rectangle':
        console.log('rectangle');
        this.physicBody = Matter.Bodies.rectangle(0, 0, width, height, {
          isStatic,
        });
        this.checkInside = (a) =>
          utils.polygonIntersect(this.physicBody.vertices, a);
        break;
      case 'circle':
        this.physicBody = Matter.Bodies.circle(0, 0, radius, {
          isStatic,
          frictionAir: 0.1,
        });
        this.radius = radius;
        this.checkInside = (a) =>
          utils.circleIntersect(this.physicBody.position, radius, a);
        break;
      case 'polygon':
        this.physicBody = Matter.Bodies.polygon(0, 0, sides, radius, {
          isStatic,
        });
        this.checkInside = (a) =>
          utils.polygonIntersect(this.physicBody.vertices, a);
        break;
      default:
        console.log('default');
        break;
    }

    // calculate the pivot point of the body, because the PIXI point
    // is decided by the rendering size of the whole container
    // rather than the body itself
    this.pivot = {
      x: this.physicBody.position.x - this.physicBody.bounds.min.x,
      y: this.physicBody.position.y - this.physicBody.bounds.min.y,
    };

    this.min = this.physicBody.bounds.min;

    this.verts = this.physicBody.vertices.reduce((prev, cur) => {
      prev.push(cur.x - this.pivot.x);
      prev.push(cur.y - this.pivot.y);
      return prev;
    }, []);

    // use PIXI to generate sprite
    if (texture) {
      this.sprite = Sprite.from(texture);
      const w = width || radius * 2;
      const h = height || radius * 2;
      this.sprite.width = w;
      this.sprite.height = h;
    } else {
      this.graphics.beginFill(this.color);
      this.graphics.drawPolygon(this.verts);
      this.graphics.endFill();
      this.texture = window.app.renderer.generateTexture(this.graphics);
      this.sprite = new Sprite(this.texture);
    }

    // interactions with sprite
    this.interactive = true;
    this.buttonMode = true;
    this.selected = false;
    this.addChild(this.sprite);

    const handler = mouseHandler || this.clickEventHandler;
    this.on('mousedown', handler);
    // this.on('rightclick', this.rightclickHandler);

    this.x = x;
    this.y = y;
    this.position = { x, y };

    this.baseStats = baseStats;

    // PIXI container size and position will be affected by the
    // contents added in it, so always add the debug lines at last
    // or it will affect the position of the sprite.
    // if (debug) this.addDebugOutline();
    // this.drawForward();
    if (debug) this.drawShootingVec();

    this.angleOffset = utils.angleBetween(this.physicBody.axes[0], North);
    Matter.Axes.rotate(this.physicBody.axes, this.angleOffset);
    Matter.Body.setAngle(this.physicBody, 0);
    Matter.World.add(engine.world, this.physicBody);
    Matter.Body.setPosition(this.physicBody, this.position);
  }

  getEquipSlots() {
    // const vertNum = this.verts.length;
    const north = {
      x: (this.verts[0] - this.verts[2]) / 2.0 - this.pivot.x,
      y: (this.verts[1] - this.verts[3]) / 2.0 - this.pivot.y,
    };
    // console.log(this.verts, this.verts.length, this.verts[0]);
    return this.physicBody.parts[0].vertices.map((item, ind) => ({
      slot: {
        x: item.x - this.physicBody.bounds.min.x,
        y: item.y - this.physicBody.bounds.min.y,
      },
      vector: {
        x: this.pivot.x - item.x,
        y: this.pivot.y - item.y,
      },
      direction:
        this.rotation +
        utils.angleBetween(
          { x: item.x - this.pivot.x, y: item.y - this.pivot.y },
          north,
        ),
    }));
  }

  // a helper function to debug
  drawShootingVec() {
    const shootPos = this.getEquipSlots();

    this.slots = [];
    shootPos.map((pos, ind) => {
      const hint = new EquipSlotHint(`hint${ind}`);
      hint.init({
        id: 'hint',
        host: this,
        position: pos.slot,
        radius: 10,
      });
      this.slots.push(hint);
      this.addChild(this.slots[ind]);

      return true;
    });
  }

  // this function will be called each frame
  update() {
    if (this.health <= 0) {
      // If the the shape has no more health destroy it
      this.removeSelf();
      if (
        window.battle &&
        (this === window.playground.attackers[0] || this === window.it)
      )
        changeCraftSession();
      return;
    }

    // update the position its children
    this.x = this.physicBody.position.x;
    this.y = this.physicBody.position.y;
    this.rotation = this.physicBody.angle;

    // !TODO: this should be changed to update all children
    // because this slots is not final ones and are only debug purposes
    // circles for current arc-weapons, we added it inside the debug draw
    // !TODO: Let user define the slots and update it as children
    if (this.slots) this.slots.forEach((it) => it.update());
    this.alpha = this.selected ? 0.5 : 1.0;
    if (this.selected) window.it = this;
  }

  clickEventHandler(e) {
    // unselect last
    if (window.it && window.it !== this) {
      window.it.selected = false;
      unbindKeyHandler(window.it);
      unbindKeyAction('a');
    }

    window.it = this;

    // select this
    bindKeyHandler(this);
    bindKeyAction('a', () => window.it.weapons.forEach((it) => it.shoot()));
    this.selected = !this.selected;
    changeSelect(e);
  }

  // remove itself from both matter engine and PIXI rendering
  // also remote itself from the conrtoller lists
  removeSelf() {
    Matter.Composite.remove(this.engine.world, this.physicBody);
    const { playground } = window;
    const modules = playground.craftAll.filter(
      (it) => it.follow && it.follow === this,
    );
    console.log(modules);
    modules.forEach((e) => e.removeSelf());

    playground.craftAll.splice(
      playground.craftAll.findIndex((el) => el === this),
      1,
    );

    playground.removeChild(this);
  }

  getRandomInt = (max) => Math.floor(Math.random() * max);

  // debug draw function
  addDebugOutline = () => {};
}

export default BasicShape;
