const fs = require('fs')

const contents = fs.readFileSync('../input.txt', 'utf8')
const danceMoveStrings = contents.split('\n').filter(line => line !== '')[0].split(',')

const parseDanceMoveString = str => {
  switch (str[0]) {
    case 's':
      return {
        type: 'spin',
        amount: parseInt(str.substring(1))
      }
    case 'x':
      const [posX, posY] = str.substring(1).split('/').map(pos => parseInt(pos))
      return {
        type: 'exchange',
        posX,
        posY
      }
    case 'p':
      const [targetX, targetY] = str.substring(1).split('/')
      return {
        type: 'partner',
        targetX,
        targetY
      }
    default:
      throw new Error(`what sort of command is ${str} ?!?`)
  }
}

const danceMoves = danceMoveStrings.map(parseDanceMoveString)

let order = []

for (let c = 'a'.charCodeAt(); c <= 'p'.charCodeAt(); c++) {
  order.push(String.fromCodePoint(c))
}

const applyDanceMove = (order, move) => {
  switch (move.type) {
    case 'spin':
      const oldOrder = order.concat()
      order.map((char, index) => {
        order[(index + move.amount) % order.length] = oldOrder[index]
      })
      break
    case 'exchange':
      const xVal = order[move.posX]
      const yVal = order[move.posY]
      order[move.posX] = yVal
      order[move.posY] = xVal
      break
    case 'partner':
      order[order.indexOf(move.targetX)] = move.targetY
      order[order.indexOf(move.targetY)] = move.targetX
      break
    default:
      throw new Error(`what sort of dance move is ${move} ?!?`)
  }
  return order
}

// lol this thing will take 30 days to finish execution on my machine, will
// need something 2/3 orders of magnitude quicker
for (let i = 0; i < 1000000000; i++) {
  if (i % 1000 === 0) {
    console.log(i)
  }
  for (let move of danceMoves) {
    order = applyDanceMove(order, move)
  }
}

console.log(order.join(''))
