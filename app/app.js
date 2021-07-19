const authEvents = require('./auth/events')
const gameEvents = require('./game/events')
const nav = require('./nav/ui')

$(() => {
  // Authorization Event Listeners
  $('#signUp').on('submit', authEvents.onSignUp)
  $('#signIn').on('submit', authEvents.onSignIn)
  $('#signOut').on('click', authEvents.onSignOut)
  $('#changePassword').on('submit', authEvents.onChangePassword)

  // Navigation Event Listeners
  $('#signUpInstead').on('click', nav.onSignUpInstead)
  $('#signInInstead').on('click', nav.onSignInInstead)
  $('#showPassword').on('click', nav.onShowPassword)
  $('.showSignOut').on('click', nav.onAreYouSure)
  $('#navTitle').on('click', nav.onMainMenu)
  $('#account').on('click', nav.onAccount)
  $('#neat').on('click', nav.onAccount)

  // Game Event Listeners
  $('#gameData').on('click', gameEvents.onGetGameData)
  $('#newGame, #playAgain').on('click', gameEvents.onNewGame)
  for (let i = 0; i < 9; i++) $(`#${i}`).on('click', gameEvents.onPlaceMarker)

  // Initialize to login view
  $('.hideOnStart').hide()
})
