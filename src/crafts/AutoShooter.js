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
    this.counter = 0;
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
    // console.log(this.shootVec);
  }

  removeSelf() {
    super.removeSelf();
  }

  update() {
    this.updateSlot();
    this.bullets = this.bullets.slice(0).reduce((bullets, it) => {
      if (it.life > 100) {
        if (this.parent) this.parent.removeChild(it);
        return bullets;
      }
      it.x += Math.cos(it.rotation) * this.shootSpeed;
      it.y += Math.sin(it.rotation) * this.shootSpeed;
      it.life += 1;

      this.bulletHit(it);

      bullets.push(it);
      return bullets;
    }, []);

    if (this.counter % 30 === 0) {
      this.shoot();
      //   this.autoAim(this.aim);
      if (
        utils.getSquaredDistance(this.sprite, this.aim) <
        (this.lifeSpan * this.speed) ** 2
      ) {
        this.shoot();
      }
    }

    this.counter++;
  }
}

export default AutoShooter;
