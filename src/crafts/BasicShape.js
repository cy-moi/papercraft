import { Container, Graphics, Sprite } from 'pixi.js';
import { changeSelect, changeCraftSession } from '../utils/events';
import Matter from 'matter-js';
import * as utils from '../utils/vec';
import { colors } from '../utils/colors';
import { bindKeyHandler, unbindKeyHandler } from '../utils/keyboard';
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

    // this.addChild(this.graphics);
    this.color = color || colors[Object.keys(colors)[this.getRandomInt(4)]];
    this.health = health || 100;
    this.weapons = [];

    // TODO: fill shape with random color
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
        // this.hitArea = new PIXI.Circle(0, 0, radius);
        break;
      case 'polygon':
        this.physicBody = Matter.Bodies.polygon(0, 0, sides, radius, {
          isStatic,
        });
        this.checkInside = (a) =>
          utils.polygonIntersect(this.physicBody.vertices, a);
        // console.log(this.physicBody.vertices);
        break;
      default:
        console.log('default');
        break;
    }

    // Matter.Composite.add(engine.world, this.physicBody);
    // Matter.Body.setPosition(this.physicBody, this.position);

    // console.log(this.parent)
    this.pivot = {
      x: this.physicBody.position.x - this.physicBody.bounds.min.x,
      y: this.physicBody.position.y - this.physicBody.bounds.min.y,
    };

    // console.log(this.pivot, 'realpivot');

    this.min = this.physicBody.bounds.min;

    this.verts = this.physicBody.vertices.reduce((prev, cur) => {
      prev.push(cur.x - this.pivot.x);
      prev.push(cur.y - this.pivot.y);
      return prev;
    }, []);

    // add sprite
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

    // interact with sprite
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

  scaleSprite(width, height) {
    this.sprite.width = width;
    this.sprite.height = height;
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

  drawShootingVec() {
    const shootPos = this.getEquipSlots();
    // console.log(shootPos);
    this.slots = [];
    shootPos.map((pos, ind) => {
      const hint = new EquipSlotHint(`hint${ind}`);
      hint.init({
        host: this,
        position: pos.slot,
        radius: 10,
      });
      this.slots.push(hint);
      this.addChild(this.slots[ind]);

      return true;
    });
  }

  update() {
    if (this.health <= 0) {
      if (this === window.it) changeCraftSession();
      this.removeSelf();
      return;
    }
    this.x = this.physicBody.position.x;
    this.y = this.physicBody.position.y;
    this.rotation = this.physicBody.angle;
    if (this.slots) this.slots.forEach((it) => it.update());
    this.alpha = this.selected ? 0.5 : 1.0;
    if (this.selected) window.it = this;
  }

  clickEventHandler(e) {
    // unselect last
    if (window.it && window.it !== this) {
      window.it.selected = false;
      // window.it.alpha = 1.0;
      unbindKeyHandler(window.it);
    }

    window.it = this;

    // select this
    bindKeyHandler(this);
    this.selected = !this.selected;
    changeSelect(e);
  }

  removeSelf() {
    Matter.Composite.remove(this.engine.world, this.physicBody);
    const { playground } = window;
    const modules = playground.children.find(
      (it) => it.follow && it.follow === this,
    );
    playground.craftAll.splice(
      playground.craftAll.findIndex((el) => el === this),
      1,
    );
    playground.removeChild(modules);
    playground.removeChild(this);
  }

  getRandomInt = (max) => Math.floor(Math.random() * max);

  // debug draw function
  addDebugOutline = () => {};
}

export default BasicShape;
