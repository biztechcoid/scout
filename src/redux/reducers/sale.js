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
	data: []
}

const SaleReducers = (state = initialState, action) => {
	switch(action.type) {
		case 'LOCAL_STORAGE_SALE':
			return {
				...state,
				data: action.data
			}

		case 'PENJUALAN':
			AsyncStorage.setItem('@Penjualan', JSON.stringify([...state.data, action.data]))
			return {
				data: [...state.data, action.data]
			}

		default:
			return state
	}
}

export default SaleReducers