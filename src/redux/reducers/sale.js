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

const initialState = {
	data: [],
	options: 'daily',
	date: new Date(),
	filter: [],
	detail: {
		konsumen: 0,
		transaksi: 0,
		total: 0
	}
}

const first = new Date().getDate() - new Date().getDay()

const SaleReducers = (state = initialState, action) => {
	switch(action.type) {
		case 'LOCAL_STORAGE_SALE':
			console.log(action.data)
			AsyncStorage.setItem('@Penjualan', JSON.stringify(action.data))
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
				data: action.data,
				filter: filter,
				detail: {
					konsumen: konsumen,
					transaksi: filter.length,
					total: total
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

		default:
			return state
	}
}

export default SaleReducers