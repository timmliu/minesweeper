class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs)
  }
}

class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs
    this._numberOfTiles = numberOfRows * numberOfColumns
    this._playerBoard = this.generatePlayerBoard(numberOfRows, numberOfColumns)
    this._bombBoard = this.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs)
  }

  get playerBoard() {
    return this._playerBoard
  }

  flipTile(rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile has already been flipped!')
      return
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B'
    } else {
      this._playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(rowIndex, columnIndex)
    }
    this._numberOfTiles -= 1
  }

  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffsets = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]]
    const numberOfRows = this._bombBoard.length
    const numberOfColumns = this._bombBoard[0].length
    let numberOfBombs = 0
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0]
      const neighborColumnIndex = columnIndex + offset[1]
      if ((neighborRowIndex >= 0) && (neighborRowIndex < numberOfRows) && (neighborColumnIndex >= 0) && (neighborColumnIndex < numberOfColumns)) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfBombs++
        }
      }
    })
    return numberOfBombs
  }

  hasSafeTiles() {
    return this._numberOfTiles !== this._numberOfBombs
  }

  print() {
    console.log(
      this._playerBoard.map(row => {
        return row.join(' | ')
      }).join('\n')
    )

    console.log(
      this._bombBoard.map(row => {
        return row.join(' | ')
      }).join('\n')
    )
  }

  static generatePlayerBoard(numberOfRows, numberOfColumns) {
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

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
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

    function randomIndex(num) {
      return Math.floor(Math.random() * num)
    }

    return board
  }
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
