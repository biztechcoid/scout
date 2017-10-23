'use strict'

exports.loginProcess = require('./user').loginProcess
exports.login = require('./user').login
exports.logout = require('./user').logout
exports.setUser = require('./user').setUser

exports.localStorageData = require('./category').localStorageData
exports.addCategory = require('./category').addCategory
exports.updateCategory = require('./category').updateCategory
exports.deleteCategory = require('./category').deleteCategory
exports.addProduct = require('./category').addProduct
exports.updateProduct = require('./category').updateProduct
exports.deleteProduct = require('./category').deleteProduct
exports.refreshing = require('./category').refreshing
exports.barcodeProduct = require('./category').barcodeProduct
exports.updateStock = require('./category').updateStock

exports.localStorageSale = require('./sale').localStorageSale
exports.penjualan = require('./sale').penjualan