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
  // Example server response:
  // {
  //   "games": [
  //     {
  //       "cells": ["x","","","o","","","","",""],
  //       "over": false,
  //       "_id": "5ed7e519659863c00ff4907e",
  //       "owner": "5e82311c8929cc4e95e2f5d8",
  //       "createdAt": "2020-03-30T16:34:17.792Z",
  //       "updatedAt": "2020-03-30T18:37:30.232Z",
  //       "__v": 0
  //     }
  //   ]
  // }

  // Calculate data to display using server response:

  // Total games started
  const gamesPlayed = response.games

  // Total games finished
  const gamesCompleted = response.games.filter(game => game.over)

  // Boards where 'x' triggers win state
  const xWins = response.games.filter(game => logic.gameWon('x', game.cells))

  // Boards where 'o' triggers win state
  const oWins = response.games.filter(game => logic.gameWon('o', game.cells))

  // Completed boards with no triggered win state
  const ties = gamesCompleted.filter(game => {
    if (!logic.gameWon('x', game.cells) &&
        !logic.gameWon('o', game.cells)) {
      return true
    }
    return false
  })

  // Total moves across all boards / number of games played
  let countMoves = 0
  gamesPlayed.forEach(game => { countMoves += game.__v })
  const movesPerGame = (countMoves / gamesPlayed.length).toFixed(2)

  // Total moves across all boards / number of games completed
  countMoves = 0
  gamesCompleted.forEach(game => { countMoves += game.__v })
  const movesPerWin = (countMoves / gamesCompleted.length).toFixed(2)

  // Array of all completed game lengths (time)
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

  // Format HTML to display above data
  nav.transitionHTML('#message',
    'Games played: <b>' + gamesPlayed.length + '</b><br /><br />' +
    'Games completed: <b>' + gamesCompleted.length + '</b><br /><br />' +
    '<b>X</b> wins: <b>' + xWins.length + '</b><br /><br />' +
    '<b>O</b> wins: <b>' + oWins.length + '</b><br /><br />' +
    'Ties: <b>' + ties.length + '</b><br /><br />' +
    'Avg. moves/game: <b>' + movesPerGame + '</b><br /><br />' +
    'Avg. moves/win: <b>' + movesPerWin + '</b><br /><br />' +
    'Shortest game: <b>' + gameTime(Math.min(...gameLengths)) + ' </b><br /><br />' +
    'Longest game: <b>' + gameTime(Math.max(...gameLengths)) + ' </b><br /><br />'
  )
}

module.exports = {
  onNewGameSuccess,
  onGameOver,
  onGetGameDataSuccess
}
