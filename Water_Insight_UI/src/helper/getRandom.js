function getRandom(min, max, pointWith = 0) {
  const num = Math.random() * (max - min + 1) + min

  if (pointWith) return Number(num).toFixed(pointWith)
  return Math.floor(num)
}

export default getRandom