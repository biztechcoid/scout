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

export function options(data) {
	return {
		type: 'OPTIONS',
		data
	}
}

export function back(data) {
	return {
		type: 'BACK',
		data
	}
}

export function next(data) {
	return {
		type: 'NEXT',
		data
	}
}

export function updateFilter(data) {
	return {
		type: 'UPDATE_FILTER',
		data
	}
}

export function addPengeluaran(data) {
	return {
		type: 'ADD_PENGELUARAN',
		data
	}
}

export function updatePengeluaran(data) {
	return {
		type: 'UPDATE_PENGELUARAN',
		data
	}
}

export function updatePenjualan(data) {
	return {
		type: 'UPDATE_PENJUALAN',
		data
	}
}

export function labaRugi(data) {
	return {
		type: 'LABARUGI',
		data
	}
}