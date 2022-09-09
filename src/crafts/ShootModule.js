import { Container, Sprite, Graphics } from 'pixi.js';
import Matter from 'matter-js';
import * as vec from '../utils/vec';
export const North = {x:0, y: -1};

export default class Shooter extends Container {
  constructor(id, options) {
		super()
		this.id = id;
    this.bullets = [];
	}

  async init({
		type,
    host,
    position,
    direction, // from 0 to PI
    speed
	}) {
    this.graphics = new PIXI.Graphics();
    this.physicBody = Matter.Bodies.circle(
      0, 0, 10,
      {
        isStatic: false,
        frictionAir: 0
      });
    // console.log(type, host, position, direction)
    this.startPos = {...position };
    this.shootVec = direction;
    this.shootSpeed = speed;
    this.graphics.beginFill(this.color); // Purple
    this.graphics.drawCircle(0, 0, 10); // drawRect(x, y, width, height)
    this.graphics.endFill();

		this.bulletTexture = window.app.renderer.generateTexture(this.graphics);
		// this.sprite = new PIXI.Sprite(texture);
		// this.sprite.anchor.set(0.5);
    // this.addChild(this.sprite);

  }

  shoot() {
    console.log("shoot");
    const bullet = new PIXI.Sprite(this.bulletTexture);
    bullet.anchor.set(0.5);
    bullet.x = this.startPos.x;
    bullet.y = this.startPos.y;
    bullet.rotation = this.shootVec;
    this.addChild(bullet);
    this.bullets.push(bullet);
  }

  update() {
    
    for(let bullet of this.bullets) {
      // console.log(bullet.x, bullet.y, bullet.rotation)
      // console.log(Math.cos(bullet.rotation))
    
      bullet.x += Math.cos(bullet.rotation) * this.shootSpeed;
      bullet.y += Math.sin(bullet.rotation) * this.shootSpeed;
    }
  }
}