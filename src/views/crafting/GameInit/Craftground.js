import { Application } from 'pixi.js';
import config from './config';
import Game from './Game';
import { Viewport } from 'pixi-viewport';
import { center, fit } from 'Core/utils';
import gsap from 'gsap';
import pixi from 'gsap/PixiPlugin';
// import { EventSystem } from '@pixi/events';
import * as PIXI from 'pixi.js';

gsap.registerPlugin(pixi);
export default class CraftApp extends Application {
  constructor() {
    super(config.view);
    this.config = config;
    // this.renderer.addSystem(EventSystem, 'events');
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

    this.setupViewport();

    this.viewport.addChild(bg);
    this.game = new Game();
    this.viewport.addChild(this.game);

    await this.game.init();

    this.onResize({
      width: window.innerWidth,
      height: window.innerHeight,
      percent: 1,
    });

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
    let viewport = new Viewport({
      screenWidth: this.config.view.width,
      screenHeight: this.config.view.height,
      worldWidth: this.config.game.width,
      worldHeight: this.config.game.height,
      interaction: this.renderer.plugins.interaction,
    });

    document.body.appendChild(this.view);

    viewport = viewport.clamp({
      left: 0,
      right: viewport.worldWidth,
      underflow: 'top-left',
      top: 0,
      bottom: viewport.worldHeight,
    });

    viewport.clampZoom({ minScale: 0.8, maxScale: 1.2 });

    viewport.on('zoomed', function (groundTexture) {
      const bg = this.children[0];

      // const groundTexture = PIXI.Texture.from('assets/bg.png');

      bg.width = Math.max(this.screenWidth / this.scale.x, window.innerWidth);
      bg.height = Math.max(
        this.screenHeight / this.scale.y,
        window.innerHeight,
      );
    });

    this.stage.addChild(viewport);

    if (this.config.game.drag) viewport.drag();
    if (this.config.game.pinch) viewport.pinch();
    if (this.config.game.wheel) viewport.wheel();
    if (this.config.game.decelerate) viewport.decelerate();

    this.viewport = viewport;
  }

  onResize({ width, height, percent = 1 }) {
    this.renderer.resize(width, height);

    // this.bg.width = width;
    // this.bg.height = height;

    if (this.config.view.fit) {
      fit(this.game, { width, height, percent });
    }

    if (this.config.view.center) {
      center(this.game, { width, height });
    }
    this.game.onResize({ width, height, percent });
  }

  // static test = () => {
  //   // const position = { x: 100, y: 0 }
  //   console.log('test');
  // };
}
