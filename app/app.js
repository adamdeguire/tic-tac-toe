const authEvents = require('./auth/events')
const gameEvents = require('./game/events')
const nav = require('./nav/ui')

$(() => {
  $('#signUp').on('submit', authEvents.onSignUp)
  $('#signIn').on('submit', authEvents.onSignIn)
  $('#signUpInstead').on('click', nav.onSignUpInstead)
  $('#signInInstead').on('click', nav.onSignInInstead)
  $('#showPassword').on('click', nav.onShowPassword)
  $('#changePassword').on('submit', authEvents.onChangePassword)
  $('.showSignOut').on('click', nav.onAreYouSure)
  $('#signOut').on('click', authEvents.onSignOut)
  $('#account').on('click', nav.onAccount)
  $('#neat').on('click', nav.onAccount)
  $('#navTitle').on('click', nav.onMainMenu)
  $('#newGame, #playAgain').on('click', gameEvents.onNewGame)
  $('#gameData').on('click', gameEvents.onGetGameData)
  for (let i = 0; i < 9; i++) {
    $(`#${i}`).on('click', gameEvents.onPlaceMarker)
  }
  $('.hideOnStart').hide()
})
