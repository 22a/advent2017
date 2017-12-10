const fs = require('fs')

const contents = fs.readFileSync('../input.txt', 'utf8')
const lengths = contents.split('\n').filter(line => line !== '')[0].split(',').map(num => parseInt(num))

const scratchListLength = 256
let scratchList = []
for (let i = 0; i < scratchListLength; i++) {
  scratchList.push(i)
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

for (const length of lengths) {
  if (length > 1) {
    const targetSublist = getTargetSublist(scratchList, currentPosition, length)
    const reversedSublist = targetSublist.reverse()
    scratchList = replaceSublist(scratchList, currentPosition, length, reversedSublist)
  }
  currentPosition = (currentPosition + length + skipSize) % scratchList.length
  skipSize++
}

console.log(scratchList[0] * scratchList[1])
