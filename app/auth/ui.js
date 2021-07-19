'use strict'
const store = require('../store')
const nav = require('../nav/ui')

// On API Response Status 201, Created
// Show confirmation to user and clear form fields
const onSignUpSuccess = (response) => {
  nav.transitionText('#message', `New user ${response.user.email} created. Sign in with your new account to play!`)
  $('#signUp').trigger('reset')
}

const onSignUpFailure = () => {
  nav.transitionText('#message', 'Looks like that email is already in use here. Sign in instead?')
}

// On API Response Status 200, OK
// Transition to Main Menu and clear form fields
const onSignInSuccess = (response) => {
  nav.onMainMenu()
  nav.transitionText('#message', `Welcome back, ${response.user.email}!`)
  $('#signIn').trigger('reset')
  nav.transitionText('#gameTitle', ' ')
  store.token = response.user.token
}

const onSignInFailure = (response) => {
  nav.transitionText('#message', 'No account found. Sign up instead?')
}

// On API Response Status 201, Created
// Transition to login view and display confirmation to user
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
  nav.transitionText('#message', 'Something went wrong, please refresh and try again.')
}

// On API Response Status 204, No Content
// Display confirmation to user and reset form fields
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
