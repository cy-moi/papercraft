import { Sprite } from 'pixi.js';
import Scene from './Scene';
import {initEngine, addRectBody} from '../core/MatterEngine'
import {Runner, Engine} from 'matter-js'
import config from '../config';

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

    var options = {
      fps: config.runner.fps
    }
    this.runner = Runner.create(options);


    // this.start(config.runner.tickCountMax)

    this.tickCount = 0;
    const tickCountMax = config.runner.tickCountMax

    await this.mountingTimeUi()
    const onTick = () => {
      Engine.update(this.engine, 1000 / config.runner.fps)
      window.app.ticker.update()
      this.craftAll.forEach(it => {
        it.update()
      })
      this.tickCount++;
      // this.timePanel.toggleCount()
    }

    this.intervalTick =  setInterval(() => {
      if (this.tickCount > tickCountMax) {
        clearInterval(this.intervalTick)
      }
      requestAnimationFrame(onTick)
    }, 1000 / config.runner.fps)

    // setTimeout(() => {
    //   this.showGameOver(false)
    // }, 3000)
    // setTimeout(() => {
    //   this.closeGameOver()
    // }, 10000)
  }

  start(tickCountMax) {
    if (this.intervalTick) {
      clearInterval(this.intervalTick)
    }
    this.tickCount = 0;
    this.intervalTick =  setInterval(() => {
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

  async onCreated() {
  }

  /**
   * Show the gameover pad
   * @param {boolean} isWinning - true代表显示成功面板，false代表显示失败面板
   * @param {string} text - 想要显示在面板下的内容，有提示信息的作用。
   */
  showGameOver(isWinning = true, text) {
    ShowGameOver(isWinning, text)
  }
  /**
   * 关掉gameover显示板
   */
  closeGameOver() {
    CloseGameOver()
  }

  onResize({ width, height, percent = 1 }) {
  }
  async mountingTimeUi() {
    if('dashboard' in window && !dashboard.timePanel) {
      await dashboard.createTimePanel()
      this.timePanel = dashboard.timePanel
    }
  }
  reset() {
    this.tickCount = 0
    this.closeGameOver()
  }
}
