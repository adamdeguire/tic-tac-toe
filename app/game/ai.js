'use strict'
const logic = require('./logic')

// Game variables
let board = logic.getBoard()
let diff = 1

// Get difficulty setting from Main Menu slider
const setDiff = (diffNum) => {
  diff = diffNum
}

// Check for columns without opponent's marker
// Argument: AI marker
const checkVert = (marker) => {
  board = logic.getBoard()
  const columns = []
  const colOptions = []
  const spaceOptions = []

  // Add all columns without opponent's marker to array
  for (let i = 0; i < 3; i++) {
    if ((board[i + 0] === ' ' || board[i + 0] === marker) &&
        (board[i + 3] === ' ' || board[i + 3] === marker) &&
        (board[i + 6] === ' ' || board[i + 6] === marker)) {
      columns.push([i, i + 3, i + 6])
    } else {
      columns.push(0)
    }
  }

  // Count how many open spaces remain in these columns
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

  // Select the column with the fewest remaining open spaces
  const col = colOptions.indexOf(Math.min(...colOptions))
  for (let i = 0; i < 3; i++) {
    const space = col + (i * 3)
    if (board[space] === ' ') {
      spaceOptions.push(space)
    }
  }
  // Return an array of the the open spaces
  return spaceOptions
}

// Check for rows without opponent's marker
// Argument: AI marker
const checkHoriz = (marker) => {
  board = logic.getBoard()
  const rows = []
  const rowOptions = []
  const spaceOptions = []

  // Add all rows without opponent's marker to array
  for (let i = 0; i < 3; i++) {
    if ((board[(3 * i) + 0] === ' ' || board[(3 * i) + 0] === marker) &&
        (board[(3 * i) + 1] === ' ' || board[(3 * i) + 1] === marker) &&
        (board[(3 * i) + 2] === ' ' || board[(3 * i) + 2] === marker)) {
      rows.push([(3 * i) + 0, (3 * i) + 1, (3 * i) + 2])
    } else {
      rows.push(0)
    }
  }

  // Count how many open spaces remain in these rows
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

  // Select the column with the fewest remaining open spaces
  const row = rowOptions.indexOf(Math.min(...rowOptions))
  for (let i = 0; i < 3; i++) {
    const space = (row * 3) + i
    if (board[space] === ' ') {
      spaceOptions.push(space)
    }
  }
  // Return an array of the the open spaces
  return spaceOptions
}

// Check for diagonals without opponent's marker
// Argument: AI marker
// Return type: array of integers or single integer
const checkDiag = (marker) => {
  board = logic.getBoard()
  const diags = []
  const diagOptions = []
  const spaceOptions = []
  let spaces = []

  // Add all diagonals without opponent's marker to array
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

    // Count how many open spaces remain in these diagonals
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

    // Select the diagonal with the fewest remaining open spaces
    // or both if they have the same number of remaining spaces
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
    // Return an array of the the open spaces
    return spaceOptions
  }
  // Or a random move if no open spaces
  return randomMove()
}

// Generate a random open space number from current game board
// Return type: integer
const randomMove = () => {
  const board = logic.getBoard()
  const open = []
  for (let i = 0; i < 9; i++) {
    if (board[i] === ' ') {
      open.push(i)
    }
  }

  return open[Math.floor(Math.random() * open.length)]
}

// Checks if game can be won on the current turn
// Argument: AI marker
// Return type: integer
const winThisTurn = (marker) => {
  for (let i = 0; i < 9; i++) {
    const board = logic.getBoard()
    if (board[i] === ' ') { board[i] = marker }
    if (logic.gameWon(marker, board)) return i
  }
}

// Compares all possible options and makes decision based on selected difficulty
// Argument: AI marker
// Return type: integer
const move = (marker) => {
  const options = [].concat(
    checkVert(marker),
    checkHoriz(marker),
    checkDiag(marker)
  )
  const choice = options[Math.floor(Math.random() * options.length)]
  const choices = []
  let count = 0

  switch (diff) {
    // Difficulty: Easy
    case 0:

      // Add possible game ending moves to choices array
      if (Number.isInteger(winThisTurn('o'))) { choices.push(winThisTurn('o')) }
      if (Number.isInteger(winThisTurn('x'))) { choices.push(winThisTurn('x')) }

      // Add all options from vert/horiz/diag formulas to choices array
      options.forEach(option => choices.push(option))

      // Fill 1/3 of the choices array with random moves
      count = Math.floor(choices.length / 2)
      for (let i = 0; i < count; i++) {
        const rand = randomMove()
        choices.push(rand)
      }

      // Return a random move from the choices array
      return choices[Math.floor(Math.random() * choices.length)]

    // Difficulty: Medium
    case 1:

      // Add possible game ending moves to choices array
      if (Number.isInteger(winThisTurn('o'))) { choices.push(winThisTurn('o')) }
      if (Number.isInteger(winThisTurn('x'))) { choices.push(winThisTurn('x')) }

      // Add all options from vert/horiz/diag formulas to choices array
      options.forEach(option => choices.push(option))

      // Fill ~1/5 of the choices array with random moves
      count = Math.floor(choices.length / 4)
      for (let i = 0; i < count; i++) {
        const rand = randomMove()
        choices.push(rand)
      }

      // Return a random move from the choices array
      return choices[Math.floor(Math.random() * choices.length)]

      // Difficulty: Hard
    case 2:

      // If a win is possible on the current turn, return that space
      if (Number.isInteger(winThisTurn('o'))) { return winThisTurn('o') }

      // Otherwise, if a loss is preventable on the current turn, return that space
      if (Number.isInteger(winThisTurn('x'))) { return winThisTurn('x') }

      // Otherwise, return a random option from vert/horiz/diag formulas
      if (options.length > 1) return choice

      // If all else fails, return a random move
      return randomMove(marker)
  }
}

module.exports = {
  setDiff,
  move
}
