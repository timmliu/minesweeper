const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  const board = []
  for (let i = 0; i < numberOfRows; i++) {
    const row = []
    for (let j = 0; j < numberOfColumns; j++) {
      row.push(" ")
    }
    board.push(row)
  }
  console.log(board)
  return board
}

const randomIndex = num => {
  return Math.floor(Math.random() * num)
}

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  const board = []
  for (let i = 0; i < numberOfRows; i++) {
    const row = []
    for (let j = 0; j < numberOfColumns; j++) {
      row.push(null)
    }
    board.push(row)
  }

  let numberOfBombsPlaced = 0
  while (numberOfBombsPlaced < numberOfBombs) {
    let randomRowIndex, randomColumnIndex
    do {
      randomRowIndex = randomIndex(numberOfRows)
      randomColumnIndex = randomIndex(numberOfColumns)
    } while (board[randomRowIndex][randomColumnIndex] === 'B')
    board[randomRowIndex][randomColumnIndex] = 'B'
    numberOfBombsPlaced++
    // !!! The code in your while loop has the potential to place bombs on top of already existing bombs. This will be fixed when you learn about control flow.
  }

  return board
}

const printBoard = (board) => {
  console.log(
    board.map(row => {
      return row.join(' | ')
    }).join('\n')
  )
}

const playerBoard = generatePlayerBoard(3,4)
const bombBoard = generateBombBoard(3,4,5)

console.log('Player Board: ')
printBoard(playerBoard)
console.log('Bomb Board: ')
printBoard(bombBoard)
