import { Container, Graphics, Sprite } from 'pixi.js';
import * as drawUtils from '../utils/draw';
import Matter from 'matter-js';
import * as utils from '../utils/vec';
import { colors } from '../utils/colors';

class BasicShape extends Container {
  constructor(id, options) {
    super();
    this.id = id;
  }

  async init({
    type,
    position: { x, y } = {},
    size: { width, height } = {},
    radius = 10,
    sides,
    slope,
    isStatic,
    debug,
  }) {
    const { engine } = window.playground;
    this.graphics = new Graphics();

    // this.addChild(this.graphics);
    this.color = colors[Object.keys(colors)[this.getRandomInt(4)]];

    // TODO: fill shape with random color
    switch (type) {
      case 'rectangle':
        console.log('rectangle');
        this.physicBody = Matter.Bodies.rectangle(0, 0, width, height, {
          isStatic,
        });
        break;
      case 'circle':
        this.physicBody = Matter.Bodies.circle(0, 0, radius, {
          isStatic,
          frictionAir: 0.1,
        });
        this.radius = radius;
        // this.hitArea = new PIXI.Circle(0, 0, radius);
        break;
      case 'polygon':
        this.physicBody = Matter.Bodies.polygon(0, 0, sides, radius, {
          isStatic,
        });
        // console.log(this.physicBody.vertices);
        break;
      default:
        console.log('default');
        break;
    }

    Matter.Composite.add(engine.world, this.physicBody);
    Matter.Body.setPosition(this.physicBody, this.position);

    // console.log(this.parent)
    this.pivot = {
      x: this.physicBody.position.x - this.physicBody.bounds.min.x,
      y: this.physicBody.position.y - this.physicBody.bounds.min.y,
    };

    this.min = this.physicBody.bounds.min;

    const verts = this.physicBody.vertices.reduce((prev, cur) => {
      prev.push(cur.x - this.pivot.x);
      prev.push(cur.y - this.pivot.y);
      return prev;
    }, []);

    this.graphics.beginFill(this.color);
    this.graphics.drawPolygon(verts);
    this.graphics.endFill();
    this.sprite = new Sprite(
      window.app.renderer.generateTexture(this.graphics),
    );

    // interact with sprite
    this.interactive = true;
    this.buttonMode = true;
    this.selected = false;
    this.addChild(this.sprite);
    this.on('mousedown', this.clickEventHandler);

    this.x = x;
    this.y = y;
    this.position = { x, y };

    // PIXI container size and position will be affected by the
    // contents added in it, so always add the debug lines at last
    // or it will affect the position of the sprite.
    if (debug) {
      // for debug
      this.addDebugOutline();
    }

    this.drawShootingVec();
  }

  getEquipSlots() {
    const minpt = this.physicBody.bounds.min;
    this.center = {
      x: minpt.x + (this.physicBody.bounds.max.x - minpt.x) / 2.0,
      y: minpt.y + (this.physicBody.bounds.max.y - minpt.y) / 2.0,
    };
    return this.physicBody.parts[0].vertices.map((item) => ({
      slot: {
        x: item.x - this.physicBody.bounds.min.x,
        y: item.y - this.physicBody.bounds.min.y,
      },
      vector: {
        x: this.pivot.x - item.x,
        y: this.pivot.y - item.y,
      },
      direction: utils.angleBetween(
        { x: this.pivot.x + 100, y: this.pivot.y },
        { x: this.pivot.x - item.x, y: this.pivot.y - item.y },
      ),
    }));
  }

  drawShootingVec() {
    const shootPos = this.getEquipSlots();
    // console.log(shootPos);
    shootPos.map((pos) => {
      this.slot1 = new Graphics();
      this.slot1.lineStyle(2, 0x0000ff);
      this.slot1.drawCircle(pos.slot.x, pos.slot.y, 4);
      this.addChild(this.slot1);
      const arrow = new drawUtils.Line([
        pos.slot.x,
        pos.slot.y,
        pos.vector.x,
        pos.vector.y,
      ]);
      this.addChild(arrow);
      return true;
    });
  }

  update() {
    this.x = this.physicBody.position.x;
    this.y = this.physicBody.position.y;
    this.rotation = this.physicBody.angle;
  }

  clickEventHandler(e) {
    // unselect last
    if (window.it) {
      window.it.selected = false;
      window.it.alpha = 1.0;
    }

    // select this
    this.selected = !this.selected;
    // console.log("Mousedown")
    if (this.selected) {
      this.alpha = 0.5;
      window.it = this;
    } else {
      this.alpha = 1.0;
      window.it = null;
    }
  }

  getRandomInt = (max) => Math.floor(Math.random() * max);

  // debug draw function
  addDebugOutline = () => {
    // this.pivotHint = new Graphics();
    // this.pivotHint.lineStyle(2, 0x0000ff);
    // this.pivotHint.drawCircle(this.pivot.x, this.pivot.y, 4)
    // this.addChild(this.pivotHint)
    // const vv = [];
    // if (this.physicBody.parts.length > 1) {
    //   for (let j = 1; j < this.physicBody.parts.length; j++) {
    //     const convex = [];
    //     for (const v of this.physicBody.parts[j].vertices) {
    //       convex.push(v);
    //     }
    //     vv.push(convex);
    //     // this.physicBody.parts[j].vertices.forEach(v=> {
    //     //   vv.push({x: v.x, y: v.y})
    //     // });
    //   }
    //   this.line = new utils.MultiPoly(vv);
    //   this.line.position = {
    //     x: -(this.physicBody.position.x - this.pivot.x),
    //     y: -(this.physicBody.position.y - this.pivot.y)
    //   }
    //   this.addChild(this.line);
    //   return;
    // } else {
    //   this.physicBody.parts[0].vertices.forEach(v => {
    //     vv.push({ x: v.x, y: v.y })
    //   });
    // }
    // this.line = new utils.Polygon(vv);
    // this.line.position = {
    //   x: -(this.physicBody.position.x - this.pivot.x),
    //   y: -(this.physicBody.position.y - this.pivot.y)
    // }
    // this.addChild(this.line)
  };
}

export default BasicShape;
