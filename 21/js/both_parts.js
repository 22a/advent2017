const fs = require('fs')

const contents = fs.readFileSync('../input.txt', 'utf8')
const lines = contents.split('\n').filter(line => line !== '')

// let's just build a hashmap of all the possible rules once
const rules = lines.reduce((acc, line) => {
  const [input, output] = line.split(' => ')
  // figure out all the flips and rotations we need:
  //
  // (it's kinda annoying that the problem spec doesn't list these, and actually
  // gives this non exhaustive list of mutations saying: "all of the following
  // patterns match the same rule")
  //
  // .#.   .#.   #..   ###
  // ..#   #..   #.#   ..#
  // ###   ###   ##.   .#.
  //
  // ️㊙️ !!!
  //
  // regular,
  // mirror vertically,
  // mirror horizontally,
  // rotate 90 cw,
  // rotate 90 ccw,
  // rotate 180,
  //
  // great, it turns out I should have somehow known that that a rotation
  // combined with a flip is also valid. thanks m8.
  //
  // * rotate 90 cw then mirror vertically
  // * rotate 90 ccw then mirror vertically
  //
  // ab    ba    cd    ca   bd   dc   ac   db
  // cd    dc    ab    db   ac   ba   bd   ca
  //
  // to indices: (skipping 2, bc 2 is '/')
  // ../.. => .../#../#..
  //
  // 01    10    34    30   14   43   03   41
  // 34    43    01    41   03   10   14   30
  //
  if (input.length === 5) {
    const mirrorVertically = `${input[1]}${input[0]}/${input[4]}${input[3]}`
    const mirrorHorizontally = `${input[3]}${input[4]}/${input[0]}${input[1]}`
    const rotate90cw = `${input[3]}${input[0]}/${input[4]}${input[1]}`
    const rotate90ccw = `${input[1]}${input[4]}/${input[0]}${input[3]}`
    const rotate180 = `${input[4]}${input[3]}/${input[1]}${input[0]}`

    const rotate90cwThenMirror = `${input[0]}${input[3]}/${input[1]}${input[4]}`
    const rotate90ccwThenMirror = `${input[4]}${input[1]}/${input[3]}${input[0]}`

    return Object.assign(acc, {
      [input]: output,
      [mirrorVertically]: output,
      [mirrorHorizontally]: output,
      [rotate90cw]: output,
      [rotate90ccw]: output,
      [rotate180]: output,
      [rotate90cwThenMirror]: output,
      [rotate90ccwThenMirror]: output
    })
  //
  // abc   cba   ghi   gda   cfi  ihg
  // def   fed   def   heb   beh  fed
  // ghi   ihg   abc   ifc   adg  cba
  //
  // to indices: (skipping 3 + 7, bc they're '/')
  // .../.../... => #.#./.#.#/#.#./###.
  //
  // 012   210   89t   840   26t  t98
  // 456   654   456   951   159  654
  // 89t   t98   012   t62   048  210
  } else if (input.length === 11) {
    const mirrorVertically = `${input[2]}${input[1]}${input[0]}/${input[6]}${input[5]}${input[4]}/${input[10]}${input[9]}${input[8]}`
    const mirrorHorizontally = `${input[8]}${input[9]}${input[10]}/${input[4]}${input[5]}${input[6]}/${input[0]}${input[1]}${input[2]}`
    const rotate90cw = `${input[8]}${input[4]}${input[0]}/${input[9]}${input[5]}${input[1]}/${input[10]}${input[6]}${input[2]}`
    const rotate90ccw = `${input[2]}${input[6]}${input[10]}/${input[1]}${input[5]}${input[9]}/${input[0]}${input[4]}${input[8]}`
    const rotate180 = `${input[10]}${input[9]}${input[8]}/${input[6]}${input[5]}${input[4]}/${input[2]}${input[1]}${input[8]}`

    const rotate90cwThenMirror = `${input[0]}${input[4]}${input[8]}/${input[1]}${input[5]}${input[9]}/${input[2]}${input[6]}${input[10]}`
    const rotate90ccwThenMirror = `${input[10]}${input[6]}${input[2]}/${input[9]}${input[5]}${input[1]}/${input[8]}${input[4]}${input[0]}`

    return Object.assign(acc, {
      [input]: output,
      [mirrorVertically]: output,
      [mirrorHorizontally]: output,
      [rotate90cw]: output,
      [rotate90ccw]: output,
      [rotate180]: output,
      [rotate90cwThenMirror]: output,
      [rotate90ccwThenMirror]: output
    })
  } else {
    throw new Error('oops, i am not sure what to do with this input rule: ', line)
  }
}, {})

// const printImage = imageString => {
//   for (let row of imageString.split('/')) {
//     console.log(row)
//   }
//   console.log('')
// }

const countLitPixels = image => {
  let litPixels = 0
  for (let pixel of currentImage) {
    if (pixel === '#') {
      litPixels++
    }
  }
  return litPixels
}

let currentImageSize = 3
let currentImage = '.#./..#/###'
const iterations = 18

for (let i = 0; i < iterations; i++) {
  if (i === 5) {
    console.log(`Part 1: ${countLitPixels(currentImage)}`)
  }

  let chunkSize
  let chunksPerSide

  if (currentImageSize % 2 === 0) {
    chunkSize = 2
    chunksPerSide = currentImageSize / 2
  } else if (currentImageSize % 3 === 0) {
    chunkSize = 3
    chunksPerSide = currentImageSize / 3
  } else {
    throw new Error('something went horribly wrong and we now have a shape of size: ', currentImageSize)
  }

  const numChunks = chunksPerSide ** 2

  let chunks = []
  for (let c = 0; c < numChunks; c++) {
    chunks.push('')
  }

  let col = 0
  let row = 0
  let currentPartialNum = 0

  for (let pixel of currentImage) {
    if (pixel === '/') {
      if (row === chunkSize - 1) {
        row = 0
      } else {
        row++
        currentPartialNum -= chunksPerSide
      }
      col = 0
    } else {
      chunks[currentPartialNum] += pixel
      col++
    }

    if (col === chunkSize) {
      if (row !== chunkSize - 1) {
        chunks[currentPartialNum] += '/'
      }
      currentPartialNum++
      col = 0
    }
  }

  const newChunks = chunks.map(image => rules[image])
  const newChunkSplits = newChunks.map(chunk => chunk.split('/'))

  currentImage = ''

  currentImageSize += chunksPerSide

  let indexOffset = 0
  for (let j = 0; j < chunksPerSide; j++) {
    for (let k = 0; k < chunkSize + 1; k++) {
      for (let l = 0; l < chunksPerSide; l++) {
        currentImage += newChunkSplits[indexOffset + l][k]
      }
      currentImage += '/'
    }
    indexOffset += chunksPerSide
  }

  // remove trailing slash
  currentImage = currentImage.slice(0, -1)
}

console.log(`Part 2: ${countLitPixels(currentImage)}`)
