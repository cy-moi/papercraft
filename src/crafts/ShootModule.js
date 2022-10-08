import { Container, Sprite, Graphics } from 'pixi.js';

export const North = { x: 0, y: -1 };

export default class Shooter extends Container {
  constructor(id, options) {
    super();
    this.id = id;
    this.bullets = [];
  }

  async init({
    type,
    follow,
    lifeSpan,
    slot, // from 0 to PI
    speed,
    config,
  }) {
    this.graphics = new Graphics();
    this.follow = follow;
    // const {x, y} = position;
    this.slotId = slot;
    const equip = this.follow.getEquipSlots()[slot];
    console.log(equip);
    this.startPos = equip.slot;
    // console.log(this.startPos);
    this.shootVec = equip.direction;
    this.shootSpeed = speed;
    // let options;
    // console.log(config)
    const { size, radius } = config;
    const { width, height } = size;
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
        this.graphics.drawRect(0, 0, width, height);
        this.graphics.endFill();
        break;
      default:
        break;
    }
    this.bulletTexture = window.app.renderer.generateTexture(this.graphics);
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
    this.addChild(bullet);
    this.bullets.push(bullet);
  }

  update() {
    const equip = this.follow.getEquipSlots()[this.slotId];
    if (equip) {
      this.startPos = equip.slot;
      this.shootVec = equip.direction;
    }
    this.bullets.map((bullet) => {
      // console.log(bullet.x, bullet.y, bullet.rotation)
      // console.log(Math.cos(bullet.rotation))
      if (bullet.life > 500) {
        this.removeChild(bullet);
        bullet.destroy();
        return false;
      }
      bullet.x += Math.cos(this.shootVec) * this.shootSpeed;
      bullet.y += Math.sin(this.shootVec) * this.shootSpeed;
      bullet.life += 1;
      return true;
    });
  }
}
