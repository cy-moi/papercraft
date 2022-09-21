import * as PIXI from 'pixi.js';
import Matter from 'matter-js';

export class Line extends PIXI.Graphics {
  constructor(points, lineSize, lineColor) {
    super();

    this.lineWidth = lineSize || 2;
    this.lineColor = lineColor || "0x0000ff";

    this.points = points;

    this.lineStyle(this.lineWidth, this.lineColor)

    this.moveTo(points[0], points[1]);
    this.lineTo(points[2], points[3]);
  }

  updatePoints(p) {
    if (!p) return;
    this.points = p.map((val, index) => val || this.points[index]);

    this.clear();
    this.lineStyle(this.lineWidth, this.lineColor);
    this.moveTo(this.points[0], this.points[1]);
    this.lineTo(this.points[2], this.points[3]);
  }
}

export class Polygon extends PIXI.Graphics {
  constructor(points, lineSize, lineColor) {
    super();
    this.lineWidth = lineSize || 2;
    this.lineColor = lineColor || "0x0000ff";
    this.points = points || [{ x: 0, y: 0 }];
    // if(points.length == 0) return;
    this.drawPoly(this.lineWidth, this.lineColor, this.points);
  }

  updatePoints(p) {
    if (!p) return;
    this.points = p.map((val, index) => val || this.points[index]);

    this.clear();
    this.drawPoly(this.lineWidth, this.lineColor, this.points);
  }

  drawPoly(s, c, p) {
    this.lineStyle(s, c)
    for (let i = 0; i < p.length; i++) {
      if (i === 0) this.moveTo(p[i].x, p[i].y);
      else this.lineTo(p[i].x, p[i].y)
    }
    this.lineTo(p[0].x, p[0].y)
  }
}

export class DrawVector extends PIXI.Graphics {
  constructor(startPoint, matterVec, len, lineSize, lineColor) {
    super();

    this.lineWidth = lineSize || 2;
    this.lineColor = lineColor || "0x03fcf4";
    this.length = len || 100;

    this.startPoint = startPoint;
    this.vec = matterVec
    const tempVec = Matter.Vector.mult(this.vec, this.length);

    this.lineStyle(this.lineWidth, this.lineColor);

    this.moveTo(startPoint.x, startPoint.y);
    this.lineTo(tempVec.x + startPoint.x, tempVec.y + startPoint.y);
  }

  updatePoints(p, v, len) {
    this.point = p || this.startPoint;
    this.length = len || 50;

    this.clear();
    this.lineStyle(this.lineWidth, this.lineColor);
    this.moveTo(this.point.x, this.point.y);
    this.lineTo(this.point.x + v.x * this.length, this.point.y + v.y * this.length);
  }

  updateLen(len) {
    this.length = len || 10;

    this.clear();
    this.lineStyle(this.lineWidth, this.lineColor);
    const tempVec = Matter.Vector.mult(this.vec, this.length)
    this.moveTo(this.startPoint.x, this.startPoint.y);
    this.lineTo(tempVec.x + this.startPoint.x, tempVec.y + this.startPoint.y);
  }
}
export class Rgb {
  constructor(r, g, b) {
    this.r = r
    this.g = g
    this.b = b
  }

  rgbToHex() {
    return (
      `0x${
        ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b)
          .toString(16)
          .slice(1)}`
    )
  }

  debug() {
    return `R: ${this.r},G: ${this.g},B: ${this.b}`
  }

  toDisplay() {
    return `(${this.r}, ${this.g}, ${this.b})`
  }

  equal(rgb) {
    return this.r === rgb.r && this.g === rgb.g && this.b === rgb.b
  }
}
