const skipVal = 343

let currentIndex = 0
let memory = [0]

for (let i = 1; i <= 2017; i++) {
  currentIndex = (currentIndex + skipVal) % memory.length
  const head = memory.slice(0, currentIndex + 1)
  const tail = memory.slice(currentIndex + 1, memory.length)
  memory = head.concat([i]).concat(tail)
  currentIndex = (currentIndex + 1) % memory.length
}

console.log(memory[memory.indexOf(2017) + 1])
