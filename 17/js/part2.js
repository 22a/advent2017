const skipVal = 343

let currentIndex = 0

const start = {
  prev: null,
  next: null,
  value: 0
}

const insertAfter = (head, pos, val) => {
  let currentNode = head
  let currentPos = 0
  while (currentPos < pos) {
    currentPos++
    currentNode = currentNode.next
  }
  const newNode = {
    prev: currentNode,
    next: currentNode.next,
    value: val
  }
  if (currentNode.next) {
    currentNode.next.prev = newNode
  }
  currentNode.next = newNode
}

const findNodeAfter = (head, val) => {
  let currentNode = head
  while (currentNode.value !== val) {
    currentNode = currentNode.next
  }
  return currentNode.next.value
}

for (let i = 1; i <= 50000000; i++) {
  currentIndex = (currentIndex + skipVal) % i
  if (currentIndex === 0) {
    insertAfter(start, currentIndex, i)
  }
  currentIndex = (currentIndex + 1) % (i + 1)
}

console.log(findNodeAfter(start, 0))
