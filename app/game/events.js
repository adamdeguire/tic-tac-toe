'use strict'
const ai = require('./ai')
const ui = require('./ui')
const api = require('./api')
const nav = require('../nav/ui')
const logic = require('./logic')

// Game variables
const markers = ['x', 'o']
let turnCount = 0
let aiBool = false

// When 'New Game' is selected:
const onNewGame = (event) => {
  // Request new game creation
  api.newGame()

  // Transition to new game view
  turnCount = 0
  $('.menuBtn').hide(400)
  nav.transitionText('#playAgain', 'Restart')
  setTimeout(() => $('.showOnNewGame').show(600), 400)
  nav.transitionFast('#message', `Turn ${turnCount + 1}: ${markers[turnCount % 2].bold().toUpperCase()}`)

  // Clear game logic board array
  logic.clearBoard()

  // Clear displayed board
  for (let i = 0; i < 9; i++) {
    $(`#${i}`).css('background-image', '')
    $(`#${i}`).removeClass('marked animateMarked')
  }
}

// When 'Game Data' is selected:
const onGetGameData = () => {
  // Show loading icon
  $('.menuBtn').hide(400)
  nav.transitionHTML('#message',
    '<div class="spinner-border" role="status">' +
    '<span class="sr-only"></span>' +
    '</div>'
  )
  // Request game data from API
  api.getGames()
}

// When the player type button is clicked:
const onToggleAI = () => {
  aiBool = !aiBool
  if ($('#playerType').text() === 'Play AI') {
    nav.transitionText('#playerType', 'Play Human')
  } else {
    nav.transitionText('#playerType', 'Play AI')
  }
}

// When a space on the game board is selected:
const onPlaceMarker = (event) => {
  // Initialize variable for selected space
  const space = $(event.target).attr('id')

  // If the space is available:
  if (!$(`#${space}`).hasClass('marked')) {
    // Identify the marker to be placed
    const marker = markers[(turnCount) % 2]
    turnCount++

    // Mark the selected space with the correct marker
    $(`#${space}`).css('background-image', `url(./public/images/${marker}.png)`)
    $(`#${space}`).addClass('marked animateMarked')

    // Update the game logic board array
    logic.placeMarker(space, marker)

    // If the game is over:
    if (logic.gameWon(marker) || turnCount >= 9) {
      // Display game-over view
      ui.onGameOver(marker)

      // Update the game API
      api.updateGame(parseInt(space), marker.toLowerCase(), true)

      // Disable the game board
      for (let i = 0; i < 9; i++) {
        $(`#${i}`).addClass('marked')
      }
    } else {
      // If the game isn't over:

      // Update the game API
      api.updateGame(parseInt(space), marker.toLowerCase(), false)

      // Display next turn
      nav.transitionFast('#message', `Turn ${turnCount + 1}: ${markers[(turnCount) % 2].bold().toUpperCase()}`)
    }
  } else {
    // If the space is taken, play 'invalid' animation on that space
    $(`#${space}`).addClass('invalid')
    setTimeout(() => $(`#${space}`).removeClass('invalid animateMarked'), 500)
  }
  if (aiBool && turnCount % 2 === 1 && turnCount < 9 && !logic.gameWon('x') && !logic.gameWon('o')) {
    for (let i = 0; i < 9; i++) $(`#${i}`).off()
    setTimeout(() => {
      for (let i = 0; i < 9; i++) $(`#${i}`).on('click', onPlaceMarker)
      $(`#${ai.move('o')}`).trigger('click')
    }, 1000)
  }
}

module.exports = {
  onNewGame,
  onPlaceMarker,
  onGetGameData,
  onToggleAI
}
