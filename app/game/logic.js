// Initialize board array
const gameBoard = new Array(9).fill(' ')

// Return Type: null
// Clear board array
function clearBoard () {
  gameBoard.fill(' ')
}

// Return Type: null
// Fill board array slot with selected marker
function placeMarker (space, marker) {
  gameBoard[space] = marker
}

// Return Type: Boolean
// Check if the selected marker has won the game
function gameWon (marker, board = gameBoard) {
  if (vertWin(marker, board) || horizWin(marker, board) || diagWin(marker, board)) {
    return true
  }
  return false
}

// Return Type: Boolean
// Check for vertical win by selected marker
function vertWin (marker, board = gameBoard) {
  for (let i = 0; i < 3; i++) {
    if (marker === board[i] && marker === board[i + 3] && marker === board[i + 6]) {
      return true
    }
  }
  return false
}

// Return Type: Boolean
// Check for horizontal win by selected marker
function horizWin (marker, board = gameBoard) {
  for (let i = 0; i < 3; i++) {
    if (marker === board[i * 3] && marker === board[(i * 3) + 1] && marker === board[(i * 3) + 2]) {
      return true
    }
  }
  return false
}

// Return Type: Boolean
// Check for diagonal win by selected marker
function diagWin (marker, board = gameBoard) {
  if (marker === board[0] && marker === board[4] && marker === board[8]) return true
  if (marker === board[2] && marker === board[4] && marker === board[6]) return true
  return false
}

module.exports = {
  clearBoard,
  placeMarker,
  gameWon
}
