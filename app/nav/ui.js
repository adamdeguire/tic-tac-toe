'use strict'

const onMainMenu = () => {
  $('#message').text('')
  $('.hideOnSignIn').hide('slow')
  $('.showOnNewGame').hide('slow')
  $('.showOnAccount').hide('slow')
  $('.showOnSignIn').show('slow')
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
  $('.showOnAccount').show('slow')
}

module.exports = {
  onMainMenu,
  onAccount
}
