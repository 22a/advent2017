// You come across an experimental new kind of memory stored on an infinite two-dimensional grid.

// Each square on the grid is allocated in a spiral pattern starting at a location marked 1 and then counting up while spiraling outward. For example, the first few squares are allocated like this:

// 17  16  15  14  13
// 18   5   4   3  12
// 19   6   1   2  11
// 20   7   8   9  10
// 21  22  23---> ...
// While this is very space-efficient (no squares are skipped), requested data must be carried back to square 1 (the location of the only access port for this memory system) by programs that can only move up, down, left, or right. They always take the shortest path: the Manhattan Distance between the location of the data and square 1.

// For example:

// Data from square 1 is carried 0 steps, since it's at the access port.
// Data from square 12 is carried 3 steps, such as: down, left, left.
// Data from square 23 is carried only 2 steps: up twice.
// Data from square 1024 must be carried 31 steps.
// How many steps are required to carry the data from the square identified in your puzzle input all the way to the access port?

// Your puzzle input is 277678.

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

const spiralManhattanDistance = targetAddress => {
  let currentAddress = 1
  let currentDirection = 'right'
  let currentPathLength = 1
  let currentPathLengthSeenBefore = false
  let currentXDistanceFromOrigin = 0
  let currentYDistanceFromOrigin = 0

  while (currentAddress < targetAddress) {
    if (currentAddress + currentPathLength <= targetAddress) {
      currentAddress += currentPathLength
      switch (currentDirection) {
        case 'right':
          currentXDistanceFromOrigin += currentPathLength
          break
        case 'up':
          currentYDistanceFromOrigin += currentPathLength
          break
        case 'left':
          currentXDistanceFromOrigin -= currentPathLength
          break
        case 'down':
          currentYDistanceFromOrigin -= currentPathLength
          break
        default:
          throw new Error(`${currentDirection} is not a valid direction pattern`)
      }
      currentDirection = getNextDirection(currentDirection)
      if (currentPathLengthSeenBefore) {
        currentPathLength++
        currentPathLengthSeenBefore = false
      } else {
        currentPathLengthSeenBefore = true
      }
    } else {
      const finalDistanceToTarget = targetAddress - currentAddress
      switch (currentDirection) {
        case 'right':
          currentXDistanceFromOrigin += finalDistanceToTarget
          break
        case 'up':
          currentYDistanceFromOrigin += finalDistanceToTarget
          break
        case 'left':
          currentXDistanceFromOrigin -= finalDistanceToTarget
          break
        case 'down':
          currentYDistanceFromOrigin -= finalDistanceToTarget
          break
        default:
          throw new Error(`${currentDirection} is not a valid direction pattern`)
      }
      currentAddress = targetAddress
    }
  }

  return Math.abs(currentXDistanceFromOrigin) + Math.abs(currentYDistanceFromOrigin)
}

console.log(spiralManhattanDistance(277678))
