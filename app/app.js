// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authEvents = require('./auth/events')
const gameEvents = require('./game/events')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('#signUp').on('submit', authEvents.onSignUp)
  $('#signIn').on('submit', authEvents.onSignIn)
  $('#signUpInstead').on('click', authEvents.onSignUpInstead)
  $('#signInInstead').on('click', authEvents.onSignInInstead)
  $('#changePass').on('submit', authEvents.onChangePassword)
  $('#signOut').on('click', authEvents.onSignOut)
  $('#newGame').on('click', gameEvents.onNewGame)
  $('#playAgain').on('click', gameEvents.onNewGame)
  for (let i = 0; i < 9; i++) {
    $(`#${i}`).on('click', gameEvents.onPlaceMarker)
  }
  $('.hideOnStart').hide()
})
