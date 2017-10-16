'use strict'

import {
	AsyncStorage
} from 'react-native'

/*
*
category
*
*/
/*
{
	idCategory: string,
	name: string,
	product: [{
		idProduct: string,
		barcode: string,
		name: string,
		cost: number,
		price: number,
		available: number,
		quantity: number
	}]
}
*/

const initialState = {
	data: [],
	refreshing: false
}

const CategoryReducers = (state = initialState, action) => {
	switch(action.type) {
		case 'LOCAL_STORAGE':
			return {
				...state,
				data: action.data
			}

		case 'ADD_CATEGORY':
			const createData = {
				category: action.data,
				product: []
			}
			const data =  [...state.data, createData]
			AsyncStorage.setItem('@Data', JSON.stringify(data))
			return {
				...state,
				data: data
			}

		case 'DELETE_CATEGORY':
			state.data.splice(action.data, 1)
			AsyncStorage.setItem('@Data', JSON.stringify(state.data))
			return {
				...state,
				data: [...state.data]
			}

		case 'ADD_PRODUCT':
			/* {category: 'nama category', product: 'nama product'}*/
			for(var i in state.data) {
				if(state.data[i].category == action.data.category) {
					state.data[i].product = [...state.data[i].product, {name: action.data.product}]
				}
			}
			AsyncStorage.setItem('@Data', JSON.stringify(state.data))
			return {
				...state,
				data: [...state.data]
			}

		case 'DELETE_PRODUCT':
			state.data[action.data.idCategory].product.splice(action.data.idProduct, 1)
			AsyncStorage.setItem('@Data', JSON.stringify(state.data))
			return {
				...state,
				data: [...state.data]
			}

		case 'REFRESHING':
			return {
				...state,
				refreshing: action.data
			}

		default:
			return state
	}
}

export default CategoryReducers