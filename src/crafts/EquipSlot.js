import { Container, Graphics } from 'pixi.js';
import { containersIntersect } from 'Src/utils/vec';

export default class EquipSlotHint extends Container {
  constructor(id) {
    super();
    this.id = id;
    this.interactive = true;
    this.buttonMode = true;
  }

  async init({ host, position, radius }) {
    const { x, y } = position;
    this.host = host;
    this.x = x;
    this.y = y;
    // console.log(this.x, this.y, this.follow, this.follow.min);
    this.r = radius;
    this.graphics = new Graphics();
    this.graphics.lineStyle(2, 0x0000ff);
    this.alpha = 0.0;
    this.graphics.drawCircle(0, 0, radius);
    this.addChild(this.graphics);
    // this.on('pointerdown', this.onMouseClick);
  }

  update() {
    if (this.hit) this.alpha = 1;
    else this.alpha = 0.0;
  }

  checkInside(a) {
    this.hit = containersIntersect(a, this);
    return this.hit;
  }

  // onMouseClick() {
  //   console.log('cliickkk');
  //   this.alpha = 0.7;
  // }
  //
  // onMouseHover() {
  //   this.alpha = 1.0;
  // }
  //
  // onMouseOut() {
  //   this.alpha = 0.5;
  // }
}
