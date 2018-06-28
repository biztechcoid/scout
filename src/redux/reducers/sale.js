'use strict'

import {
	AsyncStorage
} from 'react-native'

/*
*
sale
*
*/
/*
data: [
	{
		idSale: string,
		amount: number,
		discount: number,
		total: number,
		cash: number,
		change: number,
		data: [{
			idProduct: string,
			amount: number,
			discount: number,
			total: number
		}]
	}
]
*/

var bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

var tahun = []

for(var i = 2018; i <= new Date().getFullYear() + 1; i++) {
	tahun.push(i.toString())
}

var choose = []

for(var i in tahun) {
	for(var j in bulan) {
		choose.push(bulan[j] + ' ' + tahun[i])
	}
}

const initialState = {
	data: [],
	options: 'daily',
	date: new Date(),
	filter: [],
	detail: {
		konsumen: 0,
		transaksi: 0,
		total: 0
	},
	pengeluaran: {},
	labarugi: {
		penjualan: 0,
		hargaPokok: 0
	}
}

const first = new Date().getDate() - new Date().getDay()

const SaleReducers = (state = initialState, action) => {
	switch(action.type) {
		case 'LOCAL_STORAGE_SALE':
			console.log(action.data)
			if(action.data.pengeluaran === undefined) {
				AsyncStorage.setItem('@Penjualan', JSON.stringify(action.data.penjualan))
				var filter = [], konsumen = 0, total = 0
				for(var a in state.data) {
					if(new Date(new Date(state.data[a].date).getFullYear(), new Date(state.data[a].date).getMonth(), new Date(state.data[a].date).getDate()).getTime() == new Date(state.date.getFullYear(), state.date.getMonth(), state.date.getDate()).getTime()) {
						konsumen += state.data[a].customer
						total += state.data[a].total
						filter.push(state.data[a])
					}
				}
				return {
					...state,
					data: action.data.penjualan,
					filter: filter,
					detail: {
						konsumen: konsumen,
						transaksi: filter.length,
						total: total
					}
				}
			} else {
				AsyncStorage.setItem('@Pengeluaran', JSON.stringify(action.data.pengeluaran))
				return {
					...state,
					pengeluaran: action.data.pengeluaran
				}
			}

		case 'PENJUALAN':
			AsyncStorage.setItem('@Penjualan', JSON.stringify([...state.data, action.data]))
			return {
				...state,
				data: [...state.data, action.data]
			}

		case 'OPTIONS':
			var filter = [], konsumen = 0, total = 0
			switch(action.data) {
				case 'daily':
					for(var a in state.data) {
						if(new Date(new Date(state.data[a].date).getFullYear(), new Date(state.data[a].date).getMonth(), new Date(state.data[a].date).getDate()).getTime() == new Date(state.date.getFullYear(), state.date.getMonth(), state.date.getDate()).getTime()) {
							konsumen += state.data[a].customer
							total += state.data[a].total
							filter.push(state.data[a])
						}
					}
					return {
						...state,
						options: action.data,
						date: new Date(),
						filter: filter,
						detail: {
							konsumen: konsumen,
							transaksi: filter.length,
							total: total
						}
					}

				case 'weekly':
					for(var a in state.data) {
						var myDate = new Date(state.data[a].date)
						if(new Date(new Date(new Date().setDate(first)).getFullYear(), new Date(new Date().setDate(first)).getMonth(), new Date(new Date().setDate(first)).getDate()).getTime() <= new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate()).getTime() &&
							new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate()).getTime() <= new Date(new Date(new Date().setDate(first)).getFullYear(), new Date(new Date().setDate(first)).getMonth(), new Date(new Date().setDate(first)).getDate() + 6).getTime()) {
							konsumen += state.data[a].customer
							total += state.data[a].total
							filter.push(state.data[a])
						}
					}
					return {
						...state,
						options: action.data,
						date: new Date(new Date().setDate(first)),
						filter: filter,
						detail: {
							konsumen: konsumen,
							transaksi: filter.length,
							total: total
						}
					}

				case 'monthly':
					for(var a in state.data) {
						if(new Date(new Date(state.data[a].date).getFullYear(), new Date(state.data[a].date).getMonth()).getTime() == new Date(state.date.getFullYear(), state.date.getMonth()).getTime()) {
							konsumen += state.data[a].customer
							total += state.data[a].total
							filter.push(state.data[a])
						}
					}
					return {
						...state,
						options: action.data,
						date: new Date(),
						filter: filter,
						detail: {
							konsumen: konsumen,
							transaksi: filter.length,
							total: total
						}
					}

				case 'yearly':
					for(var a in state.data) {
						if(new Date(new Date(state.data[a].date).getFullYear()).getTime() == new Date(state.date.getFullYear()).getTime()) {
							konsumen += state.data[a].customer
							total += state.data[a].total
							filter.push(state.data[a])
						}
					}
					return {
						...state,
						options: action.data,
						date: new Date(),
						filter: filter,
						detail: {
							konsumen: konsumen,
							transaksi: filter.length,
							total: total
						}
					}
			}
			return {
				...state
			}

		case 'BACK':
			var filter = [], konsumen = 0, total = 0
			switch(state.options) {
				case 'daily':
					var date = new Date(new Date(state.date).setDate(new Date(state.date).getDate() - 1))
					for(var a in state.data) {
						if(new Date(new Date(state.data[a].date).getFullYear(), new Date(state.data[a].date).getMonth(), new Date(state.data[a].date).getDate()).getTime() == new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()) {
							konsumen += state.data[a].customer
							total += state.data[a].total
							filter.push(state.data[a])
						}
					}
					return {
						...state,
						date: date,
						filter: filter,
						detail: {
							konsumen: konsumen,
							transaksi: filter.length,
							total: total
						}
					}

				case 'weekly':
					var date = new Date(new Date(state.date).setDate(new Date(state.date).getDate() - 7))
					for(var a in state.data) {
						if(new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() <= new Date(new Date(state.data[a].date).getFullYear(), new Date(state.data[a].date).getMonth(), new Date(state.data[a].date).getDate()).getTime() &&
							new Date(new Date(state.data[a].date).getFullYear(), new Date(state.data[a].date).getMonth(), new Date(state.data[a].date).getDate()).getTime() <= new Date(date.getFullYear(), date.getMonth(), date.getDate() + 6).getTime()) {
							konsumen += state.data[a].customer
							total += state.data[a].total
							filter.push(state.data[a])
						}
					}
					return {
						...state,
						date: date,
						filter: filter,
						detail: {
							konsumen: konsumen,
							transaksi: filter.length,
							total: total
						}
					}

				case 'monthly':
					var date = new Date(new Date(state.date).setMonth(new Date(state.date).getMonth() - 1))
					for(var a in state.data) {
						if(new Date(new Date(state.data[a].date).getFullYear(), new Date(state.data[a].date).getMonth()).getTime() == new Date(date.getFullYear(), date.getMonth()).getTime()) {
							konsumen += state.data[a].customer
							total += state.data[a].total
							filter.push(state.data[a])
						}
					}
					return {
						...state,
						date: date,
						filter: filter,
						detail: {
							konsumen: konsumen,
							transaksi: filter.length,
							total: total
						}
					}

				case 'yearly':
					var date = new Date(new Date(state.date).setYear(new Date(state.date).getFullYear() - 1))
					for(var a in state.data) {
						if(new Date(new Date(state.data[a].date).getFullYear()).getTime() == new Date(date.getFullYear()).getTime()) {
							konsumen += state.data[a].customer
							total += state.data[a].total
							filter.push(state.data[a])
						}
					}
					return {
						...state,
						date: date,
						filter: filter,
						detail: {
							konsumen: konsumen,
							transaksi: filter.length,
							total: total
						}
					}
			}
			return {
				...state
			}

		case 'NEXT':
			var filter = [], konsumen = 0, total = 0
			switch(state.options) {
				case 'daily':
					var date = new Date(new Date(state.date).setDate(new Date(state.date).getDate() + 1))
					for(var a in state.data) {
						if(new Date(new Date(state.data[a].date).getFullYear(), new Date(state.data[a].date).getMonth(), new Date(state.data[a].date).getDate()).getTime() == new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()) {
							konsumen += state.data[a].customer
							total += state.data[a].total
							filter.push(state.data[a])
						}
					}
					return {
						...state,
						date: date,
						filter: filter,
						detail: {
							konsumen: konsumen,
							transaksi: filter.length,
							total: total
						}
					}

				case 'weekly':
					var date = new Date(new Date(state.date).setDate(new Date(state.date).getDate() + 7))
					for(var a in state.data) {
						if(new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() <= new Date(new Date(state.data[a].date).getFullYear(), new Date(state.data[a].date).getMonth(), new Date(state.data[a].date).getDate()).getTime() &&
							new Date(new Date(state.data[a].date).getFullYear(), new Date(state.data[a].date).getMonth(), new Date(state.data[a].date).getDate()).getTime() <= new Date(date.getFullYear(), date.getMonth(), date.getDate() + 6).getTime()) {
							konsumen += state.data[a].customer
							total += state.data[a].total
							filter.push(state.data[a])
						}
					}
					return {
						...state,
						date: date,
						filter: filter,
						detail: {
							konsumen: konsumen,
							transaksi: filter.length,
							total: total
						}
					}

				case 'monthly':
					var date = new Date(new Date(state.date).setMonth(new Date(state.date).getMonth() + 1))
					for(var a in state.data) {
						if(new Date(new Date(state.data[a].date).getFullYear(), new Date(state.data[a].date).getMonth()).getTime() == new Date(date.getFullYear(), date.getMonth()).getTime()) {
							konsumen += state.data[a].customer
							total += state.data[a].total
							filter.push(state.data[a])
						}
					}
					return {
						...state,
						date: date,
						filter: filter,
						detail: {
							konsumen: konsumen,
							transaksi: filter.length,
							total: total
						}
					}

				case 'yearly':
					var date = new Date(new Date(state.date).setYear(new Date(state.date).getFullYear() + 1))
					for(var a in state.data) {
						if(new Date(new Date(state.data[a].date).getFullYear()).getTime() == new Date(date.getFullYear()).getTime()) {
							konsumen += state.data[a].customer
							total += state.data[a].total
							filter.push(state.data[a])
						}
					}
					return {
						...state,
						date: date,
						filter: filter,
						detail: {
							konsumen: konsumen,
							transaksi: filter.length,
							total: total
						}
					}
			}
			return {
				...state
			}

		case 'UPDATE_FILTER':
			var filter = [], konsumen = 0, total = 0
			switch(state.options) {
				case 'daily':
					var date = new Date(new Date(state.date).setDate(new Date(state.date).getDate()))
					for(var a in state.data) {
						if(new Date(new Date(state.data[a].date).getFullYear(), new Date(state.data[a].date).getMonth(), new Date(state.data[a].date).getDate()).getTime() == new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()) {
							konsumen += state.data[a].customer
							total += state.data[a].total
							filter.push(state.data[a])
						}
					}
					return {
						...state,
						date: date,
						filter: filter,
						detail: {
							konsumen: konsumen,
							transaksi: filter.length,
							total: total
						}
					}

				case 'weekly':
					var date = new Date(new Date(state.date).setDate(new Date(state.date).getDate()))
					for(var a in state.data) {
						if(new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() <= new Date(new Date(state.data[a].date).getFullYear(), new Date(state.data[a].date).getMonth(), new Date(state.data[a].date).getDate()).getTime() &&
							new Date(new Date(state.data[a].date).getFullYear(), new Date(state.data[a].date).getMonth(), new Date(state.data[a].date).getDate()).getTime() <= new Date(date.getFullYear(), date.getMonth(), date.getDate() + 6).getTime()) {
							konsumen += state.data[a].customer
							total += state.data[a].total
							filter.push(state.data[a])
						}
					}
					return {
						...state,
						date: date,
						filter: filter,
						detail: {
							konsumen: konsumen,
							transaksi: filter.length,
							total: total
						}
					}

				case 'monthly':
					var date = new Date(new Date(state.date).setMonth(new Date(state.date).getMonth()))
					for(var a in state.data) {
						if(new Date(new Date(state.data[a].date).getFullYear(), new Date(state.data[a].date).getMonth()).getTime() == new Date(date.getFullYear(), date.getMonth()).getTime()) {
							konsumen += state.data[a].customer
							total += state.data[a].total
							filter.push(state.data[a])
						}
					}
					return {
						...state,
						date: date,
						filter: filter,
						detail: {
							konsumen: konsumen,
							transaksi: filter.length,
							total: total
						}
					}

				case 'yearly':
					var date = new Date(new Date(state.date).setYear(new Date(state.date).getFullYear()))
					for(var a in state.data) {
						if(new Date(new Date(state.data[a].date).getFullYear()).getTime() == new Date(date.getFullYear()).getTime()) {
							konsumen += state.data[a].customer
							total += state.data[a].total
							filter.push(state.data[a])
						}
					}
					return {
						...state,
						date: date,
						filter: filter,
						detail: {
							konsumen: konsumen,
							transaksi: filter.length,
							total: total
						}
					}
			}
			return {
				...state
			}

		case 'ADD_PENGELUARAN':
			state.pengeluaran[action.data.bulan + '_' + action.data.tahun] = new Object()
			state.pengeluaran[action.data.bulan + '_' + action.data.tahun] = action.data
			AsyncStorage.setItem('@Pengeluaran', JSON.stringify(action.data.datastate.pengeluaran))
			return {
				...state
			}

		case 'UPDATE_PENGELUARAN':
			state.pengeluaran[action.data.bulan + '_' + action.data.tahun] = action.data
			AsyncStorage.setItem('@Pengeluaran', JSON.stringify(state.pengeluaran))
			return {
				...state
			}

		case 'UPDATE_PENJUALAN':
			for(var a in state.data) {
				if(state.data[a].idTransaction === action.data) {
					state.data[a]['status'] = true
				}
			}
			AsyncStorage.setItem('@Penjualan', JSON.stringify(state.data))
			return {
				...state
			}

		case 'LABARUGI':
			var penjualan = 0,
				hargaPokok = 0
			for(var a in state.data) {
				var date = new Date(state.data[a].date)
				console.log('==', action.data)
				console.log(action.data.bulan, new Date(date).getMonth(), new Date(date).getFullYear())
				if(action.data.bulan + '_' + action.data.tahun === new Date(date).getMonth().toString() + '_' + new Date(date).getFullYear()) {
					penjualan = penjualan + state.data[a].total
					state.labarugi.penjualan = penjualan

					for(var b in state.data[a].data) {
						for(var c in action.data.category) {
							if(state.data[a].data[b].idCategory === action.data.category[c].idCategory) {
								for(var d in action.data.category[c].product) {
									if(state.data[a].data[b].idProduct === action.data.category[c].product[d].idProduct) {
										if(state.data[a].data[b].idSubProduct === null) {
											hargaPokok = hargaPokok + (action.data.category[c].product[d].cost * state.data[a].data[b].quantity)
										} else {
											for(var e in action.data.category[c].product[d].subProduct) {
												if(state.data[a].data[b].idSubProduct === action.data.category[c].product[d].subProduct[e].idSubProduct) {
													hargaPokok = hargaPokok + (action.data.category[c].product[d].subProduct[e].cost * state.data[a].data[b].quantity)
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			return {
				...state,
				labarugi: {
					penjualan: penjualan,
					hargaPokok: hargaPokok
				}
			}

		default:
			return state
	}
}

export default SaleReducers