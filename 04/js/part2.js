const fs = require('fs')

const contents = fs.readFileSync('input.txt', 'utf8')

const passphrases = contents.split('\n').filter(line => line !== '')

const allAnagrams = word => {
  let anagrams = []

  if (word.length === 1) {
    return [word]
  }

  for (let i = 0; i < word.length; i++) {
    const firstChar = word[i]
    const charsLeft = word.substring(0, i) + word.substring(i + 1)
    const innerAnagrams = allAnagrams(charsLeft)
    for (let j = 0; j < innerAnagrams.length; j++) {
      anagrams.push(firstChar + innerAnagrams[j])
    }
  }
  return anagrams
}

const isValid = passphrase => {
  const wordsSeenSoFar = new Set()
  const wordsInThisPassphrase = passphrase.split(' ')
  for (const word of wordsInThisPassphrase) {
    for (const anagram of allAnagrams(word)) {
      if (wordsSeenSoFar.has(anagram)) {
        return false
      }
    }
    wordsSeenSoFar.add(word)
  }
  return true
}

const valid = passphrases.filter(isValid)

console.log(valid.length)
