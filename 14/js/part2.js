const fs = require('fs')

const contents = fs.readFileSync('../input.txt', 'utf8')
const input = contents.split('\n').filter(line => line !== '')[0]

// I'm sorry that you have to read this
const knotHash = (inputString) => {
  const lengths = inputString.split('').map(char => char.charCodeAt())

  const scratchListLength = 256
  let scratchList = []
  for (let i = 0; i < scratchListLength; i++) {
    scratchList.push(i)
  }

  const staticLengthsSuffix = [17, 31, 73, 47, 23]
  for (const length of staticLengthsSuffix) {
    lengths.push(length)
  }

  let currentPosition = 0
  let skipSize = 0

  const getTargetSublist = (list, startPos, sublistLength) => {
    if (startPos + sublistLength > list.length) {
      // need to wrap
      const endIndex = (startPos + sublistLength) - list.length
      const first = list.slice(startPos, list.length + 1)
      const second = list.slice(0, endIndex)
      return first.concat(second)
    } else {
      // don't need to wrap
      return list.slice(startPos, startPos + sublistLength)
    }
  }

  const replaceSublist = (list, startPos, sublistLength, newSublist) => {
    const newList = list
    if (startPos + sublistLength > list.length) {
      // need to wrap
      const firstLength = list.length - startPos
      const secondLength = (startPos + sublistLength) - list.length
      for (let i = 0; i < firstLength; i++) {
        scratchList[startPos + i] = newSublist[i]
      }
      for (let i = 0; i < secondLength; i++) {
        scratchList[i] = newSublist[firstLength + i]
      }
    } else {
      // don't need to wrap
      for (let i = 0; i < sublistLength; i++) {
        scratchList[startPos + i] = newSublist[i]
      }
    }
    return newList
  }

  const hashIterations = 64

  for (let i = 0; i < hashIterations; i++) {
    for (const length of lengths) {
      if (length > 1) {
        const targetSublist = getTargetSublist(scratchList, currentPosition, length)
        const reversedSublist = targetSublist.reverse()
        scratchList = replaceSublist(scratchList, currentPosition, length, reversedSublist)
      }
      currentPosition = (currentPosition + length + skipSize) % scratchList.length
      skipSize++
    }
  }

  const denseHashLength = 16
  let rowBinary = []

  for (let i = 0; i < scratchList.length; i += denseHashLength) {
    const sparseHashSubset = scratchList.slice(i, i + (scratchList.length / denseHashLength))
    const xorRes = sparseHashSubset.reduce((acc, b) => acc ^ b)
    const binaryString = xorRes.toString(2)
    const leftPad = []
    for (let p = 0; p < 8 - binaryString.length; p++) {
      leftPad.push(0)
    }
    const thisHalfWord = leftPad.concat(binaryString.split('').map(bitString => parseInt(bitString)))
    rowBinary.push(thisHalfWord)
  }

  return [].concat.apply([], rowBinary)
}

let workSquare = []

for (let i = 0; i < 128; i++) {
  workSquare.push(knotHash(`${input}-${i}`))
}

const metaBoard = workSquare.map(row =>
  row.map(bit => ({bit, group: undefined}))
)

const markGroup = (board, x, y, currentGroupNum) => {
  board[x][y].group = currentGroupNum

  if (x < 127 && board[x + 1][y].bit === 1 && !board[x + 1][y].group) {
    markGroup(board, x + 1, y, currentGroupNum)
  }
  if (x > 0 && board[x - 1][y].bit === 1 && !board[x - 1][y].group) {
    markGroup(board, x - 1, y, currentGroupNum)
  }
  if (y < 127 && board[x][y + 1].bit === 1 && !board[x][y + 1].group) {
    markGroup(board, x, y + 1, currentGroupNum)
  }
  if (y > 0 && board[x][y - 1].bit === 1 && !board[x][y - 1].group) {
    markGroup(board, x, y - 1, currentGroupNum)
  }
}

let numGroups = 0

for (let i = 0; i < 128; i++) {
  for (let j = 0; j < 128; j++) {
    if (metaBoard[i][j].bit === 1) {
      if (!metaBoard[i][j].group) {
        numGroups++
        markGroup(metaBoard, i, j, numGroups)
      }
    }
  }
}

console.log(numGroups)
