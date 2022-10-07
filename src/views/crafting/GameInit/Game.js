import Playground from './Playground';
import { Container } from 'pixi.js-legacy';

export default class Game extends Container {
  constructor() {
    super();
    this.playground = null;
  }

  async init() {
    this.playground = new Playground();
    await this.playground.init();
    this.addChild(this.playground);
    window.playground = this.playground;
    window.dispatchEvent(new Event('gameInit'));
  }

  // switchScene(constructor) {
  // this.removeChild(this.currentScene);
  // this.currentScene = new constructor();
  // this.addChild(this.currentScene);

  // return this.currentScene.onCreated();
  // }

  onResize({ width, height, percent = 1 }) {
    this.playground.onResize({ width, height, percent });
  }
}
