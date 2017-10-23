'use strict'

export function localStorageData(data) {
	return {
		type: 'LOCAL_STORAGE_CATEGORY',
		data
	}
}

export function addCategory(data) {
	return {
		type: 'ADD_CATEGORY',
		data
	}
}

export function updateCategory(data) {
	return {
		type: 'UPDATE_CATEGORY',
		data
	}
}

export function deleteCategory(data) {
	return {
		type: 'DELETE_CATEGORY',
		data
	}
}

export function addProduct(data) {
	return {
		type: 'ADD_PRODUCT',
		data
	}
}

export function updateProduct(data) {
	return {
		type: 'UPDATE_PRODUCT',
		data
	}
}

export function deleteProduct(data) {
	return {
		type: 'DELETE_PRODUCT',
		data
	}
}

export function refreshing(data) {
	return {
		type: 'REFRESHING',
		data
	}
}

export function barcodeProduct(data) {
	return {
		type: 'BARCODE_PRODUCT',
		data
	}
}

export function updateStock(data) {
	return {
		type: 'UPDATE_STOCK',
		data
	}
}