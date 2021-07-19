'use strict'
const store = require('../store')
const logic = require('../game/logic')

const onNewGameSuccess = (response) => {
  store.gameId = response.game._id
}

const onGameOver = (marker) => {
  $('#playAgain').text('Again?')
  $('#message').html(logic.gameWon(marker) ? `${marker} wins!` : 'It\'s a tie!')
  if (logic.gameWon(marker)) {
    $('body').addClass('confetti')
    setTimeout(() => $('body').on('click', () => {
      $('body').removeClass('confetti')
      $('body').off()
    }), 2000)
  }
}

module.exports = {
  onNewGameSuccess,
  onGameOver
}
