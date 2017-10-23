'use strict'

const makeId = function() {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'

  for(var i = 0; i < 20; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))

  return text
}

module.exports = makeId