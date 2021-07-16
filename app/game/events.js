'use strict'
const gameLogic = require('./logic')
const markers = ['x', 'o']
let turnCount = -1

const onNewGame = (event) => {
  $('.gameBtn').hide('slow')
  $('.showOnNewGame').show('slow')
}

const onPlaceMarker = (event) => {
  const space = $(event.target).attr('id')
  if (!$(`#${space}`).hasClass('marked')) {
    turnCount++
    $(`#${space}`).css('background-image', `url(../../images/${markers[turnCount % 2]}.png)`)
    $(`#${space}`).addClass('marked animateMarked')
  } else {
    $(`#${space}`).addClass('invalid')
    setTimeout(() => $(`#${space}`).removeClass('invalid animateMarked'), 1000)
  }
}

module.exports = {
  onNewGame,
  onPlaceMarker
}
