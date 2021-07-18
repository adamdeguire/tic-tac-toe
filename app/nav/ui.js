'use strict'

const showMainMenu = () => {
  $('#message').text('')
  $('.hideOnSignIn').hide('slow')
  $('.showOnNewGame').hide('slow')
  $('.showOnSignIn').show('slow')
}

module.exports = {
  showMainMenu
}
