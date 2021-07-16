'use strict'
const gameLogic = require('./logic')
const markers = ['X', 'O']
let turnCount = 0

const onNewGame = (event) => {
  $('.gameBtn').hide('slow')
  $('.showOnNewGame').show('slow')
  $('#message').html(`Turn ${turnCount + 1}: <b>${markers[turnCount % 2]}</b>`)
}

const onPlaceMarker = (event) => {
  const space = $(event.target).attr('id')
  if (!$(`#${space}`).hasClass('marked')) {
    turnCount++
    $(`#${space}`).css('background-image', `url(../../images/${markers[(turnCount + 1) % 2]}.png)`)
    $(`#${space}`).addClass('marked animateMarked')
    $('#message').html(`Turn ${turnCount + 1}: <b>${markers[turnCount % 2]}</b>`)
  } else {
    $(`#${space}`).addClass('invalid')
    setTimeout(() => $(`#${space}`).removeClass('invalid animateMarked'), 500)
  }
}

module.exports = {
  onNewGame,
  onPlaceMarker
}
