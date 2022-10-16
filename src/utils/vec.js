export function angleBetween(vectorA, vectorB) {
  // console.log(vectorA, vectorB);
  const angleA = Math.atan2(vectorA.y, vectorA.x);
  const angleB = Math.atan2(vectorB.y, vectorB.x);

  return angleB - angleA;
}

// function dotProduct(a, b) {
//   return a.x * b.x + a.y * b.y;
// }

/*
 * This function is for PIXI containers ONLY.
 * source: https://www.html5gamedevs.com/topic/24408-collision-detection/?do=findComment&comment=139535
 * */
export function containersIntersect(a, b) {
  const ab = a.getBounds();
  const bb = b.getBounds();
  return (
    ab.x + ab.width > bb.x &&
    ab.x < bb.x + bb.width &&
    ab.y + ab.height > bb.y &&
    ab.y < bb.y + bb.height
  );
}

export function circleIntersect(center, r, container) {
  const ab = container.position;
  const { x, y } = center;
  return (x - ab.x) ** 2 + (y - ab.y) ** 2 < r ** 2;
}

export function getSquaredDistance(pt1, pt2) {
  return (pt1.x - pt2.x) ** 2 + (pt1.y - pt2.y) ** 2;
}

export function polygonIntersect(verts, container) {
  // const ab = container.getBounds();

  // (y - y0) (x1 - x0) - (x - x0) (y1 - y0)
  const { x, y } = container.position;
  // console.log(x, y, verts);
  return verts.slice(0).reduce((inside, v, ind, arr) => {
    // console.log(inside);
    if (!inside) arr.splice(1);
    const next = (ind + 1) % arr.length;
    // console.log(next);
    // console.log(
    //  (- y + v.y) * (arr[next].x - v.x) - (x - v.x) * (arr[next].y - v.y), inside);
    return (
      (-y + v.y) * (arr[next].x - v.x) - (x - v.x) * (-arr[next].y + v.y) < 0 &&
      inside
    );
  }, true);
}
