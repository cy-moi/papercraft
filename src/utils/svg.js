// import { Project, Path } from 'paper'

async function loadSvg(url) {
  return fetch(url)
    .then(res => res.text())
    .then(data => (new DOMParser()).parseFromString(data, 'image/svg+xml'))
    .then(doc => doc.querySelector('svg'))
}

function getVertexSetOfSvg(svg) {
  // const pathNode = svg.querySelector('path')
  // // console.log(pathNode)
  // const d = pathNode.getAttribute("d")
  // // console.log(d)
  // new Project();
  // const pitem = new Path(d);
  // // console.log(pitem.segments)
  // const vertexSet = pitem.segments.map(it => ({ x: it.point.x, y: it.point.y}))
  // // console.log(vertexSet)
  // return vertexSet
}

function getSizeOfSvg(svg) {
  // // console.log(svg)
  // const width = parseFloat(svg.getAttribute('width'))
  // const height = parseFloat(svg.getAttribute('height'))
  // return { width, height }
}

export {
  loadSvg,
  getVertexSetOfSvg,
  getSizeOfSvg,
}