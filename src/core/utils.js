import config from './config';

export function fit(element, { width, height, percent = 1 },
                    ignoreRatio = false, overscale = false) {
  const { width: widthGame, height: heightGame } = config.game
  // console.log(widthGame, heightGame)
  const wScale = width / widthGame;
  const hScale = height / heightGame;
  // console.log('wScale, hScale', wScale, hScale)
  const max = overscale ? Infinity : 1;
  let scale = Math.min(wScale, hScale, max) * percent

  /* eslint-disable no-param-reassign */
  element.scale.x = (ignoreRatio ? wScale : scale)
  element.scale.y = (ignoreRatio ? hScale : scale)
  /* eslint-enable no-param-reassign */
}

/**
 * @desc centers a display /vertically, horizontally or both/ object into its parent
 * @param {PIXI.DisplayObject} element
 * @param {Number} width
 * @param {Number} height
 * @param {Boolean} vertically
 * @param {Boolean} horizontally
 */
export function center(element, { width, height },
  { vertically = true, horizontally = true } = {}) {
  /* eslint-disable no-param-reassign */
  element.x = horizontally ? (width / 2) - (element.width / 2) : element.x;
  element.y = vertically ? (height / 2) - (element.height / 2) : element.y;
  /* eslint-enable no-param-reassign */
}



export function angleBetween(vectorA, vectorB) {
  let angleA = Math.atan2(vectorA.y, vectorA.x)
  // console.log(vectorA, angleA)
  let angleB = Math.atan2(vectorB.y, vectorB.x)
  // console.log(vectorB, angleB)

  return angleB - angleA
  // return Math.acos(Matter.Vector.dot(vectorA, vectorB)/(Matter.Vector.magnitude(vectorA)*Matter.Vector.magnitude(vectorB)))
}



