'use strict'

export function localStorageData(data) {
	return {
		type: 'LOCAL_STORAGE_CATEGORY',
		data
	}
}

/*
*
category
*
*/
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
/**/

/*
*
product
*
*/
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
/**/

/*
*
sub product
*
*/
export function addSubProduct(data) {
	return {
		type: 'ADD_SUB_PRODUCT',
		data
	}
}

export function updateSubProduct(data) {
	return {
		type: 'UPDATE_SUB_PRODUCT',
		data
	}
}

export function deleteSubProduct(data) {
	return {
		type: 'DELETE_SUB_PRODUCT',
		data
	}
}
/**/

/*
*
ingredients
*
*/
export function addIngredients(data) {
	return {
		type: 'ADD_INGREDIENTS',
		data
	}
}

export function updateIngredients(data) {
	return {
		type: 'UPDATE_INGREDIENTS',
		data
	}
}

export function deleteIngredients(data) {
	return {
		type: 'DELETE_INGREDIENTS',
		data
	}
}

export function pushIngredients(data) {
	return {
		type: 'PUSH_INGREDIENTS',
		data
	}
}

export function spliceIngredients(data) {
	return {
		type: 'SPLICE_INGREDIENTS',
		data
	}
}
/**/

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