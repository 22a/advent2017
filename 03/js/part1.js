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
