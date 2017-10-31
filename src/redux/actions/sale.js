'use strict'

export function localStorageSale(data) {
	return {
		type: 'LOCAL_STORAGE_SALE',
		data
	}
}

export function penjualan(data) {
	return {
		type: 'PENJUALAN',
		data
	}
}

/*export function layout(data) {
	return {
		type: 'LAYOUT',
		data
	}
}*/