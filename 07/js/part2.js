const fs = require('fs')

const contents = fs.readFileSync('../input.txt', 'utf8')
const lines = contents.split('\n').filter(line => line !== '')

const parse = line => {
  const [selfPart, childPart] = line.split(' -> ')
  const [name, weightString] = selfPart.split(' ')
  const weight = parseInt(weightString.substring(1, weightString.length - 1))
  const children = childPart ? childPart.split(', ') : undefined

  return {
    name,
    weight,
    children
  }
}

const nodes = lines.map(parse)

let rootNodeName

for (let i of nodes) {
  let isRootNode = true
  for (let j of nodes) {
    if (j.children && j.children.includes(i.name)) {
      isRootNode = false
    }
  }
  if (isRootNode) {
    rootNodeName = i.name
  }
}

const findNode = (name, allNodes) => {
  return allNodes.find(n => n.name === name)
}

const treeWeight = (name, allNodes) => {
  const currentNode = findNode(name, allNodes)
  if (!currentNode) return 0
  if (!currentNode.children) return currentNode.weight

  const allChildrenWeight = currentNode.children.reduce((acc, childName) => {
    const childWeight = treeWeight(childName, allNodes)
    return acc + childWeight
  }, 0)

  return currentNode.weight + allChildrenWeight
}

// this code is disgusting
// please do not hate me for it
const findImbalance = (currentNodeName, allNodes) => {
  const currentNode = findNode(currentNodeName, allNodes)
  if (!currentNode || !currentNode.children) return

  if (currentNode.children.length < 3) {
    const res = currentNode.children.map(child => {
      return findImbalance(child, allNodes)
    })
    const singleRes = res.filter(r => r !== undefined)
    if (singleRes[0]) {
      return singleRes[0]
    }
  } else {
    let xs = []
    let ys = []
    for (let child of currentNode.children) {
      const subTreeWeight = treeWeight(child, allNodes) + currentNode.weight

      if (xs.length === 0 || subTreeWeight === xs[0].weight) {
        xs.push({
          weight: subTreeWeight,
          name: child
        })
      } else {
        ys.push({
          weight: subTreeWeight,
          name: child
        })
      }
    }
    if (ys.length > 0) {
      const incorrect = ys.length > 1 ? xs[0] : ys[0]
      const incorrectNode = findNode(incorrect.name, allNodes)
      const childWeights = []
      for (let child of incorrectNode.children) {
        const subTreeWeight = treeWeight(child, allNodes) + currentNode.weight
        childWeights.push(subTreeWeight)
      }

      if (childWeights.reduce((a, b) => a === b ? a : NaN)) {
        const correct = (ys.length > 1 ? ys[0] : xs[0])
        const correctWeight = treeWeight(correct.name, allNodes)
        const incorrectWeight = treeWeight(incorrectNode.name, allNodes)
        const correctDelta = correctWeight - incorrectWeight
        const solution = incorrectNode.weight + correctDelta

        return `Node ${incorrectNode.name} with tree weight ${incorrectWeight} different from peers: ${correctWeight}. Node weight is ${incorrectNode.weight} but should be ${solution} to balance.`
      } else {
        const res = currentNode.children.map(child => {
          return findImbalance(child, allNodes)
        })
        const singleRes = res.filter(r => r !== undefined)
        if (singleRes[0]) {
          return singleRes[0]
        }
      }
    }
  }
}

console.log(findImbalance(rootNodeName, nodes))
