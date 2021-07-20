'use strict'
const logic = require('./logic')

let board = logic.getBoard()

const checkVert = (marker) => {
  board = logic.getBoard()
  const columns = []
  const colOptions = []
  const spaceOptions = []

  for (let i = 0; i < 3; i++) {
    if ((board[i + 0] === ' ' || board[i + 0] === marker) &&
        (board[i + 3] === ' ' || board[i + 3] === marker) &&
        (board[i + 6] === ' ' || board[i + 6] === marker)) {
      columns.push([i, i + 3, i + 6])
    } else {
      columns.push(0)
    }
  }

  columns.forEach(column => {
    if (column) {
      let count = 0
      column.forEach(space => {
        if (board[space] === ' ') count++
      })
      colOptions.push(count)
    } else {
      colOptions.push(4)
    }
  })

  const col = colOptions.indexOf(Math.min(...colOptions))
  for (let i = 0; i < 3; i++) {
    const space = col + (i * 3)
    if (board[space] === ' ') {
      spaceOptions.push(space)
    }
  }
  return spaceOptions
}

const checkHoriz = (marker) => {
  board = logic.getBoard()
  const rows = []
  const rowOptions = []
  const spaceOptions = []

  for (let i = 0; i < 3; i++) {
    if ((board[(3 * i) + 0] === ' ' || board[(3 * i) + 0] === marker) &&
        (board[(3 * i) + 1] === ' ' || board[(3 * i) + 1] === marker) &&
        (board[(3 * i) + 2] === ' ' || board[(3 * i) + 2] === marker)) {
      rows.push([(3 * i) + 0, (3 * i) + 1, (3 * i) + 2])
    } else {
      rows.push(0)
    }
  }

  rows.forEach(row => {
    if (row) {
      let count = 0
      row.forEach(space => {
        if (board[space] === ' ') count++
      })
      rowOptions.push(count)
    } else {
      rowOptions.push(4)
    }
  })

  const row = rowOptions.indexOf(Math.min(...rowOptions))
  for (let i = 0; i < 3; i++) {
    const space = (row * 3) + i
    if (board[space] === ' ') {
      spaceOptions.push(space)
    }
  }
  return spaceOptions
}

const checkDiag = (marker) => {
  board = logic.getBoard()
  const diags = []
  const diagOptions = []
  const spaceOptions = []
  let spaces = []

  if (board[4] === ' ' || board[4] === marker) {
    if ((board[0] === ' ' || board[0] === marker) &&
        (board[8] === ' ' || board[8] === marker)) {
      diags.push([0, 4, 8])
    } else {
      diags.push(0)
    }
    if ((board[2] === ' ' || board[2] === marker) &&
        (board[6] === ' ' || board[6] === marker)) {
      diags.push([2, 4, 6])
    } else {
      diags.push(0)
    }

    diags.forEach(diag => {
      if (diag !== 0) {
        let count = 0
        diag.forEach(space => {
          if (board[space] === ' ') count++
        })
        diagOptions.push(count)
      } else {
        diagOptions.push(4)
      }
    })

    if (diagOptions < 3 && diagOptions.every(() => diagOptions[0])) {
      spaces = [0, 2, 4, 6, 8]
    } else {
      const diag = diagOptions.indexOf(Math.min(...diagOptions))
      spaces = diag ? [2, 4, 6] : [0, 4, 8]
    }
    spaces.forEach(space => {
      if (board[space] === ' ') {
        spaceOptions.push(space)
      }
    })
    return spaceOptions
  }
  return randomMove()
}

const randomMove = () => {
  const board = logic.getBoard()
  const open = []
  board.forEach(space => {
    if (space === ' ') {
      open.push(board.indexOf(space))
    }
  })
  return open[Math.floor(Math.random() * open.length)]
}

const winThisTurn = (marker) => {
  for (let i = 0; i < 9; i++) {
    const board = logic.getBoard()
    if (board[i] === ' ') { board[i] = marker }
    if (logic.gameWon(marker, board)) return i
  }
}

const move = (marker) => {
  const options = [].concat(
    checkVert(marker),
    checkHoriz(marker),
    checkDiag(marker)
  )

  const choice = options[Math.floor(Math.random() * options.length)]
  if (Number.isInteger(winThisTurn('x'))) { return winThisTurn('x') }
  if (Number.isInteger(winThisTurn('o'))) { return winThisTurn('o') }
  if (options.length > 1) return choice
  return randomMove(marker)
}

module.exports = {
  move
}
