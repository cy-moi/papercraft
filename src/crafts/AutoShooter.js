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
  }

  update() {
    this.autoAim(this.aim);
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

    if (this.counter % 30 === 0) {
      this.shoot();
      this.autoAim(this.aim);
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
