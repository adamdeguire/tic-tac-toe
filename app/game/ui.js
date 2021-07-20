'use strict'
const nav = require('../nav/ui')
const store = require('../store')
const logic = require('../game/logic')

// Store new game ID
const onNewGameSuccess = (response) => {
  store.gameId = response.game._id
}

// Display game-over view
const onGameOver = (marker) => {
  nav.transitionText('#playAgain', 'Again?')
  nav.transitionHTML('#message', logic.gameWon(marker) ? `<b>${marker.toUpperCase()}</b> wins!` : 'It\'s a tie!')
  if (logic.gameWon(marker)) {
    $('body').addClass('confetti')
    setTimeout(() => $('body').on('click', () => {
      $('body').removeClass('confetti')
      $('body').off()
    }), 2000)
  }
}

// Display current user's game statistics
const onGetGameDataSuccess = (response) => {
  console.log(response)
  const gamesPlayed = response.games
  const gamesCompleted = response.games.filter(game => game.over)
  const xWins = response.games.filter(game => logic.gameWon('x', game.cells))
  const oWins = response.games.filter(game => logic.gameWon('o', game.cells))
  const ties = gamesCompleted.filter(game => {
    if (!logic.gameWon('x', game.cells) &&
        !logic.gameWon('o', game.cells)) {
      return true
    }
    return false
  })
  let countMoves = 0
  gamesPlayed.forEach(game => { countMoves += game.__v })
  const movesPerGame = (countMoves / gamesPlayed.length).toFixed(2)
  countMoves = 0
  gamesCompleted.forEach(game => { countMoves += game.__v })
  const movesPerWin = (countMoves / gamesCompleted.length).toFixed(2)
  const gameLengths = []
  gamesCompleted.forEach(game => {
    const start = new Date(game.createdAt)
    const end = new Date(game.updatedAt)
    gameLengths.push(((end - start) / 1000).toFixed(2))
  })
  const gameTime = (time) => {
    let m = ''
    if (time >= 60) {
      m = Math.floor(time / 60)
    }
    const s = (time - (m * 60)).toFixed(2)
    if (m !== '') {
      m += 'm '
    }
    return `${m} ${s}s`
  }
  nav.transitionHTML('#message',
    'Games played: <b>' + gamesPlayed.length + '</b><br /><br />' +
    'Games completed: <b>' + gamesCompleted.length + '</b><br /><br />' +
    '<b>X</b> wins: <b>' + xWins.length + '</b><br /><br />' +
    '<b>O</b> wins: <b>' + oWins.length + '</b><br /><br />' +
    'Ties: <b>' + ties.length + '</b><br /><br />' +
    'Average moves/game: <b>' + movesPerGame + '</b><br /><br />' +
    'Average moves/win: <b>' + movesPerWin + '</b><br /><br />' +
    'Shortest game: <b>' + gameTime(Math.min(...gameLengths)) + ' </b><br /><br />' +
    'Longest game: <b>' + gameTime(Math.max(...gameLengths)) + ' </b><br /><br />'
  )
}

// Display error message and code
const onGetGameDataFailure = (response) => {
  nav.transitionText(`Something went wrong. Please refresh and try again. Error: ${response.status}`)
}

module.exports = {
  onNewGameSuccess,
  onGameOver,
  onGetGameDataSuccess,
  onGetGameDataFailure
}
