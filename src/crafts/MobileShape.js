import { Container, Sprite, Graphics } from 'pixi.js';
import Matter from 'matter-js';
import * as vec from '../utils/vec';
import BasicShape from './BasicShape.js';
export const North = {x:0, y: -1}

class MobileShape extends BasicShape {
	constructor(id) {
		super(id)

		this.steering = 0;
		this.speed = 0;
	}

	async init(options) {
		options.isStatic = false;
		await super.init(options);

		let engine = window.playground.engine;
    this.engine = engine;

    this.angleOffset = vec.angleBetween(this.physicBody.axes[0], North);
    Matter.Axes.rotate(this.physicBody.axes, this.angleOffset);
    Matter.Body.setAngle(this.physicBody, 0);
    Matter.World.add(engine.world, this.physicBody);
    Matter.Body.setPosition(this.physicBody, this.position)
	}

	update(){
		this.x = this.physicBody.position.x
    this.y = this.physicBody.position.y
    this.rotation = this.physicBody.angle

		Matter.Body.setAngle(this.physicBody, this.physicBody.angle + this.steering);

    const dx = Math.cos(this.physicBody.angle + this.angleOffset) * this.speed / 2;
    const dy = Math.sin(this.physicBody.angle + this.angleOffset) * this.speed / 2;
    const velocity = Matter.Vector.create(dx, dy)

    Matter.Body.setVelocity(this.physicBody, velocity);

	}

	setSteering(wheelDiff) {
    // runner base fps = 30 -> 0.203
    // exact fps 32 -> 0.196
    // reason ?
    const gammar = wheelDiff / 200 * 0.203
    this.steering = gammar
  }

  setSpeed(speed) {
    this.speed = speed
  }

  stop(){
    this.setSpeed(0)
    this.setSteering(0)
  }

  setPosition(x, y) {
    Matter.Body.translate(this.physicBody, {
      x: x - this.position.x,
      y: y - this.position.y
    })
  }

  getPosition() {
    return this.physicBody.position;
  }

  rotate(theta) {
    Matter.Body.rotate(this.physicBody, theta/180 * Math.PI)
  }

  setAngle(theta) {
    Matter.Body.setAngle(this.physicBody, theta/180 * Math.PI)
  }
}

export default MobileShape;