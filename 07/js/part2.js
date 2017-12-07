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

let rootNodeName;

for (let i of nodes) {
  let isRootNode = true
  for (let j of nodes) {
    if (j.children && j.children.includes(i.name)) {
      isRootNode = false
    }
  }
  if (isRootNode) {
    rootNodeName = i.name
    console.log(i)
  }
}

const findImbalance = (currentNodeName, allNodes) => {
  const currentNode = allNodes.find(n => n.name === currentNodeName)
  const possiblyImbalancedChildren = []
  if (currentNode.children.length < 3) {
    possiblyImbalancedChildren.concat(currentNode.children)
  } else {
    let xs = []
    let ys = []
    // let correctWeight
    // let incorrectWeight
    for (let child in currentNode.children) {
      if (xs.length === 0 || child.weight === xs[0]) {
        xs.push(child.weight)
      } else {
        ys.push(child.weight)
      }
    }
    if (xs.length > ys.length) {

    }
  }
}

console.log(findImbalance(rootNodeName, nodes))
