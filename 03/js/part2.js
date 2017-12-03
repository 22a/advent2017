// As a stress test on the system, the programs here clear the grid and then store the value 1 in square 1. Then, in the same allocation order as shown above, they store the sum of the values in all adjacent squares, including diagonals.

// So, the first few squares' values are chosen as follows:

// Square 1 starts with the value 1.
// Square 2 has only one adjacent filled square (with value 1), so it also stores 1.
// Square 3 has both of the above squares as neighbors and stores the sum of their values, 2.
// Square 4 has all three of the aforementioned squares as neighbors and stores the sum of their values, 4.
// Square 5 only has the first and fourth squares as neighbors, so it gets the value 5.
// Once a square is written, its value does not change. Therefore, the first few squares would receive the following values:

// 147  142  133  122   59
// 304    5    4    2   57
// 330   10    1    1   54
// 351   11   23   25   26
// 362  747  806--->   ...
// What is the first value written that is larger than your puzzle input?

// Your puzzle input is still 277678.

const targetValue = 277678

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

// I started out with 1000x1000 here, turns out it fits in like 12x12
const arraySize = 16
let notFound = true
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

while (notFound) {
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
      const foo = array[y][x]
      currentNeighbourSum += foo
    }
  }
  distanceOnCurrentPath++
  array[currentY][currentX] = currentNeighbourSum
  // check if it is greater than target
  if (currentNeighbourSum > targetValue) {
    // console.log(JSON.stringify(array))
    console.log(currentNeighbourSum)
    notFound = false
  }
  currentNeighbourSum = 0
}
