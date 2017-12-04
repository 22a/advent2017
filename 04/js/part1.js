const fs = require('fs')

const contents = fs.readFileSync('input.txt', 'utf8')

const passphrases = contents.split('\n').filter(line => line !== '')

const isValid = passphrase => {
  const wordsSeenSoFar = new Set()
  const wordsInThisPassphrase = passphrase.split(' ')
  for (const word of wordsInThisPassphrase) {
    if (wordsSeenSoFar.has(word)) {
      return false
    }
    wordsSeenSoFar.add(word)
  }
  return true
}

const valid = passphrases.filter(isValid)

console.log(valid.length)
