export function angleBetween(vectorA, vectorB) {
  let angleA = Math.atan2(vectorA.y, vectorA.x)
  let angleB = Math.atan2(vectorB.y, vectorB.x)

  return angleB - angleA
}