class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs)
  }

  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex)
    if (this._board._playerBoard[rowIndex][columnIndex] === 'B') this._board.print()
    else if (!this._board.hasSafeTiles) this._board.congratulate()
    else this._board.print({prepend: "Current Board:"})
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
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex)
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

  print({ prepend } = { prepend: null }) {
    if (typeof prepend === 'string') console.log(prepend + "\n")

    console.log(
      this._playerBoard.map(row => {
        return row.join(' | ')
      }).join('\n')
    )
  }

  congratulate() {
    console.log("Congratulations! You won!")
  }

  generatePlayerBoard(numberOfRows, numberOfColumns) {
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

  generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
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

const g = new Game(3, 3, 3)
g.playMove(0, 0)
