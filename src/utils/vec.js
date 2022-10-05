export function angleBetween(vectorA, vectorB) {
  const angleA = Math.atan2(vectorA.y, vectorA.x);
  const angleB = Math.atan2(vectorB.y, vectorB.x);

  return angleB - angleA;
}
