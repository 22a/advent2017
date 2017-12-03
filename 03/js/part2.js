const getNextDirection = currentDirection => {
  switch (currentDirection) {
    case 'right':
      return 'up'
    case 'up':
      return 'left'
    case 'left':
      return 'down'
    case 'down':
      return 'right'
    default:
      throw new Error(`${currentDirection} is not a valid direction pattern`)
  }
}

// I started out with 1000x1000 here, but it turns out the spiral for
// this target input fits in like 12x12
const arraySize = 16
let currentY = arraySize / 2
let currentX = arraySize / 2
let currentDirection = 'right'
let currentPathLength = 1
let currentPathLengthSeenBefore = false
let distanceOnCurrentPath = 0
let array = []

for (let i = 0; i < arraySize; i++) {
  array.push([])
  for (let j = 0; j < arraySize; j++) {
    array[i].push(0)
  }
}

array[currentY][currentX] = 1

const firstSpiralValLargerThanTarget = targetValue => {
  while (true) {
    if (distanceOnCurrentPath >= currentPathLength) {
      // change direction, set new path length, reset distance on current path
      currentDirection = getNextDirection(currentDirection)
      if (currentPathLengthSeenBefore) {
        currentPathLength++
        currentPathLengthSeenBefore = false
      } else {
        currentPathLengthSeenBefore = true
      }
      distanceOnCurrentPath = 0
    }

    // move along the current path to next step
    switch (currentDirection) {
      case 'right':
        currentX++
        break
      case 'up':
        currentY--
        break
      case 'left':
        currentX--
        break
      case 'down':
        currentY++
        break
      default:
        throw new Error(`${currentDirection} is not a valid direction pattern`)
    }

    // calculate the value at the current step
    let currentNeighbourSum = 0
    for (let y = currentY - 1; y <= currentY + 1; y++) {
      for (let x = currentX - 1; x <= currentX + 1; x++) {
        currentNeighbourSum += array[y][x]
      }
    }

    distanceOnCurrentPath++
    array[currentY][currentX] = currentNeighbourSum

    // check if it is greater than target
    if (currentNeighbourSum > targetValue) {
      return currentNeighbourSum
    }
    currentNeighbourSum = 0
  }
}

const targetValue = 277678
console.log(firstSpiralValLargerThanTarget(targetValue))
