import MobileShape from './MobileShape';
import * as vec from 'Src/utils/vec';

class AutoShape extends MobileShape {
  constructor(id) {
    super();
    this.id = id;
  }

  async init(options) {
    await super.init(options);
    const { aim } = options;
    this.aim = aim;
  }

  update() {
    super.update();
    this.setSpeed(this.aim.speed);
    const angle = vec.angleBetween(this.forward, {
      x: this.x - this.aim.x,
      y: this.y - this.aim.y,
    });
    this.setSteering(angle);
  }
}

export default AutoShape;
