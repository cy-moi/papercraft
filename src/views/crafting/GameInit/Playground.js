import { Sprite } from 'pixi.js';
import Scene from 'Core/Scene';
import { initEngine } from 'Core/MatterEngine'
import { Runner, Engine } from 'matter-js'
import config from './config';

export default class Playground extends Scene {
  constructor() {
    super()
    this.craftAll = []
    this.engine = null
    this.runner = null
    this.phase = 'idle'
  }

  async init() {
    const ground = new Sprite();
    ground.width = 900
    ground.height = 990
    // ground.anchor = 0.5
    ground.x = 500 - ground.width / 2
    ground.y = 500 - ground.height / 2

    this.addChild(ground);

    this.engine = initEngine(this.width, this.height);

    const options = {
      fps: config.runner.fps
    }
    this.runner = Runner.create(options);

    // this.start(config.runner.tickCountMax)

    this.tickCount = 0;
    const { tickCountMax } = config.runner

    const onTick = () => {
      Engine.update(this.engine, 1000 / config.runner.fps)
      window.app.ticker.update()
      this.craftAll.forEach(it => {
        it.update()
      })
      this.tickCount++;
      // this.timePanel.toggleCount()
    }

    this.intervalTick = setInterval(() => {
      if (this.tickCount > tickCountMax) {
        clearInterval(this.intervalTick)
      }
      requestAnimationFrame(onTick)
    }, 1000 / config.runner.fps)
  }

  start(tickCountMax) {
    if (this.intervalTick) {
      clearInterval(this.intervalTick)
    }
    this.tickCount = 0;
    this.intervalTick = setInterval(() => {
      if (this.tickCount > tickCountMax) {
        clearInterval(this.intervalTick)
      }
      requestAnimationFrame(this.onTick.bind(this))
    }, 1000 / config.runner.fps)
  }

  stop() {
    if (this.intervalTick) {
      clearInterval(this.intervalTick)
    }
  }

  onTick() {
    Engine.update(this.engine, 1000 / config.runner.fps)
    window.app.ticker.update()
    this.craftAll.forEach(it => {
      it.update()
    })

    this.tickCount++;
  }

  // async onCreated() {
  // }

  // onResize({ width, height, percent = 1 }) {
  // }

  reset() {
    this.tickCount = 0
  }
}
