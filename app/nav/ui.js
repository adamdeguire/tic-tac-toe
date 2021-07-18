'use strict'

const onMainMenu = () => {
  $('#message').text('')
  $('.hideOnSignIn').hide('slow')
  $('.showOnNewGame').hide('slow')
  $('.showOnAccount').hide('slow')
  setTimeout(() => $('.showOnSignIn').show('slow'), 400)
}

const onAccount = () => {
  $('#message').text('Your Account')
  $('#topNav').removeClass('showOnSignIn')
  $('#showSignOut').removeClass('showOnSignIn')
  $('.hideOnSignIn').hide('slow')
  $('.showOnNewGame').hide('slow')
  $('.showOnSignIn').hide('slow')
  $('#topNav').addClass('showOnSignIn')
  $('#showSignOut').addClass('showOnSignIn')
  setTimeout(() => $('.showOnAccount').show('slow'), 400)
}

module.exports = {
  onMainMenu,
  onAccount
}
