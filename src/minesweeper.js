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
    let randomRowIndex = randomIndex(numberOfRows)
    let randomColumnIndex = randomIndex(numberOfColumns)
    if (board[randomRowIndex][randomColumnIndex] !== 'B') {
      board[randomRowIndex][randomColumnIndex] = 'B'
      numberOfBombsPlaced++
    }
  }

  return board
}

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  const neighborOffsets = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]]
  const numberOfRows = bombBoard.length
  const numberOfColumns = bombBoard[0].length
  let numberOfBombs = 0
  neighborOffsets.forEach(offset => {
    const neighborRowIndex = rowIndex + offset[0]
    const neighborColumnIndex = columnIndex + offset[1]
    if ((neighborRowIndex >= 0) && (neighborRowIndex < numberOfRows) && (neighborColumnIndex >= 0) && (neighborColumnIndex < numberOfColumns)) {
      if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
        numberOfBombs++
      }
    }
  })
  return numberOfBombs
}

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if (playerBoard[rowIndex][columnIndex] !== ' ') {
    console.log('This tile has already been flipped!')
    return
  } else if (bombBoard[rowIndex][columnIndex] === 'B') {
    playerBoard[rowIndex][columnIndex] = 'B'
  } else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex)
  }
}

const printBoard = (board) => {
  console.log(
    board.map(row => {
      return row.join(' | ')
    }).join('\n')
  )
}

const playerBoard = generatePlayerBoard(3,3)
const bombBoard = generateBombBoard(3,3,3)

console.log('Player Board: ')
printBoard(playerBoard)
console.log('Bomb Board: ')
printBoard(bombBoard)

flipTile(playerBoard, bombBoard, 0, 0)
console.log('Updated Player Board:')
console.log(playerBoard)
