const fs = require('fs')

const contents = fs.readFileSync('../input.txt', 'utf8')
const lengths = contents.split('\n').filter(line => line !== '')[0].split(',')

let xOffset = 0
let yOffset = 0

for (let length of lengths) {
  switch (length) {
    case 'n':
      yOffset += 1
      break
    case 's':
      yOffset -= 1
      break
    case 'ne':
      yOffset += 0.5
      xOffset += 0.5
      break
    case 'nw':
      yOffset += 0.5
      xOffset -= 0.5
      break
    case 'se':
      yOffset -= 0.5
      xOffset += 0.5
      break
    case 'sw':
      yOffset -= 0.5
      xOffset -= 0.5
      break
    default:
  }
}

console.log(Math.abs(xOffset) + Math.abs(yOffset))
