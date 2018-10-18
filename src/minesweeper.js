const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  const board = []
  for (let i = 0; i < numberOfRows; i++) {
    const row = []
    for (let j = 0; j < numberOfColumns; j++) {
      row.push(" ")
    }
    board.push(row)
  }
  return console.log(board)
}

// generatePlayerBoard(2,3)
