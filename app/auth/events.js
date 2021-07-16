'use strict'
const getFormFields = require('../../lib/get-form-fields')
const api = require('./api.js')

const onSignUp = (event) => {
  event.preventDefault()
  const data = getData(event)
  api.signUp(data)
}

const onSignIn = (event) => {
  event.preventDefault()
  const data = getData(event)
  api.signIn(data)
}

const onSignUpInstead = (event) => {
  event.preventDefault()
  $('#signUpEmail').val($('#signInEmail').val())
  $('#signUpPass').val($('#signInPass').val())
  $('#signIn').hide()
  $('#signUp').show()
  $('#signInInstead').show()
  $('#signUpInstead').hide()
}

const onSignInInstead = (event) => {
  event.preventDefault()
  $('#signInEmail').val($('#signUpEmail').val())
  $('#signInPass').val($('#signUpPass').val())
  $('#signUp').hide()
  $('#signIn').show()
  $('#signInInstead').hide()
  $('#signUpInstead').show()
}

const onSignOut = (event) => {
  event.preventDefault()
  api.signOut()
}

const onChangePassword = (event) => {
  event.preventDefault()
  const data = getData(event)
  api.changePassword(data)
}

const getData = (event) => {
  const form = event.target
  const data = getFormFields(form)
  return data
}

module.exports = {
  onSignUp,
  onSignIn,
  onSignUpInstead,
  onSignInInstead,
  onSignOut,
  onChangePassword
}
