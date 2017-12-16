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
  let newOrder = []
  switch (move.type) {
    case 'spin':
      order.map((char, index) => {
        newOrder[(index + move.amount) % order.length] = order[index]
      })
      break
    case 'exchange':
      newOrder = order.concat()
      const xVal = order[move.posX]
      const yVal = order[move.posY]
      newOrder[move.posX] = yVal
      newOrder[move.posY] = xVal
      break
    case 'partner':
      newOrder = order.concat()
      newOrder[order.indexOf(move.targetX)] = move.targetY
      newOrder[order.indexOf(move.targetY)] = move.targetX
      break
    default:
      throw new Error(`what sort of dance move is ${move} ?!?`)
  }
  return newOrder
}

for (let move of danceMoves) {
  order = applyDanceMove(order, move)
}

console.log(order.join(''))

// console.log(applyDanceMove(['a', 'b', 'c'], {type: 'spin', amount: 1}))
// console.log(applyDanceMove(['a', 'b', 'c'], {type: 'exchange', xPos: 0, yPos: 2}))
// console.log(applyDanceMove(['a', 'b', 'c'], {type: 'partner', targetY: 'a', targetX: 'b'}))
