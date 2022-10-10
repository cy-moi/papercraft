export function angleBetween(vectorA, vectorB) {
  const angleA = Math.atan2(vectorA.y, vectorA.x);
  const angleB = Math.atan2(vectorB.y, vectorB.x);

  return angleB - angleA;
}

/*
 * This is for PIXI containers ONLY.
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
