import ShootModule from './ShootModule';
import * as utils from 'Src/utils/vec';

class AutoShooter extends ShootModule {
  constructor(id) {
    super();
    this.id = id;
    this.interactive = false;
  }

  async init(options) {
    await super.init(options);
  }

  autoAim(at) {
    this.aim = at;
    const vec = {
      x: Math.cos(this.shootVec) * this.shootSpeed,
      y: Math.sin(this.shootVec) * this.shootSpeed,
    };

    const aim = {
      x: this.sprite.x - at.x,
      y: this.sprite.y - at.y,
    };

    this.shootVec = utils.angleBetween(vec, aim);
  }

  removeSelf() {
    super.removeSelf();
  }

  update() {
    super.update();

    if (this.frameCounter % 30 === 0) {
      this.shoot();
      //   this.autoAim(this.aim);
      if (
        utils.getSquaredDistance(this.sprite, this.aim) <
        (this.lifeSpan * this.speed) ** 2
      ) {
        this.shoot();
      }
    }
  }
}

export default AutoShooter;
