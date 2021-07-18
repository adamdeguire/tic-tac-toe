const authEvents = require('./auth/events')
const gameEvents = require('./game/events')
const nav = require('./nav/ui')

$(() => {
  $('#signUp').on('submit', authEvents.onSignUp)
  $('#signIn').on('submit', authEvents.onSignIn)
  $('#signUpInstead').on('click', authEvents.onSignUpInstead)
  $('#signInInstead').on('click', authEvents.onSignInInstead)
  $('#changePass').on('submit', authEvents.onChangePassword)
  $('.showSignOut').on('click', authEvents.onAreYouSure)
  $('#signOut').on('click', authEvents.onSignOut)
  $('#account').on('click', nav.onAccount)
  $('#navTitle').on('click', nav.onMainMenu)
  $('#newGame').on('click', gameEvents.onNewGame)
  $('#playAgain').on('click', gameEvents.onNewGame)
  for (let i = 0; i < 9; i++) {
    $(`#${i}`).on('click', gameEvents.onPlaceMarker)
  }
  $('.hideOnStart').hide()
})
