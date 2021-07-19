'use strict'

const transitionText = (selector, text) => {
  $(selector).animate({ opacity: 0 }, 400, function () {
    $(this).text(text)
  }).animate({ opacity: 1 }, 600)
}

const transitionHTML = (selector, html) => {
  $(selector).animate({ opacity: 0 }, 400, function () {
    $(this).html(html)
  }).animate({ opacity: 1 }, 600)
}

const transitionFast = (selector, html) => {
  $(selector).animate({ opacity: 0 }, 100, function () {
    $(this).html(html)
  }).animate({ opacity: 1 }, 100)
}

const onSignUpInstead = (event) => {
  event.preventDefault()
  $('#signUpEmail').val($('#signInEmail').val())
  $('#signUpPass').val($('#signInPass').val())
  $('#signUpInstead, #authButtons, #signIn').hide(400)
  setTimeout(() => {
    $('#authButtons, #signUp').show(600)
    $('#signInInstead').show()
    transitionText('#authHeader', 'Come here often?')
  }, 400)
}

const onSignInInstead = (event) => {
  event.preventDefault()
  $('#signInEmail').val($('#signUpEmail').val())
  $('#signInPass').val($('#signUpPass').val())
  $('#signInInstead, #authButtons, #signUp').hide(400)
  setTimeout(() => {
    $('#authButtons, #signIn').show(600)
    $('#signUpInstead').show()
    transitionText('#authHeader', 'New here?')
  }, 400)
}

const onMainMenu = () => {
  transitionText('#message', 'Main Menu')
  $('.hideOnSignIn, .showOnNewGame, .showOnAccount').hide(400)
  setTimeout(() => $('.showOnSignIn').show(600), 400)
}

const onAccount = () => {
  transitionText('#message', 'Your Account')
  $('#topNav, #showSignOut').removeClass('showOnSignIn')
  $('.signOutConfirm').removeClass('hideOnSignIn')
  $('.hideOnSignIn, .showOnNewGame, .showOnSignIn').hide(400)
  $('#topNav, #showSignOut').addClass('showOnSignIn')
  $('.signOutConfirm').addClass('hideOnSignIn')
  setTimeout(() => $('.showOnAccount').show(600), 400)
}

const onAreYouSure = (event) => {
  event.preventDefault()
  $('#areYouSure, #showSignOut').toggle()
  $('.areYouSure').toggle(800)
}

const onShowPassword = (event) => {
  event.preventDefault()
  $('#changePassword, .showOnAccount').toggle(800)
  if ($('#message').text() === 'Your Account') {
    transitionText('#message', 'Change Password')
  } else {
    transitionText('#message', 'Your Account')
  }
}

module.exports = {
  onSignUpInstead,
  onSignInInstead,
  onMainMenu,
  onAccount,
  onAreYouSure,
  onShowPassword,
  transitionText,
  transitionHTML,
  transitionFast
}
