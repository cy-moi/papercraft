import { Container, Graphics, Sprite, Texture } from 'pixi.js';
import 'pixi-heaven';
// import * as utils from '../utils/draw';
import Matter from 'matter-js';
// import keyboard from '../utils/keyboard';
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
    const graphics = new Graphics();

    // this.addChild(graphics);
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

    const verts = this.physicBody.vertices.reduce((prev, cur) => {
      prev.push(cur.x - this.pivot.x);
      prev.push(cur.y - this.pivot.y);
      return prev;
    }, []);

    graphics.beginFill(this.color);
    graphics.drawPolygon(verts);
    graphics.endFill();
    this.sprite = new Sprite(window.app.renderer.generateTexture(graphics));

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
  }

  setSprite(image) {
    console.log(image);
    this.sprite.texture = Texture.from(image);
  }

  // getSpriteImg() {
  //   return this.sprite.texture.baseTexture.source;
  // }

  getEquipSlots() {
    const minpt = this.physicBody.bounds.min;
    const center = {
      x: minpt.x + (this.physicBody.bounds.max.x - minpt.x) / 2.0,
      y: minpt.y + (this.physicBody.bounds.max.y - minpt.y) / 2.0,
    };
    return this.physicBody.vertices.map((item) => ({
      slot: {
        x: item.x - this.physicBody.bounds.min.x,
        y: item.y - this.physicBody.bounds.min.y,
      },
      direction: utils.angleBetween(
        { x: 0, y: 1 },
        { x: center.x - item.x, y: item.y - center.y },
      ),
    }));
  }

  update() {
    this.x = this.physicBody.position.x;
    this.y = this.physicBody.position.y;
    this.rotation = this.physicBody.angle;
  }

  clickEventHandler(e) {
    window.it = this;
    // unselect last
    // if (window.it) {
    //   window.it.selected = false;
    //   window.it.alpha = 1.0;
    // }
    //
    // // select this
    // this.selected = !this.selected;
    // // console.log("Mousedown")
    // if (this.selected) {
    //   this.alpha = 0.5;
    //   window.it = this;
    // } else {
    //   this.alpha = 1.0;
    //   window.it = null;
    // }
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
