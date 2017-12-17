const skipVal = 343

let currentIndex = 0

let valAfterZero

for (let i = 1; i <= 50000000; i++) {
  currentIndex = (currentIndex + skipVal) % i
  if (currentIndex === 0) {
    valAfterZero = i
  }
  currentIndex = (currentIndex + 1) % (i + 1)
}

console.log(valAfterZero)
