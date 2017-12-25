package day19

import java.io.File

enum class Direction {
  UP, DOWN, LEFT, RIGHT
}

fun main(args : Array<String>) {
  val file = File(".." + File.separator + "input.txt")
  val lines:List<String> = file.readLines()
  val charField = lines.map { it.toCharArray() }

  val numRows = charField.size
  val numCols = charField[0].size

  var currentRow = 0
  var currentCol = charField[currentRow].indexOf('|')
  var currentDirection = Direction.DOWN

  var distance = 0

  var notFinished = true
  while (notFinished) {
    distance++
    val currentChar = charField[currentRow][currentCol]

    when (currentChar) {
      '|', '-' -> {
        /* continue in current direction */
        when (currentDirection) {
          Direction.UP -> currentRow--
          Direction.DOWN -> currentRow++
          Direction.LEFT -> currentCol--
          Direction.RIGHT -> currentCol++
        }
      }
      '+' -> {
        when (currentDirection) {
          Direction.UP, Direction.DOWN -> {
            val leftChar = charField[currentRow][minOf(maxOf(currentCol - 1, 0), numCols - 1)]
            val rightChar = charField[currentRow][minOf(maxOf(currentCol + 1, 0), numCols - 1)]

            if (leftChar == '-') {
              currentDirection = Direction.LEFT
              currentCol -= 1
            } else if (rightChar == '-') {
              currentDirection = Direction.RIGHT
              currentCol += 1
            } else if (leftChar in 'A'..'Z') {
              currentDirection = Direction.LEFT
              currentCol -= 1
            } else if (rightChar in 'A'..'Z') {
              currentDirection = Direction.RIGHT
              currentCol += 1
            } else {
              println(currentDirection)
              println(currentRow)
              println(currentCol)
              println(currentChar)
              throw Exception("I'm not sure where to go from here")
            }
          }

          Direction.LEFT, Direction.RIGHT -> {
            val upChar = charField[minOf(maxOf(currentRow - 1, 0), numRows - 1)][currentCol]
            val downChar = charField[minOf(maxOf(currentRow + 1, 0), numRows - 1)][currentCol]

            if (upChar == '|') {
              currentDirection = Direction.UP
              currentRow -= 1
            } else if (downChar == '|') {
              currentDirection = Direction.DOWN
              currentRow += 1
            } else if (upChar in 'A'..'Z') {
              currentDirection = Direction.UP
              currentRow -= 1
            } else if (downChar in 'A'..'Z') {
              currentDirection = Direction.DOWN
              currentRow += 1
            } else {
              println(currentDirection)
              println(currentRow)
              println(currentCol)
              println(currentChar)
              throw Exception("I'm not sure where to go from here")
            }
          }
        }
      }
      in 'A'..'Z' -> {
        /* print our char */
        print(currentChar)
        /* continue in current direction */
        when (currentDirection) {
          Direction.UP -> currentRow--
          Direction.DOWN -> currentRow++
          Direction.LEFT -> currentCol--
          Direction.RIGHT -> currentCol++
        }
      }
      else -> {
        /* throw Exception("how did we end up here?") */
        println("")
        notFinished = false
      }
    }
  }
  println(distance - 1)
}
