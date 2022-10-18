import Playground from './Playground';
import { Container } from 'pixi.js';

/**
 * Initializes the game.
 */
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

  onResize({ width, height, percent = 1 }) {
    this.playground.onResize({ width, height, percent });
  }
}
