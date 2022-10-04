import { Application } from 'pixi.js';
import config from './config';
import Game from './Game';
import { Viewport } from 'pixi-viewport';
import { center, fit } from 'Core/utils';
import gsap from 'gsap';
import pixi from 'gsap/PixiPlugin';
import * as PIXI from 'pixi.js';

gsap.registerPlugin(pixi);
export default class CraftApp extends Application {
  constructor() {
    super(config.view);
    this.config = config;
  }

  async init() {
    animate();

    function animate() {
      requestAnimationFrame(animate);
    }

    // this.test();
    const groundTexture = PIXI.Texture.from('assets/bg.png');

    /* create a tiling sprite ...
     * requires a texture, a width and a height
     * in WebGL the image size should preferably be a power of two
     */
    const bg = new PIXI.TilingSprite(
      groundTexture,
      this.screen.width,
      this.screen.height,
    );

    // this.stage.addChild(bg);
    // this.bg = bg;

    this.setupViewport();

    this.game = new Game();
    this.viewport.addChild(bg);
    this.bg = bg;
    this.viewport.addChild(this.game);

    await this.game.init();

    this.onResize(this.config.view);

    window.addEventListener('resize', (event) => {
      // console.log(window.innerWidth, window.innerHeight)
      this.onResize({
        width: window.innerWidth,
        height: window.innerHeight,
        percent: 0.8,
      });
    });
  }

  setupViewport() {
    const viewport = new Viewport({
      screenWidth: this.config.view.width,
      screenHeight: this.config.view.height,
      worldWidth: this.config.game.width,
      worldHeight: this.config.game.height,
      interaction: this.renderer.plugins.interaction,
    });

    document.body.appendChild(this.view);

    this.stage.addChild(viewport);

    if (this.config.game.drag) viewport.drag();
    if (this.config.game.pinch) viewport.pinch();
    if (this.config.game.wheel) viewport.wheel();
    if (this.config.game.decelerate) viewport.decelerate();

    this.viewport = viewport;
  }

  onResize({ width, height, percent = 1 }) {
    this.renderer.resize(width, height);

    this.bg.width = width;
    this.bg.height = height;

    if (this.config.view.fit) {
      fit(this.game, { width, height, percent });
    }

    if (this.config.view.center) {
      center(this.game, { width, height });
    }
    this.game.onResize({ width, height, percent });
  }

  static test = () => {
    // const position = { x: 100, y: 0 }
    console.log('test');
  };
}
