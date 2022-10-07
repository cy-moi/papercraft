import { Container, Graphics } from 'pixi.js-legacy';
import Matter from 'matter-js';
import MobileShape from './MobileShape';

export const North = { x: 0, y: -1 };

export default class Shooter extends Container {
  constructor(id, options) {
    super();
    this.id = id;
    this.bullets = [];
  }

  async init({
    type,
    host,
    position,
    direction, // from 0 to PI
    speed,
    config,
  }) {
    this.physicBody = Matter.Bodies.circle(0, 0, 10, {
      isStatic: false,
      frictionAir: 0,
    });
    // console.log(type, host, position, direction)
    this.startPos = { ...position };
    this.shootVec = direction;
    this.shootSpeed = speed;
    // let options;
    const { size, radius } = config;
    console.log(type);
    switch (type) {
      case 'bullet':
        console.log('circle');
        this.options = {
          size,
          type: 'circle',
          radius,
          position,
          isStatic: false,
          debug: true,
        };
        break;
      case 'laser':
        console.log('rectangle');
        this.options = {
          size,
          type: 'rectangle',
          position,
          isStatic: false,
          debug: true,
        };
        break;
      default:
        console.log('default');
        break;
    }
    const g = new Graphics();
    g.beginFill(0xffffff);
    g.drawCircle(30, 30, 30);
    g.endFill();
    this.addChild(g);
    this.x = position.x;
    this.y = position.y;
    this.position = { ...position };
    this.rotation = direction;
  }

  async shoot() {
    console.log('shoot');
    const bullet = new MobileShape('bullet');
    await bullet.init(this.options);

    // bullet.x = this.startPos.x;
    // bullet.y = this.startPos.y;
    bullet.setSpeed(this.shootSpeed);
    bullet.setSteering(this.shootVec);
    this.addChild(bullet);
    this.bullets.push(bullet);
  }

  update() {
    this.bullets = this.bullets.map((bullet) => {
      bullet.update();
      // console.log(bullet.x, bullet.y, bullet.rotation)
      // console.log(Math.cos(bullet.rotation))
      // bullet.x += Math.cos(this.shootVec) * this.shootSpeed;
      // bullet.y += Math.sin(this.shootVec) * this.shootSpeed;
      return bullet;
    });
  }

  bindDragHandler() {}
}
