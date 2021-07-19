'use strict'
const nav = require('../nav/ui')
const store = require('../store')
const logic = require('../game/logic')

const onNewGameSuccess = (response) => {
  store.gameId = response.game._id
}

const onGameOver = (marker) => {
  nav.transitionText('#playAgain', 'Again?')
  nav.transitionHTML('#message', logic.gameWon(marker) ? `<b>${marker}</b> wins!` : 'It\'s a tie!')
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
