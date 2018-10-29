import { Board } from './board'

class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs)
  }

  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex)
    if (this._board._playerBoard[rowIndex][columnIndex] === 'B') this._board.print({prepend: "Game Over! Final Board:"})
    else if (!this._board.hasSafeTiles) this._board.congratulate()
    else this._board.print({prepend: "Current Board:"})
  }
}
