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

let pc0 = 0
let pc1 = 0

const p0regs = {}
const p1regs = {
  p: 1
}

const getP0RegVal = regName => {
  return p0regs[regName] || 0
}

const getP1RegVal = regName => {
  return p1regs[regName] || 0
}

const setP0RegVal = (regName, val) => {
  p0regs[regName] = val
}

const setP1RegVal = (regName, val) => {
  p1regs[regName] = val
}

const computeP0OpVal = str => {
  const valStrIsRegName = str[0].charCodeAt() > 57
  if (valStrIsRegName) {
    return getP0RegVal(str)
  } else {
    return parseInt(str)
  }
}

const computeP1OpVal = str => {
  const valStrIsRegName = str[0].charCodeAt() > 57
  if (valStrIsRegName) {
    return getP1RegVal(str)
  } else {
    return parseInt(str)
  }
}

let notFinished = true

const p0Mailbox = []
const p1Mailbox = []

let p0Waiting = false
let p1Waiting = false

let p1MessagesSent = 0

while (notFinished) {
  const p0instruction = instructions[pc0]
  const p1instruction = instructions[pc1]

  if (!p0instruction || !p1instruction) {
    // console.log('program counter out of bounds, terminating')
    notFinished = false
  }

  const p0targetVal = computeP0OpVal(p0instruction.target)
  const p1targetVal = computeP1OpVal(p1instruction.target)

  switch (p0instruction.op) {
    case 'rcv':
      const rcvVal = p0Mailbox.shift()
      if (rcvVal !== undefined) {
        setP0RegVal(p0instruction.target, rcvVal)
        p0Waiting = false
        pc0++
      } else {
        p0Waiting = true
      }
      break
    case 'jgz':
      if (p0targetVal > 0) {
        pc0 += computeP0OpVal(p0instruction.val)
      } else {
        pc0++
      }
      break
    case 'set':
      setP0RegVal(p0instruction.target, computeP0OpVal(p0instruction.val))
      pc0++
      break
    case 'add':
      setP0RegVal(
        p0instruction.target,
        getP0RegVal(p0instruction.target) + computeP0OpVal(p0instruction.val)
      )
      pc0++
      break
    case 'mul':
      setP0RegVal(
        p0instruction.target,
        getP0RegVal(p0instruction.target) * computeP0OpVal(p0instruction.val)
      )
      pc0++
      break
    case 'mod':
      setP0RegVal(
        p0instruction.target,
        getP0RegVal(p0instruction.target) % computeP0OpVal(p0instruction.val)
      )
      pc0++
      break
    case 'snd':
      const sndVal = computeP0OpVal(p0instruction.target)
      p1Mailbox.push(sndVal)
      pc0++
      break
    default:
      throw new Error(`Unexpected op: ${p0instruction.op} in ${p0instruction}`)
  }

  switch (p1instruction.op) {
    case 'rcv':
      const rcvVal = p1Mailbox.shift()
      if (rcvVal !== undefined) {
        setP1RegVal(p1instruction.target, rcvVal)
        p1Waiting = false
        pc1++
      } else {
        p1Waiting = true
      }
      break
    case 'jgz':
      if (p1targetVal > 0) {
        pc1 += computeP1OpVal(p1instruction.val)
      } else {
        pc1++
      }
      break
    case 'set':
      setP1RegVal(p1instruction.target, computeP1OpVal(p1instruction.val))
      pc1++
      break
    case 'add':
      setP1RegVal(
        p1instruction.target,
        getP1RegVal(p1instruction.target) + computeP1OpVal(p1instruction.val)
      )
      pc1++
      break
    case 'mul':
      setP1RegVal(
        p1instruction.target,
        getP1RegVal(p1instruction.target) * computeP1OpVal(p1instruction.val)
      )
      pc1++
      break
    case 'mod':
      setP1RegVal(
        p1instruction.target,
        getP1RegVal(p1instruction.target) % computeP1OpVal(p1instruction.val)
      )
      pc1++
      break
    case 'snd':
      const sndVal = computeP1OpVal(p1instruction.target)
      p0Mailbox.push(sndVal)
      p1MessagesSent++
      pc1++
      break
    default:
      throw new Error(`Unexpected op: ${p1instruction.op} in ${p1instruction}`)
  }

  if (p0Waiting && p1Waiting) {
    // console.log('deadlock, terminating')
    notFinished = false
  }
}

console.log(p1MessagesSent)
