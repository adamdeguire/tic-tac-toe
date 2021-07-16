'use strict'
const store = require('../store')

const onSignUpSuccess = (response) => {
  $('#message').text(`New user ${response.user.email} created. Sign in with your new account to play!`)
  $('#signUp').trigger('reset')
}

const onSignUpFailure = (response) => {
  $('#message').text('Looks like that email is already in use here. Sign in instead?')
}

const onSignInSuccess = (response) => {
  $('#message').text(`Welcome back, ${response.user.email}!`)
  $('#signIn').trigger('reset')
  $('.hideOnSignIn').hide('slow')
  $('.showOnSignIn').show('slow')
  $('#gameTitle').text(' ')
  store.token = response.user.token
}

const onSignInFailure = (response) => {
  $('#message').text('No account found. Sign up instead?')
}

const onSignOutSuccess = () => {
  $('#message').text('Signed out. Come back soon!')
  $('.showOnStart').show('slow')
  $('.hideOnStart').hide('slow')
  $('#gameTitle').text('Tic-Tac-Toe')
  $('#authHeader').text('New here?')
  for (let i = 0; i < 9; i++) {
    $(`#${i}`).css('background-image', '')
  }
}

const onSignOutFailure = () => {
  $('#message').text('There was an error processing your request.')
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onSignOutFailure
}
