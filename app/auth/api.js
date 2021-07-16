'use strict'
const ui = require('./ui')
const store = require('../store')
const config = require('../config')

const signUp = (data) => {
  return $.ajax({
    url: `${config.apiUrl}/sign-up`,
    method: 'POST',
    data: data
  })
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)
}

const signIn = (data) => {
  return $.ajax({
    url: `${config.apiUrl}/sign-in`,
    method: 'POST',
    data: data
  })
    .then(ui.onSignInSuccess)
    .catch(ui.onSignInFailure)
}

const signOut = () => {
  return $.ajax({
    url: `${config.apiUrl}/sign-out`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${store.token}`
    }
  })
    .then(ui.onSignOutSuccess)
    .catch(ui.onSignOutFailure)
}

const changePassword = () => {

}

module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword
}
