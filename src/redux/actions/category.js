'use strict'

export function localStorage(data) {
	return {
		type: 'LOCAL_STORAGE',
		data
	}
}

export function addCategory(data) {
	return {
		type: 'ADD_CATEGORY',
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