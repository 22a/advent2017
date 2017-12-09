const fs = require('fs')

const contents = fs.readFileSync('../input.txt', 'utf8')
const chars = contents.split('\n').filter(line => line !== '')[0].split('')

let garbageTotal = 0
let states = []
states.push('seeking-open-curly-or-angle')

for (let index in chars) {
  const currentChar = chars[index]

  switch (states[states.length - 1]) {
    case 'seeking-open-curly-or-angle':
      switch (currentChar) {
        case '{':
          states.pop()
          states.push('seeking-closing-curly')
          break
        case '<':
          states.pop()
          states.push('seeking-closing-angle')
          break
        default:
          throw new Error(`only groups or garbage allowed at the top level, found ${currentChar}`)
      }
      break
    case 'seeking-closing-curly':
      switch (currentChar) {
        case '{':
          states.push('seeking-closing-curly')
          break
        case '<':
          states.push('seeking-closing-angle')
          break
        case ',':
          states.push('seeking-open-curly-or-angle')
          break
        case '}':
          states.pop()
          break
        default:
          throw new Error(`I'm looking for a closing curly pls`)
      }
      break
    case 'seeking-closing-angle':
      switch (currentChar) {
        case '>':
          states.pop()
          break
        case '!':
          states.push('ignore-next')
          break
        default:
          garbageTotal++
          break
      }
      break
    case 'ignore-next':
      states.pop()
      break
    default:
      throw new Error('Unexpected state')
  }
}

if (states.length !== 0) throw new Error('Stack not empty after all input consumed')

console.log(garbageTotal)
