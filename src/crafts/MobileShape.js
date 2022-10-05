import Matter from 'matter-js';
import * as vec from '../utils/vec';
import keyboard from '../utils/keyboard';
import BasicShape from './BasicShape';

export const North = { x: 0, y: -1 };

class MobileShape extends BasicShape {
  constructor(id) {
    super(id);

    this.steering = 0;
    this.speed = 0;
    this.craftAll = [];
  }

  async init(options) {
    // console.log(options)
    options.isStatic = false;
    await super.init(options);

    const { engine } = window.playground;
    this.engine = engine;

    this.angleOffset = vec.angleBetween(this.physicBody.axes[0], North);
    Matter.Axes.rotate(this.physicBody.axes, this.angleOffset);
    Matter.Body.setAngle(this.physicBody, 0);
    Matter.World.add(engine.world, this.physicBody);
    Matter.Body.setPosition(this.physicBody, this.position);

    this.bindKeyHandler();
  }

  update() {
    this.x = this.physicBody.position.x;
    this.y = this.physicBody.position.y;
    this.rotation = this.physicBody.angle;

    Matter.Body.setAngle(
      this.physicBody,
      this.physicBody.angle + this.steering,
    );

    const dx =
      (Math.cos(this.physicBody.angle + this.angleOffset) * this.speed) / 2;
    const dy =
      (Math.sin(this.physicBody.angle + this.angleOffset) * this.speed) / 2;
    const velocity = Matter.Vector.create(dx, dy);

    Matter.Body.setVelocity(this.physicBody, velocity);
    this.craftAll.forEach((it) => it.update());
  }

  setSteering(wheelDiff) {
    // runner base fps = 30 -> 0.203
    // exact fps 32 -> 0.196
    // reason ?
    const gammar = (wheelDiff / 200) * 0.203;
    this.steering = gammar;
  }

  setSpeed(speed) {
    this.speed = speed;
  }

  bindKeyHandler() {
    const upkey = keyboard('ArrowUp');
    upkey.press = () => {
      this.speed += 1;
    };
    const downKey = keyboard('ArrowDown');
    downKey.press = () => {
      this.speed -= 1;
    };
    const leftKey = keyboard('ArrowLeft');
    leftKey.press = () => {
      this.steering -= 0.01;
    };
    const rightKey = keyboard('ArrowRight');
    rightKey.press = () => {
      this.steering += 0.01;
    };
    const stopKey = keyboard('C');
    stopKey.press = () => {
      this.speed = 0;
      this.steering = 0;
    };
  }

  getCollisions() {
    const collisions = Matter.Query.collides(
      this.physicBody,
      Matter.Composite.allBodies(this.engine.world),
    );
    return collisions;
  }

  stop() {
    this.setSpeed(0);
    this.setSteering(0);
  }

  setPosition(x, y) {
    Matter.Body.translate(this.physicBody, {
      x: x - this.position.x,
      y: y - this.position.y,
    });
  }

  getPosition() {
    return this.physicBody.position;
  }

  rotate(theta) {
    Matter.Body.rotate(this.physicBody, (theta / 180) * Math.PI);
  }

  setAngle(theta) {
    Matter.Body.setAngle(this.physicBody, (theta / 180) * Math.PI);
  }
}

export default MobileShape;
