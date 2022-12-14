import { Container, Sprite, Graphics } from 'pixi.js';
import { defaultColor } from '../utils/colors';
import * as utils from 'Src/utils/vec';
import { changeSelect } from 'Src/utils/events';

export const North = { x: 0, y: -1 };

/*
 * This is the base class for weapons
 * It does not have a Matter physics body because the
 * bullets from this weapon are not suppose to physically
 * move any other objects, but only collide with it figuratively
 */
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
    slot, // from 0 to PI
    direction,
    speed,
    harm,
    config,
    color,
    host,
    texture,
  }) {
    this.OFFSET = Math.PI / 4.0;
    this.follow = follow;
    this.follow.weapons.push(this);
    this.parent = host;

    this.slotId = slot || 0;
    this.harm = harm || 10;
    this.lifeSpan = config.lifeSpan || 100;
    this.color = color || defaultColor;
    this.fireRate = config.fireRate || 20;
    this.frameCounter = 0;
    this.cdTime = 0;

    const { size, radius, bulletTexture } = config;
    const { width, height } = size || { widht: radius * 2, height: radius * 2 };

    const equip = this.follow.getEquipSlots()[slot];
    this.startPos = equip.slot;
    this.graphics = new Graphics();
    this.graphics.beginFill(this.color);

    if (texture) {
      this.sprite = Sprite.from(texture);
    } else {
      this.graphics.lineStyle(5, this.color, 1);
      this.graphics.arc(0, 0, 10, 0, Math.PI / 2.0);

      const shooter = window.app.renderer.generateTexture(this.graphics);
      this.graphics.clear();
      this.sprite = new Sprite(shooter);
    }

    this.sprite.x = this.follow.min.x + this.startPos.x + 10; // plus radius * 2
    this.sprite.y = this.follow.min.y + this.startPos.y + 10;
    this.shootVec = this.follow.rotation + this.direction;
    this.direction = direction || 0 - Math.PI / 4.0;

    this.sprite.rotation = this.shootVec - this.OFFSET;
    this.addChild(this.sprite);

    this.shootSpeed = speed;

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

    // Generate texture from default graphics, but can support other textures
    this.bulletTexture = window.app.renderer.generateTexture(this.graphics);
    if (bulletTexture) {
      this.bulletSprite = Sprite.from(texture);
      this.bulletSprite.width = width || radius * 2;
      this.bulletSprite.height = height || radius * 2;
    }

    this.on('pointerdown', this.onDragStart)
      .on('pointerup', this.onDragEnd)
      .on('pointerupoutside', this.onDragEnd)
      .on('pointermove', this.onDragMove);
    // this.mouse = MouseEvents(this);
  }

  async shoot() {
    if (this.cdTime < this.fireRate) return;
    else this.cdTime = 0;

    const bullet = this.bulletSprite || new Sprite(this.bulletTexture);
    bullet.anchor.set(0.5);
    bullet.x = this.follow.min.x + this.startPos.x;
    bullet.y = this.follow.min.y + this.startPos.y;
    bullet.rotation = this.shootVec;
    bullet.life = 0;

    if (this.parent) this.parent.addChild(bullet);
    this.bullets.push(bullet);
  }

  /*
   * Below are interaction apis for PIXI
   * They are binded with the view(PIXI) in the init functions
   */
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

    if (utils.getSquaredDistance(this.sprite, this.follow) > 10000)
      this.removeSelf();
    this.updateSlot();

    // set hightlight off
    window.playground.craftAll.forEach((it) =>
      it.slots || it.id === 'trash'
        ? it.slots.forEach((s) => (s.hit = false))
        : null,
    );

    window.app.viewport.drag();
  }

  onDragMove() {
    if (this.dragging) {
      const newPosition = this.data.getLocalPosition(this.parent);

      this.sprite.x = newPosition.x;
      this.sprite.y = newPosition.y;
      this.detectSlot();
    }
  }

  /*
   * Collision Checking for PIXI because it doesnt use Matter Engine
   * @param b - bullet
   */
  bulletHit(b) {
    window.playground.craftAll.forEach((child) => {
      if (child.id !== 'shooter' && child !== this.follow) {
        if (child.checkInside(b)) {
          child.health -= this.harm;
          if (child.health !== Infinity) this.follow.score += this.harm;
          b.life = Infinity;
        }
      }
    });
  }

  removeSelf() {
    const { weapons } = this.follow;

    // remove itself from weapons list held by the object it follows
    // so that the stats would be up-to-date
    weapons.splice(
      weapons.findIndex((it) => it === this),
      1,
    );

    // console.log(window.playground.craftAll.findIndex((it) => it === this))
    window.playground.craftAll.splice(
      window.playground.craftAll.findIndex((it) => it === this),
      1,
    );

    // remove all bullets from the playground
    this.bullets.forEach((it) => it.parent && it.parent.removeChild(it));

    this.parent.removeChild(this);
    changeSelect();
  }

  /*
   * Collision Checking for PIXI but to highlight slot
   */
  detectSlot() {
    window.playground.craftAll.forEach((child) => {
      if (child.slots && child.slots.length > 0) {
        Object.keys(child.slots).forEach((slotId) => {
          if (child.slots[slotId].checkInside(this)) {
            this.slotId = slotId;
            if (child !== this.follow) {
              const { weapons } = this.follow;
              weapons.splice(
                weapons.findIndex((it) => it === this),
                1,
              );
              this.follow = child;
              child.weapons.push(this);
            }
            changeSelect();
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
      this.sprite.rotation = this.shootVec - this.OFFSET;
    }
  }

  update() {
    this.updateSlot();

    this.bullets = this.bullets.slice(0).reduce((bullets, it) => {
      if (it.life > this.lifeSpan) {
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

    this.frameCounter++;
    this.cdTime++;
  }
}
