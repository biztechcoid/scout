'use strict'

/*
*
user
*
*/
exports.registerUser = require('./user').registerUser
exports.loginProcess = require('./user').loginProcess
exports.login = require('./user').login
exports.logout = require('./user').logout
exports.setUser = require('./user').setUser
exports.localStorageUsers = require('./user').localStorageUsers

/*
*
category
*
*/
exports.localStorageData = require('./category').localStorageData
exports.addCategory = require('./category').addCategory
exports.updateCategory = require('./category').updateCategory
exports.deleteCategory = require('./category').deleteCategory

/*
*
product
*
*/
exports.addProduct = require('./category').addProduct
exports.updateProduct = require('./category').updateProduct
exports.deleteProduct = require('./category').deleteProduct

/*
*
sub product
*
*/
exports.addSubProduct = require('./category').addSubProduct
exports.updateSubProduct = require('./category').updateSubProduct
exports.deleteSubProduct = require('./category').deleteSubProduct

/*
*
ingredients
*
*/
exports.addIngredients = require('./category').addIngredients
exports.updateIngredients = require('./category').updateIngredients
exports.deleteIngredients = require('./category').deleteIngredients
exports.pushIngredients = require('./category').pushIngredients
exports.spliceIngredients = require('./category').spliceIngredients

exports.refreshing = require('./category').refreshing
exports.barcodeProduct = require('./category').barcodeProduct
exports.updateStock = require('./category').updateStock

exports.localStorageSale = require('./sale').localStorageSale
exports.penjualan = require('./sale').penjualan
exports.layout = require('./sale').layout