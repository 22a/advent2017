const fs = require('fs')

const contents = fs.readFileSync('../input.txt', 'utf8')
const lines = contents.split('\n').filter(line => line !== '')

const nodePaths = {}

for (let line of lines) {
  const [nodeName, reachableNodesStr] = line.split(' <-> ')
  const reachableNodes = reachableNodesStr.split(', ')
  nodePaths[nodeName] = reachableNodes
}

const getNodeConnections = (nodeName) => {
  return nodePaths[nodeName]
}

const findNumConnectedNodes = (nodeName) => {
  return numConnectedNodes(nodeName, [])
}

const numConnectedNodes = (currentNodeName, nodesSeenSoFar) => {
  let totalConnectedForThisNode = 1
  let totalNodesSeenAtThisLevel = [currentNodeName]
  const currentNodeConnections = getNodeConnections(currentNodeName).filter(
    node => !nodesSeenSoFar.includes(node)
  ).filter(node => node !== currentNodeName)
  for (let node of currentNodeConnections) {
    if (!nodesSeenSoFar.concat(totalNodesSeenAtThisLevel).includes(node)) {
      const [num, nodesSeen] = numConnectedNodes(node, nodesSeenSoFar.concat(totalNodesSeenAtThisLevel))
      totalConnectedForThisNode += num
      for (let connection of nodesSeen) {
        totalNodesSeenAtThisLevel.push(connection)
      }
    }
  }

  return [totalConnectedForThisNode, totalNodesSeenAtThisLevel]
}

let numGroups = 0

while (Object.keys(nodePaths).length > 0) {
  numGroups++
  const nodesInThisGroup = findNumConnectedNodes(Object.keys(nodePaths)[0])[1]
  for (let node of nodesInThisGroup) {
    delete nodePaths[node]
  }
}

console.log(numGroups)
