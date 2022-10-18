import EquipSlotHint from './EquipSlot';
import { Sprite } from 'pixi.js';

export default class TrashBin extends EquipSlotHint {
  constructor(id) {
    super();
    this.id = id;
    this.interactive = true;
    this.buttonMode = true;
  }

  async init({ host, position, texture }) {
    const { x, y } = position;
    this.host = host;
    this.x = x;
    this.y = y;
    this.hit = false;

    this.sprite = Sprite.from(texture);
    this.sprite.width = 20;
    this.sprite.height = 20;

    this.addChild(this.sprite);
  }

  update() {
    if (this.hit) this.alpha = 1;
    else this.alpha = 0.0;
  }
}
