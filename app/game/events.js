'use strict'
const logic = require('./logic')
const markers = ['X', 'O']
let turnCount = 0

const onNewGame = (event) => {
  turnCount = 0
  logic.clearBoard()
  $('#playAgain').text('Restart')
  $('.gameBtn').hide('slow')
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
    $(`#${space}`).css('background-image', `url(../../images/${marker}.png)`)
    $(`#${space}`).addClass('marked animateMarked')

    logic.placeMarker(space, marker)
    if (logic.gameWon(marker)) {
      $('#playAgain').text('Again?')
      $('#message').html(`${marker} wins!`)
      $('body').addClass('confetti')
      setTimeout(() => $('body').on('click', () => {
        $('body').removeClass('confetti')
        $('body').off()
      }), 2000)

      for (let i = 0; i < 9; i++) {
        $(`#${i}`).addClass('marked')
      }
    } else {
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
