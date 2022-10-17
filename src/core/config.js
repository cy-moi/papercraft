export default {
  view: {
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0xffffff,
    worldWidth: window.innerWidth,
    worldHeight: window.innerHeight,
    fit: true,
    center: true,
    percent: 0.8,
    antialias: true,
  },
  game: {
    width: window.innerWidth,
    height: window.innerHeight,
    drag: true,
    pinch: true,
    decelerate: true,
    wheel: true,
  },
  scenes: {
    Splash: {
      hideDelay: 0,
    },
  },
  assets: {
    root: '/',
  },
  runner: {
    fpsBase: 30, // fpsBase is the absolute ratio of time and tick count
    fps: 25, // fps is the frequency of the runner tick
    tickCountMax: Infinity,
  },
  footerTextStyle: {
    // To see the effect, click 'https://pixijs.io/pixi-text-style/'.
    fill: 'white',
    fontFamily: 'Comic Sans MS',
    fontWeight: 'bold',
    padding: 5,
  },
  dialogTextStyle: {
    breakWords: true,
    fill: 'white',
    fontFamily: '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
    fontSize: 14,
    stroke: 'white',
    wordWrap: true,
    wordWrapWidth: 180,
  },
};
