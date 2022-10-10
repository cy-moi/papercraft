import { Container, Graphics } from 'pixi.js';

export default class EquipSlotHint extends Container {
  constructor(id) {
    super();
    this.id = id;
    this.interactive = true;
    this.buttonMode = true;
  }

  async init({ follow, position, radius }) {
    const { x, y } = position;
    this.follow = follow;
    this.x = x;
    this.y = y;
    // console.log(this.x, this.y, this.follow, this.follow.min);
    this.r = radius;
    this.graphics = new Graphics();
    this.graphics.lineStyle(2, 0x0000ff);
    this.alpha = 0.5;
    this.graphics.drawCircle(0, 0, radius);
    this.addChild(this.graphics);
    this.on('pointerdown', this.onMouseClick);
  }

  update() {
    if (this.hit) this.alpha = 1;
    else this.alpha = 0.5;
  }

  checkInside(a) {
    // source: https://www.html5gamedevs.com/topic/24408-collision-detection/?do=findComment&comment=139535
    const ab = a.getBounds();
    const bb = this.getBounds();
    this.hit =
      ab.x + ab.width > bb.x &&
      ab.x < bb.x + bb.width &&
      ab.y + ab.height > bb.y &&
      ab.y < bb.y + bb.height;
    return this.hit;
  }

  onMouseClick() {
    console.log('cliickkk');
    this.alpha = 0.7;
  }

  onMouseHover() {
    this.alpha = 1.0;
  }

  onMouseOut() {
    this.alpha = 0.5;
  }
}
