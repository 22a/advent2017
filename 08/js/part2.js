const fs = require('fs')

const contents = fs.readFileSync('../input.txt', 'utf8')
const lines = contents.split('\n').filter(line => line !== '')

const instructions = lines.map(line => {
  const [
    target,
    op,
    valStr,
    ,
    condTarget,
    condOp,
    condValStr
  ] = line.split(' ')

  return {
    target,
    op,
    val: parseInt(valStr),
    condTarget,
    condOp,
    condVal: parseInt(condValStr)
  }
})

const bigBagOfStateWithTheLads = {}
let maxValEverSeen = 0

const getRegisterVal = registerName => bigBagOfStateWithTheLads[registerName] || 0

const setRegisterVal = (registerName, val) => {
  bigBagOfStateWithTheLads[registerName] = val
}

const computeCond = (a, op, b) => {
  switch (op) {
    case '<':
      return a < b
    case '>':
      return a > b
    case '<=':
      return a <= b
    case '>=':
      return a >= b
    case '==':
      return a === b
    case '!=':
      return a !== b
    default:
      throw new Error(`wat sort of op is this?: ${op}`)
  }
}

const computeOpResult = (a, op, b) => {
  switch (op) {
    case 'inc':
      return a + b
    case 'dec':
      return a - b
    default:
      throw new Error(`wat sort of op is this?: ${op}`)
  }
}

instructions.forEach(instruction => {
  const condTargetVal = getRegisterVal(instruction.condTarget)
  const condResult = computeCond(condTargetVal, instruction.condOp, instruction.condVal)
  if (condResult) {
    const targetVal = getRegisterVal(instruction.target)
    const compResult = computeOpResult(targetVal, instruction.op, instruction.val)
    if (compResult > maxValEverSeen) {
      maxValEverSeen = compResult
    }
    setRegisterVal(instruction.target, compResult)
  }
})

console.log(maxValEverSeen)
