import MobileShape from './MobileShape';
import * as vec from 'Src/utils/vec';

class AutoShape extends MobileShape {
  constructor(id) {
    super();
    this.id = id;
  }

  async init(options) {
    await super.init(options);
    const { follow } = options;
    this.follow = follow;
  }

  update() {
    super.update();
    this.setSpeed(this.follow.speed);
    const angle = vec.angleBetween(this.forward, {
      x: this.x - this.follow.x,
      y: this.y - this.follow.y,
    });
    this.setSteering(angle);
  }
}

export default AutoShape;
