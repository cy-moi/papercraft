import { Container, Sprite, Graphics } from 'pixi.js';
// import * as utils from 'Src/utils/vec';
// import { MouseEvents } from 'Src/utils/events';

export const North = { x: 0, y: -1 };
const OFFSET = Math.PI / 8.0;

export default class Shooter extends Container {
  constructor(id, _options) {
    super();
    this.id = id;
    this.bullets = [];
    this.interactive = true;
    this.buttonMode = true;
    this.label = 'weapon';
  }

  async init({
    type,
    follow,
    lifeSpan,
    slot, // from 0 to PI
    direction,
    speed,
    harm,
    config,
    color,
  }) {
    this.follow = follow;
    this.slotId = slot || 0;
    this.harm = harm || 10;
    this.lifeSpan = lifeSpan || 100;
    this.color = color || 0x000000;

    const equip = this.follow.getEquipSlots()[slot];
    console.log(equip);
    this.startPos = equip.slot;

    this.graphics = new Graphics();
    this.graphics.lineStyle(5, 0xff00ff, 1);
    this.graphics.arc(0, 0, 10, 0, Math.PI / 2.0);

    const shooter = window.app.renderer.generateTexture(this.graphics);
    this.graphics.clear();
    this.sprite = new Sprite(shooter);
    this.sprite.x = this.follow.min.x + this.startPos.x + 10; // plus radius * 2
    this.sprite.y = this.follow.min.y + this.startPos.y + 10;
    this.shootVec = this.follow.rotation + this.direction;
    this.direction = direction || 0 - Math.PI / 4.0;

    this.sprite.rotation = this.shootVec - Math.Pi / 4.0;
    this.addChild(this.sprite);

    // console.log(this.startPos);

    this.shootSpeed = speed;
    // let options;
    // console.log(config)
    const { size, radius } = config;
    // const { width, height } = size;
    console.log(type);
    switch (type) {
      case 'bullet':
        console.log('circle');

        this.graphics.beginFill(this.color); // Purple
        this.graphics.drawCircle(0, 0, radius);
        this.graphics.endFill();
        break;
      case 'laser':
        console.log('rectangle');

        this.graphics.beginFill(this.color);
        this.graphics.drawRect(0, 0, size.width, size.height);
        this.graphics.endFill();
        break;
      default:
        break;
    }
    this.bulletTexture =
      config.texture || window.app.renderer.generateTexture(this.graphics);
    this.on('pointerdown', this.onDragStart)
      .on('pointerup', this.onDragEnd)
      .on('pointerupoutside', this.onDragEnd)
      .on('pointermove', this.onDragMove);
    // this.mouse = MouseEvents(this);
  }

  async shoot() {
    console.log('shoot');
    // let bullet = new MobileShape('bullet');
    // await bullet.init(this.options);

    const bullet = new Sprite(this.bulletTexture);
    bullet.anchor.set(0.5);
    bullet.x = this.follow.min.x + this.startPos.x;
    bullet.y = this.follow.min.y + this.startPos.y;
    bullet.rotation = this.shootVec;
    bullet.life = 0;

    this.parent.addChild(bullet);
    this.bullets.push(bullet);
  }

  onDragStart(event) {
    const { app } = window;
    app.viewport.plugins.remove('drag');

    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
    this.detectSlot();
    // this.slotId = t < 0 ? this.slotId : t;
    this.updateSlot();
  }

  onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    // set the interaction data to null
    this.data = null;
    this.updateSlot();

    window.app.viewport.drag();
  }

  onDragMove() {
    if (this.dragging) {
      const newPosition = this.data.getLocalPosition(this.parent);

      // console.log(this.data, this);
      this.sprite.x = newPosition.x;
      this.sprite.y = newPosition.y;
      this.detectSlot();
      // this.slotId = t < 0 ? this.slotId : t;
      // this.updateSlot();
    }
  }

  bulletHit(b) {
    window.playground.craftAll.forEach((child) => {
      if (child.id !== 'shooter' && child !== this.follow) {
        if (child.checkInside(b)) {
          child.health -= this.harm;
          b.life = Infinity;
        }
      }
    });
  }

  detectSlot() {
    window.playground.craftAll.forEach((child) => {
      if (child.slots && child.slots.length > 0) {
        Object.keys(child.slots).forEach((slotId) => {
          if (child.slots[slotId].checkInside(this)) {
            this.slotId = slotId;
            this.follow = child.slots[slotId].host;
          }
        });
      }
    });
    // return -1;
  }

  updateSlot() {
    const equip = this.follow.getEquipSlots()[this.slotId];
    if (equip) {
      this.startPos = equip.slot;
      this.shootVec = this.follow.rotation + this.direction;
      this.sprite.position.x = this.follow.min.x + this.startPos.x;
      this.sprite.position.y = this.follow.min.y + this.startPos.y;
      this.sprite.rotation = this.shootVec - OFFSET;
    }
  }

  update() {
    this.updateSlot();
    // const initBullets = [];
    this.bullets = this.bullets.slice(0).reduce((bullets, it) => {
      // console.log(bullet.x, bullet.y, bullet.rotation)
      // console.log(Math.cos(bullet.rotation))
      if (it.life > 100) {
        this.parent.removeChild(it);
        // this.parent.craftAll.splice(this.parent.craftAll.indexOf(e => e === it), 1);
        return bullets;
        // bullet.destroy();
        // return false;
      }
      it.x += Math.cos(it.rotation) * this.shootSpeed;
      it.y += Math.sin(it.rotation) * this.shootSpeed;
      it.life += 1;

      this.bulletHit(it);

      bullets.push(it);
      return bullets;
    }, []);

    // console.log(this.bullets.length);
  }
}
