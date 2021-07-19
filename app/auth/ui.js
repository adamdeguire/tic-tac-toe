'use strict'
const store = require('../store')
const nav = require('../nav/ui')

const onFailure = () => {
  $('#message').text('There was an error processing your request.')
}

const onSignUpSuccess = (response) => {
  $('#message').text(`New user ${response.user.email} created. Sign in with your new account to play!`)
  $('#signUp').trigger('reset')
}

const onSignUpFailure = (response) => {
  $('#message').text('Looks like that email is already in use here. Sign in instead?')
}

const onSignInSuccess = (response) => {
  nav.onMainMenu()
  $('#message').text(`Welcome back, ${response.user.email}!`)
  $('#signIn').trigger('reset')
  $('#gameTitle').text(' ')
  store.token = response.user.token
}

const onSignInFailure = (response) => {
  $('#message').text('No account found. Sign up instead?')
}

const onSignOutSuccess = () => {
  $('#message').text('Signed out. Come back soon!')
  $('.hideOnStart').hide('slow')
  setTimeout(() => $('.showOnStart').show('slow'), 400)
  $('#gameTitle').text('Tic-Tac-Toe')
  $('#authHeader').text('New here?')
  $('body').on('click', () => {
    $('#message').text(' ')
    $('body').off()
  })
}

const onSignOutFailure = () => {
  onFailure()
}

const onChangePasswordSuccess = (response) => {
  $('#message').text('Password Changed!')
  $('#changePassword').trigger('reset')
  $('#changePassword').hide('slow')
  setTimeout(() => $('#neat').show('slow'), 400)
}

const onChangePasswordFailure = (response) => {
  switch (response.status) {
    case 400:
      $('#message').text('Something went wrong, please refresh and try again.')
      break
    case 422:
      $('#message').text('Invalid password, please try again.')
      break
  }
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onSignOutFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure
}
