'use strict'

exports.loginProcess = require('./user').loginProcess
exports.login = require('./user').login
exports.logout = require('./user').logout
exports.setUser = require('./user').setUser

exports.localStorage = require('./category').localStorage
exports.addCategory = require('./category').addCategory
exports.deleteCategory = require('./category').deleteCategory
exports.addProduct = require('./category').addProduct
exports.deleteProduct = require('./category').deleteProduct
exports.refreshing = require('./category').refreshing
exports.doneRefreshing = require('./category').doneRefreshing