'use strict'
const ui = require('./ui')
const api = require('./api')
const logic = require('./logic')
const markers = ['X', 'O']
let turnCount = 0

const onNewGame = (event) => {
  api.newGame()
  turnCount = 0
  logic.clearBoard()
  $('#playAgain').text('Restart')
  $('.menuBtn').hide('slow')
  $('.showOnNewGame').show('slow')
  for (let i = 0; i < 9; i++) {
    $(`#${i}`).css('background-image', '')
    $(`#${i}`).removeClass('marked animateMarked')
  }
  $('#message').html(`Turn ${turnCount + 1}: <b>${markers[turnCount % 2]}</b>`)
}

const onPlaceMarker = (event) => {
  const space = $(event.target).attr('id')
  if (!$(`#${space}`).hasClass('marked')) {
    const marker = markers[(turnCount) % 2]
    turnCount++
    $(`#${space}`).css('background-image', `url(./public/images/${marker}.png)`)
    $(`#${space}`).addClass('marked animateMarked')

    logic.placeMarker(space, marker)
    if (logic.gameWon(marker)) {
      ui.onGameOver(marker)
      api.updateGame(parseInt(space), marker.toLowerCase(), true)
      for (let i = 0; i < 9; i++) {
        $(`#${i}`).addClass('marked')
      }
    } else {
      api.updateGame(parseInt(space), marker.toLowerCase(), false)
      $('#message').html(`Turn ${turnCount + 1}: <b>${markers[(turnCount) % 2]}</b>`)
    }
  } else {
    $(`#${space}`).addClass('invalid')
    setTimeout(() => $(`#${space}`).removeClass('invalid animateMarked'), 500)
  }
}

module.exports = {
  onNewGame,
  onPlaceMarker
}
