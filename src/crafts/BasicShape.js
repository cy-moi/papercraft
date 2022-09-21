import { Container, Graphics } from 'pixi.js';
import 'pixi-heaven';
import * as utils from '../utils/draw';
import Matter from 'matter-js';
import { colors } from '../utils/colors';

class BasicShape extends Container {
	constructor(id, options) {
		super()
		this.id = id;
	}

	async init({
		type,
		position: {x, y} = {},
		size: { width, height } = {},
		radius = 10,
		sides,
		slope,
		isStatic,
		debug,
	}) {
		let engine = window.playground.engine
		this.graphics = new PIXI.Graphics();

		// this.addChild(this.graphics);
		this.color = colors[Object.keys(colors)[this.getRandomInt(4)]]

		// TODO: fill shape with random color
		switch (type) {
			case 'rectangle':
				console.log('rectangle')
				this.physicBody = Matter.Bodies.rectangle(
					0, 0, width, height,
					{
						isStatic: isStatic
					});
				break;
			case 'circle':
				this.physicBody = Matter.Bodies.circle(
					0, 0, radius,
					{
						isStatic: isStatic,
						frictionAir: 0.1
					});
				this.radius = radius;
				// this.hitArea = new PIXI.Circle(0, 0, radius);
				break;
			case 'polygon':
				this.physicBody = Matter.Bodies.polygon(
					0, 0, sides, radius,
					{
						isStatic: isStatic
					});
				// console.log(this.physicBody.vertices);
			break;
		}
	
		Matter.Composite.add(engine.world, this.physicBody);
		Matter.Body.setPosition(this.physicBody, this.position)

		// console.log(this.parent)
		this.pivot = {
			x: this.physicBody.position.x - this.physicBody.bounds.min.x,
			y: this.physicBody.position.y - this.physicBody.bounds.min.y,
		}

		let verts = this.physicBody.vertices.reduce((prev, cur)=>{ 
			prev.push(cur.x - this.pivot.x);
			prev.push(cur.y - this.pivot.y);
			return prev;
		}, []);
		
		this.graphics.beginFill(this.color);
		this.graphics.drawPolygon(verts);
		this.graphics.endFill();
		this.sprite = new PIXI.Sprite(window.app.renderer.generateTexture(this.graphics));
			
		// interact with sprite
		this.interactive = true;
		this.buttonMode = true;
		this.selected = false;
		this.addChild(this.sprite);
		this.on('mousedown', this.clickEventHandler)

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

	getEquipSlots() {
		return this.physicBody.vertices.map(item => {
			return {
				slot: {
					x: item.x - this.physicBody.bounds.min.x,
					y: item.y - this.physicBody.bounds.min.y
				}, 
				direction: {x: item.x - this.pivot.x, y: item.y - this.pivot.y}}
		})
	}

	update() {
		this.x = this.physicBody.position.x
		this.y = this.physicBody.position.y
		this.rotation = this.physicBody.angle
	}

	clickEventHandler(e) {
		// unselect last
		if(window.it) {
			window.it.selected = false;
			window.it.alpha = 1.0;
		}

		// select this
		this.selected = !this.selected;
		// console.log("Mousedown")
		if (this.selected) {
			this.alpha = 0.5;
			window.it = this;
		}
		else {
			this.alpha = 1.0;
			window.it = null;
		}
	}


	getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}

	// debug draw function
  addDebugOutline() { 
		this.pivotHint = new Graphics()
     this.pivotHint.lineStyle(2, 0x0000ff)
     this.pivotHint.drawCircle(this.pivot.x, this.pivot.y, 4)
     this.addChild(this.pivotHint)

     const vv = new Array();
     if(this.physicBody.parts.length > 1 ){
       for(var j = 1; j < this.physicBody.parts.length; j++){
         const convex = new Array();
         for(let v of this.physicBody.parts[j].vertices) {
           convex.push(v);
         }
         vv.push(convex);
         // this.physicBody.parts[j].vertices.forEach(v=> {
         //   vv.push({x: v.x, y: v.y})
         // });
       }
       this.line = new utils.MultiPoly(vv);
       this.line.position = {
         x: -(this.physicBody.position.x - this.pivot.x),
         y: -(this.physicBody.position.y - this.pivot.y)
       }
       this.addChild(this.line);
       return;
     } else {
       this.physicBody.parts[0].vertices.forEach(v=> {
         vv.push({x: v.x, y: v.y})
       });
     }

     this.line = new utils.Polygon(vv);
     this.line.position = {
       x: -(this.physicBody.position.x - this.pivot.x),
       y: -(this.physicBody.position.y - this.pivot.y)
     }
     this.addChild(this.line)
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

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  // debug draw function
  addDebugOutline() {
    this.pivotHint = new Graphics();
    this.pivotHint.lineStyle(2, 0x0000ff);
    this.pivotHint.drawCircle(this.pivot.x, this.pivot.y, 4);
    this.addChild(this.pivotHint);

    const vv = new Array();
    if (this.physicBody.parts.length > 1) {
      for (var j = 1; j < this.physicBody.parts.length; j++) {
        const convex = new Array();
        for (let v of this.physicBody.parts[j].vertices) {
          convex.push(v);
        }
        vv.push(convex);
        // this.physicBody.parts[j].vertices.forEach(v=> {
        //   vv.push({x: v.x, y: v.y})
        // });
      }
      this.line = new utils.MultiPoly(vv);
      this.line.position = {
        x: -(this.physicBody.position.x - this.pivot.x),
        y: -(this.physicBody.position.y - this.pivot.y),
      };
      this.addChild(this.line);
      return;
    } else {
      this.physicBody.parts[0].vertices.forEach((v) => {
        vv.push({ x: v.x, y: v.y });
      });
    }

    this.line = new utils.Polygon(vv);
    this.line.position = {
      x: -(this.physicBody.position.x - this.pivot.x),
      y: -(this.physicBody.position.y - this.pivot.y),
    };
    this.addChild(this.line);
  }
}

export default BasicShape;
