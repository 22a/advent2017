const fs = require('fs')

const equal = (xs, ys) => {
  for (const i in xs) {
    if (xs[i] !== ys[i]) {
      return false
    }
  }
  return true
}

const memoryStateSeenBefore = (state, previousStates) => {
  for (let i = 0; i < previousStates.length; i++) {
    if (equal(state, previousStates[i])) {
      return true
    }
  }
  return false
}

const memoryStateSeenBeforeAtIndex = (state, previousStates) => {
  for (let i = 0; i < previousStates.length; i++) {
    if (equal(state, previousStates[i])) {
      return i
    }
  }
  return -1
}

const indexOfLargest = list => {
  let lIndex = 0
  let lValue = list[lIndex]
  list.map((val, index) => {
    if (val > lValue) {
      lIndex = index
      lValue = val
    }
  })
  return lIndex
}

const redistribute = (list, startingIndex) => {
  list = [].concat(list)
  let valueToBeDistributed = list[startingIndex]
  list[startingIndex] = 0
  for (let i = 1; i <= valueToBeDistributed; i++) {
    list[(startingIndex + i) % list.length]++
  }
  return list
}

const contents = fs.readFileSync('../input.txt', 'utf8')
const startingMemory = contents.split('\n')[0].split('\t').map(s => parseInt(s))
let currentMemoryState = [].concat(startingMemory)
let numTransformations = 0
const previousMemoryStates = [startingMemory]

while (true) {
  const redirIndex = indexOfLargest(currentMemoryState)
  currentMemoryState = redistribute(currentMemoryState, redirIndex)
  numTransformations++

  if (memoryStateSeenBefore(currentMemoryState, previousMemoryStates)) {
    const start = memoryStateSeenBeforeAtIndex(currentMemoryState, previousMemoryStates)
    console.log(numTransformations)
    console.log(start)
    console.log(numTransformations - start)
    break
  }
  previousMemoryStates.push(currentMemoryState)
}
