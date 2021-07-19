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
  onSignOut,
  onChangePassword
}
