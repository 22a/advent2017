const fs = require('fs')

const contents = fs.readFileSync('../input.txt', 'utf8')

const lines = contents.split('\n').filter(line => line !== '')

const parseLine = line => {
  const splits = line.split(' ')
  if (splits.length === 3) {
    const [op, target, val] = splits
    return {
      op,
      target,
      val
    }
  } else {
    const [op, target] = splits
    return {
      op,
      target
    }
  }
}

const instructions = lines.map(parseLine)

let pc = 0

const regs = {}

const getRegVal = regName => {
  return regs[regName] || 0
}

const setRegVal = (regName, val) => {
  regs[regName] = val
}

const computeOpVal = str => {
  const valStrIsReg = str.length === 1 && str[0].charCodeAt() > 57
  if (valStrIsReg) {
    return getRegVal(str)
  } else {
    return parseInt(str)
  }
}

let notFinished = true

let lastPlayed = 0

while (notFinished) {
  const instruction = instructions[pc]
  const targetVal = getRegVal(instruction.target)
  switch (instruction.op) {
    case 'rcv':
      if (targetVal) {
        console.log(lastPlayed)
        notFinished = false
      }
      break
    case 'jgz':
      if (targetVal) {
        pc += computeOpVal(instruction.val)
      } else {
        pc++
      }
      break
    case 'set':
      setRegVal(instruction.target, computeOpVal(instruction.val))
      break
    case 'add':
      setRegVal(
        instruction.target,
        getRegVal(instruction.target) + computeOpVal(instruction.val)
      )
      break
    case 'mul':
      setRegVal(
        instruction.target,
        getRegVal(instruction.target) * computeOpVal(instruction.val)
      )
      break
    case 'mod':
      setRegVal(
        instruction.target,
        getRegVal(instruction.target) % computeOpVal(instruction.val)
      )
      break
    case 'snd':
      lastPlayed = getRegVal(instruction.target)
      break
    default:
      throw new Error(`Unexpected op: ${instruction.op} in ${instruction}`)
  }

  if (instruction.op !== 'jgz') {
    pc++
  }
}
