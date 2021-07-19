'use strict'

const ui = require('./ui')
const store = require('../store')
const config = require('../config')

// Request creation of new game object for existing user
const newGame = () => {
  return $.ajax({
    url: `${config.apiUrl}/games`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${store.token}`
    }
  })
    .then(ui.onNewGameSuccess)
}

// Request update of existing game object for existing user
const updateGame = (index, marker, over) => {
  return $.ajax({
    url: `${config.apiUrl}/games/${store.gameId}`,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${store.token}`
    },
    data: {
      game: {
        cell: {
          index: index,
          value: marker
        },
        over: over
      }
    }
  })
}

// Request all game objects for existing user
const getGames = () => {
  return $.ajax({
    url: `${config.apiUrl}/games`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${store.token}`
    }
  })
    .then(ui.onGetGameDataSuccess)
    .catch(ui.onGetGameDataFailure)
}

module.exports = {
  newGame,
  updateGame,
  getGames
}
