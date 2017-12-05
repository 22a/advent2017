const fs = require('fs')

const contents = fs.readFileSync('../input.txt', 'utf8')

const instructions = contents.split('\n').filter(line => line !== '').map(s => parseInt(s))

let jumps = 0
let currentIndex = 0

while (true) {
  jumps++
  const currentMotion = instructions[currentIndex]
  const nextIndex = currentIndex + currentMotion
  if (nextIndex < 0 || nextIndex >= instructions.length) {
    break
  }
  instructions[currentIndex] += currentMotion >= 3 ? -1 : 1
  currentIndex = nextIndex
}

console.log(jumps)
