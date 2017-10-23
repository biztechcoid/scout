'use strict'

import {
	AsyncStorage
} from 'react-native'

import {
	makeId
} from '../../modules'

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
	refreshing: false,
	barcode: null
}

const CategoryReducers = (state = initialState, action) => {
	switch(action.type) {
		case 'LOCAL_STORAGE_CATEGORY':
			return {
				...state,
				data: action.data
			}

		/*
		*
		add category
		*
		*/
		/*
		action.data = {
			name: string
		}
		*/
		case 'ADD_CATEGORY':
			const createData = {
				idCategory: makeId(),
				name: action.data.name,
				product: []
			}
			const data = [...state.data, createData]
			AsyncStorage.setItem('@Data', JSON.stringify(data))
			return {
				...state,
				data: data
			}

		/*
		*
		update category
		*
		*/
		/*
		action.data = {
			idCategory: string,
			name: string
		}
		*/
		case 'UPDATE_CATEGORY':
			for(var i in state.data) {
				if(state.data[i].idCategory === action.data.idCategory) {
					state.data[i].name = action.data.name
				}
			}
			AsyncStorage.setItem('@Data', JSON.stringify(state.data))
			return {
				...state,
				data: [...state.data]
			}

		/*
		*
		delete category
		*
		*/
		/*
		action.data = {
			idCategory: string
		}
		*/
		case 'DELETE_CATEGORY':
			for(var i in state.data) {
				if(state.data[i].idCategory === action.data.idCategory) {
					state.data.splice(i, 1)
				}
			}
			AsyncStorage.setItem('@Data', JSON.stringify(state.data))
			return {
				...state,
				data: [...state.data]
			}

		/*
		*
		add product
		*
		*/
		/*
		action.data = {
			idCategory: string,
			barcode: string,
			name: string,
			cost: number,
			price: number,
			quantity: number
		}
		*/
		case 'ADD_PRODUCT':
			for(var i in state.data) {
				if(state.data[i].idCategory === action.data.idCategory) {
					state.data[i].product = [...state.data[i].product, {
						idProduct: makeId(),
						barcode: action.data.barcode,
						name: action.data.name,
						cost: action.data.cost,
						price: action.data.price,
						quantity: action.data.quantity
					}]
				}
			}
			AsyncStorage.setItem('@Data', JSON.stringify(state.data))
			return {
				...state,
				data: [...state.data]
			}

		/*
		*
		update product
		*
		*/
		/*
		action.data = {
			idCategory: string,
			idProduct: string,
			barcode: string,
			name: string,
			cost: number,
			price: number,
			quantity: number
		}
		*/
		case 'UPDATE_PRODUCT':
			for(var i in state.data) {
				if(state.data[i].idCategory === action.data.idCategory) {
					for(var j in state.data[i].product) {
						if(state.data[i].product[j].idProduct === action.data.idProduct) {
							state.data[i].product[j].barcode = action.data.barcode
							state.data[i].product[j].name = action.data.name
							state.data[i].product[j].cost = action.data.cost
							state.data[i].product[j].price = action.data.price
							state.data[i].product[j].quantity = action.data.quantity
						}
					}
				}
			}
			AsyncStorage.setItem('@Data', JSON.stringify(state.data))
			return {
				...state,
				data: [...state.data]
			}

		/*
		*
		delete product
		*
		*/
		/*
		action.data = {
			idCategory: string,
			idProduct: string
		}
		*/
		case 'DELETE_PRODUCT':
			for(var i in state.data) {
				if(state.data[i].idCategory === action.data.idCategory) {
					for(var j in state.data[i].product) {
						if(state.data[i].product[j].idProduct === action.data.idProduct) {
							state.data[i].product.splice(j, 1)
						}
					}
				}
			}
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

		case 'BARCODE_PRODUCT':
			return {
				...state,
				barcode: action.data
			}

		case 'UPDATE_STOCK':
			for(var i in action.data.data) {
				for(var j in state.data) {
					if(state.data[j].idCategory === action.data.data[i].idCategory) {
						for(var k in state.data[j].product) {
							if(state.data[j].product[k].idProduct === action.data.data[i].idProduct) {
								state.data[j].product[k].quantity = state.data[j].product[k].quantity - action.data.data[i].quantity
							}
						}
					}
				}
			}
			AsyncStorage.setItem('@Data', JSON.stringify(state.data))
			return {
				...state,
				data: [...state.data]
			}

		default:
			return state
	}
}

export default CategoryReducers