const gameBoard = new Array(9).fill(' ')

function clearBoard () {
  gameBoard.fill(' ')
}

function placeMarker (space, marker) {
  gameBoard[space] = marker
}

function gameWon (marker, board = gameBoard) {
  if (vertWin(marker, board) || horizWin(marker, board) || diagWin(marker, board)) {
    return true
  }
  return false
}

function gameTied (board = gameBoard) {
  board.every(space => space === ' ')
}

function vertWin (marker, board = gameBoard) {
  for (let i = 0; i < 3; i++) {
    if (marker === board[i] && marker === board[i + 3] && marker === board[i + 6]) {
      return true
    }
  }
  return false
}

function horizWin (marker, board = gameBoard) {
  for (let i = 0; i < 3; i++) {
    if (marker === board[i * 3] && marker === board[(i * 3) + 1] && marker === board[(i * 3) + 2]) {
      return true
    }
  }
  return false
}

function diagWin (marker, board = gameBoard) {
  if (marker === board[0] && marker === board[4] && marker === board[8]) return true
  if (marker === board[2] && marker === board[4] && marker === board[6]) return true
}

module.exports = {
  clearBoard,
  placeMarker,
  gameWon,
  gameTied
}
