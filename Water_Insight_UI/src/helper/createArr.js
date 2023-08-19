
function createArr(len = 1) {
  return Array(len).fill("").map((_, i) => i)
}

export default createArr