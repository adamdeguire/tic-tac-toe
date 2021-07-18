'use strict'
const store = require('../store')

const onNewGameSuccess = (response) => {
  store.gameId = response.game._id
}

const onGameOver = (marker) => {
  $('#playAgain').text('Again?')
  $('#message').html(`${marker} wins!`)
  $('body').addClass('confetti')
  setTimeout(() => $('body').on('click', () => {
    $('body').removeClass('confetti')
    $('body').off()
  }), 2000)
}

module.exports = {
  onNewGameSuccess,
  onGameOver
}
