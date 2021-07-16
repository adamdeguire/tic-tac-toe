'use strict'
const gameLogic = require('./logic')

const onNewGame = (event) => {
  $('.gameBtn').hide('slow')
  $('#board').show('slow')
}

const onPlaceMarker = (event) => {
  const space = $(event.target).attr('id')
  $(space).css('background-image', 'url(../../images/x.png)')
}

module.exports = {
  onNewGame,
  onPlaceMarker
}
