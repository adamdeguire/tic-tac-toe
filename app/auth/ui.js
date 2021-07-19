'use strict'
const store = require('../store')
const nav = require('../nav/ui')

const onFailure = () => {
  nav.transitionText('#message', 'There was an error processing your request.')
}

const onSignUpSuccess = (response) => {
  nav.transitionText('#message', `New user ${response.user.email} created. Sign in with your new account to play!`)
  $('#signUp').trigger('reset')
}

const onSignUpFailure = () => {
  nav.transitionText('#message', 'Looks like that email is already in use here. Sign in instead?')
}

const onSignInSuccess = (response) => {
  console.log(response)
  nav.onMainMenu()
  nav.transitionText('#message', `Welcome back, ${response.user.email}!`)
  $('#signIn').trigger('reset')
  nav.transitionText('#gameTitle', ' ')
  store.token = response.user.token
}

const onSignInFailure = (response) => {
  nav.transitionText('#message', 'No account found. Sign up instead?')
}

const onSignOutSuccess = () => {
  nav.transitionText('#message', 'Come back soon!')
  $('.hideOnStart').hide(400)
  setTimeout(() => $('.showOnStart').show(600), 400)
  nav.transitionText('#gameTitle', 'Tic-Tac-Toe')
  nav.transitionText('#authHeader', 'New here?')
  $('body').on('click', () => {
    nav.transitionText('#message', ' ')
    $('body').off()
  })
}

const onSignOutFailure = () => {
  onFailure()
}

const onChangePasswordSuccess = (response) => {
  nav.transitionText('#message', 'Password Changed!')
  $('#changePassword').trigger('reset')
  $('#changePassword').hide(400)
  setTimeout(() => $('#neat').show(600), 400)
}

const onChangePasswordFailure = (response) => {
  switch (response.status) {
    case 400:
      nav.transitionText('#message', 'Something went wrong, please refresh and try again.')
      break
    case 422:
      nav.transitionText('#message', 'Invalid password, please try again.')
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
