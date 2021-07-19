'use strict'

const onSignUpInstead = (event) => {
  event.preventDefault()
  $('#signUpEmail').val($('#signInEmail').val())
  $('#signUpPass').val($('#signInPass').val())
  $('#signUpInstead, #authButtons, #signIn').hide('slow')
  setTimeout(() => {
    $('#signUpInstead, #authButtons, #signIn').show('slow')
    $('#authHeader').text('Come here often?')
  }, 400)
}

const onSignInInstead = (event) => {
  event.preventDefault()
  $('#signInEmail').val($('#signUpEmail').val())
  $('#signInPass').val($('#signUpPass').val())
  $('#signIn, #authButtons, #signUpInstead').hide('slow')
  setTimeout(() => {
    $('#signIn, #authButtons, #signUpInstead').show('slow')
    $('#authHeader').text('New here?')
  }, 400)
}

const onMainMenu = () => {
  $('#message').text('Main Menu')
  $('.hideOnSignIn, .showOnNewGame, .showOnAccount').hide('slow')
  setTimeout(() => $('.showOnSignIn').show('slow'), 400)
}

const onAccount = () => {
  $('#message').text('Your Account')
  $('#topNav, #showSignOut').removeClass('showOnSignIn')
  $('.signOutConfirm').removeClass('hideOnSignIn')
  $('.hideOnSignIn, .showOnNewGame, .showOnSignIn').hide('slow')
  $('#topNav, #showSignOut').addClass('showOnSignIn')
  $('.signOutConfirm').addClass('hideOnSignIn')
  setTimeout(() => $('.showOnAccount').show('slow'), 400)
}

const onAreYouSure = (event) => {
  event.preventDefault()
  $('#areYouSure, #showSignOut').toggle()
  $('.areYouSure').toggle('slow')
}

const onShowPassword = (event) => {
  event.preventDefault()
  $('#changePassword, .showOnAccount').toggle('slow')
  if ($('#message').text() === 'Your Account') {
    $('#message').text('Change Password')
  } else {
    $('#message').text('Your Account')
  }
}

module.exports = {
  onSignUpInstead,
  onSignInInstead,
  onMainMenu,
  onAccount,
  onAreYouSure,
  onShowPassword
}
