const board = new Array(9).fill(' ')
const markers = ['X', 'O']
let playerCount = 0
const turnCount = 0

const clearBoard = () => {
  board.fill(' ')
}

const printBoard = () => {
  for (let i = 0; i < Math.sqrt(board.length); i++) {
    const start = board.length - ((i + 1) * Math.sqrt(board.length))
    const end = start + 3
    console.log(board.slice(start, end))
  }
}

const convertXY = (x, y) => {
  return x + (y * Math.sqrt(board.length))
}

class Player {
  constructor (isBot = true, name = undefined, marker = undefined) {
    // Player Initialization
    this.incrementCount = () => playerCount++

    this.defaultName = () => {
      if (!name) name = `Player ${playerCount}`
      return name
    }

    this.defaultMarker = () => {
      if (!marker) marker = markers[playerCount - 1]
      return marker
    }

    this.incrementCount()
    this.name = this.defaultName()
    this.marker = this.defaultMarker()
    this.number = playerCount
    this.winCount = 0
    this.isBot = isBot
  }
}

module.exports = {
  Player,
  markers,
  board
}
