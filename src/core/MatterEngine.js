import Matter from "matter-js"

export function initEngine(w, h) {
  const engine = Matter.Engine.create({
    options: {
      width: w,
      height: h
    },
    gravity: {
      x: 0,
      y: 0,
      scale: 0.001
    }
  })
  return engine;
}

export function addRectBody(world, pos, w, h, option) {
  const obj = Matter.Bodies.rectangle(pos.x, pos.y, w, h, option);
  Matter.World.add(world, obj);

  return obj;
}

export function addBody(world, body) {
  Matter.World.add(world, body);
}

export function beforeUpdateImpulse(engine, physicBody, lastPos) {
  Matter.Events.on(engine, 'beforeUpdate');
}

export function addFromSVG(world, addr, pos, isStatic) {
  let obj;
  if (typeof fetch !== 'undefined') {
    const select = function (root, selector) {
      return Array.prototype.slice.call(root.querySelectorAll(selector));
    };

    const loadSvg = function (url) {
      console.log(url)
      return fetch(url)
        .then((response) => response.text())
        .then((raw) => (new window.DOMParser()).parseFromString(raw, 'image/svg+xml'));
    };

    loadSvg(addr)
      .then((root) => {
        const paths = select(root, 'path');
        const vertexSets = paths.map((path) => Matter.Svg.pathToVertices(path, 30));

        obj = Matter.Bodies.fromVertices(pos.x, pos.y, vertexSets, {
          isStatic,
        }, true);
        Matter.World.add(world, obj);
      });
  } else {
    throw new Error('Fetch is not available. Could not load SVG.');
  }
  return obj
}
