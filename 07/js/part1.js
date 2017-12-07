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

for (let i of nodes) {
  let isRootNode = true
  for (let j of nodes) {
    if (j.children && j.children.includes(i.name)) {
      isRootNode = false
    }
  }
  if (isRootNode) {
    console.log(i)
  }
}
