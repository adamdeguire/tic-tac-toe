const board = new Array(9).fill(' ')

function clearBoard () {
  board.fill(' ')
}

function placeMarker (space, marker) {
  board[space] = marker
}

function gameWon (marker) {
  console.log(board)
  if (vertWin(marker) || horizWin(marker) || diagWin(marker)) {
    return true
  }
  return false
}

function gameTied () {
  board.every(space => space === ' ')
}

function vertWin (marker) {
  for (let i = 0; i < 3; i++) {
    if (marker === board[i] && marker === board[i + 3] && marker === board[i + 6]) {
      return true
    }
  }
  return false
}

function horizWin (marker) {
  for (let i = 0; i < 3; i++) {
    if (marker === board[i * 3] && marker === board[(i * 3) + 1] && marker === board[(i * 3) + 2]) {
      return true
    }
  }
  return false
}

function diagWin (marker) {
  if (marker === board[0] && marker === board[4] && marker === board[8]) return true
  if (marker === board[2] && marker === board[4] && marker === board[6]) return true
}

module.exports = {
  clearBoard,
  placeMarker,
  gameWon,
  gameTied
}
