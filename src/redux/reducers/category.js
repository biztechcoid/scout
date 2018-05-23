'use strict'

import {
	Alert,
	AsyncStorage
} from 'react-native'

import {
	makeId,
	server
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
		quantity: number,
		subProduct: [{
			idSubProduct: string,
			barcode: string,
			name: string,
			cost: number,
			price: number,
			available: number,
			quantity: number
		}],
		ingredients: [{
			idIngredients: string,
			barcode: string,
			name: string,
			cost: number,
			price: number,
			available: number,
			quantity: number
		}]
	}]
}
*/


const initialState = {
	data: [],
	ingredients: [],
	refreshing: false,
	barcode: null,
	user: null
}

const CategoryReducers = (state = initialState, action) => {
	switch(action.type) {
		case 'LOCAL_STORAGE_CATEGORY':
			console.log(action.data)
			if(action.data.data == undefined) {
				AsyncStorage.setItem('@Ingredients', JSON.stringify(action.data.ingredients))
				return {
					...state,
					ingredients: action.data.ingredients
				}
			} else {
				AsyncStorage.setItem('@Data', JSON.stringify(action.data.data))
				return {
					...state,
					data: action.data.data
				}
			}


		/*
		*
		add category
		*
		*/
		/*
		action.data = {
			idCabang: string,
			name: string
		}
		*/
		case 'ADD_CATEGORY':
			const createData = {
				idCategory: action.data.idCategory,
				// idCategory: makeId(),
				idCabang: action.data.idCabang,
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
						idProduct: action.data.idProduct,
						// idProduct: makeId(),
						barcode: action.data.barcode,
						name: action.data.name,
						cost: action.data.cost,
						price: action.data.price,
						quantity: action.data.quantity,
						subProduct: [],
						ingredients: []
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

		/*
		*
		add sub product
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
		case 'ADD_SUB_PRODUCT':
			for(var i in state.data) {
				if(state.data[i].idCategory === action.data.idCategory) {
					for(var j in state.data[i].product) {
						if(state.data[i].product[j].idProduct === action.data.idProduct) {
							state.data[i].product[j].subProduct = [...state.data[i].product[j].subProduct, {
								idSubProduct: action.data.idSubProduct,
								// idSubProduct: makeId(),
								barcode: action.data.barcode,
								name: action.data.name,
								cost: action.data.cost,
								price: action.data.price,
								quantity: action.data.quantity
							}]
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
		update sub product
		*
		*/
		/*
		action.data = {
			idCategory: string,
			idProduct: string,
			idSubProduct: string,
			barcode: string,
			name: string,
			cost: number,
			price: number,
			quantity: number
		}
		*/
		case 'UPDATE_SUB_PRODUCT':
			for(var i in state.data) {
				if(state.data[i].idCategory === action.data.idCategory) {
					for(var j in state.data[i].product) {
						if(state.data[i].product[j].idProduct === action.data.idProduct) {
							for(var k in state.data[i].product[j].subProduct) {
								if(state.data[i].product[j].subProduct[k].idSubProduct === action.data.idSubProduct) {
									state.data[i].product[j].subProduct[k].barcode = action.data.barcode
									state.data[i].product[j].subProduct[k].name = action.data.name
									state.data[i].product[j].subProduct[k].cost = action.data.cost
									state.data[i].product[j].subProduct[k].price = action.data.price
									state.data[i].product[j].subProduct[k].quantity = action.data.quantity
								}
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

		/*
		*
		delete sub product
		*
		*/
		/*
		action.data = {
			idCategory: string,
			idProduct: string
			idSubProduct: string
		}
		*/
		case 'DELETE_SUB_PRODUCT':
			for(var i in state.data) {
				if(state.data[i].idCategory === action.data.idCategory) {
					for(var j in state.data[i].product) {
						if(state.data[i].product[j].idProduct === action.data.idProduct) {
							for(var k in state.data[i].product[j].subProduct) {
								if(state.data[i].product[j].subProduct[k].idSubProduct === action.data.idSubProduct) {
									state.data[i].product[j].subProduct.splice(k, 1)
								}
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

		/*
		*
		add ingredients
		*
		*/
		/*
		action.data = {
			barcode: string,
			name: string,
			cost: number,
			price: number,
			quantity: number
		}
		*/
		case 'ADD_INGREDIENTS':
			const createIngredients = {
				idIngredients: action.data.idIngredients,
				// idIngredients: makeId(),
				barcode: action.data.barcode,
				name: action.data.name,
				cost: action.data.cost,
				price: action.data.price,
				quantity: action.data.quantity
			}
			const ingredients = [...state.ingredients, createIngredients]
			AsyncStorage.setItem('@Ingredients', JSON.stringify(ingredients))
			return {
				...state,
				ingredients: ingredients
			}

		/*
		*
		update ingredients
		*
		*/
		/*
		action.data = {
			idIngredients: string,
			barcode: string,
			name: string,
			cost: number,
			price: number,
			quantity: number
		}
		*/
		case 'UPDATE_INGREDIENTS':
			for(var i in state.ingredients) {
				if(state.ingredients[i].idIngredients === action.data.idIngredients) {
					state.ingredients[i].barcode = action.data.barcode
					state.ingredients[i].name = action.data.name
					state.ingredients[i].cost = action.data.cost
					state.ingredients[i].price = action.data.price
					state.ingredients[i].quantity = action.data.quantity
				}
			}
			AsyncStorage.setItem('@Ingredients', JSON.stringify(state.ingredients))
			return {
				...state,
				ingredients: [...state.ingredients]
			}

		/*
		*
		delete ingredients
		*
		*/
		/*
		action.data = {
			idIngredients: string,
			barcode: string,
			name: string,
			cost: number,
			price: number,
			quantity: number
		}
		*/
		case 'DELETE_INGREDIENTS':
			for(var i in state.ingredients) {
				if(state.ingredients[i].idIngredients === action.data.idIngredients) {
					state.ingredients.splice(i, 1)
				}
			}
			AsyncStorage.setItem('@Ingredients', JSON.stringify(state.ingredients))
			return {
				...state,
				ingredients: [...state.ingredients]
			}

		/*
		*
		push ingredients
		*
		*/
		case 'PUSH_INGREDIENTS':
			for(var i in state.data) {
				if(state.data[i].idCategory === action.data.idCategory) {
					for(var j in state.data[i].product) {
						if(state.data[i].product[j].idProduct === action.data.idProduct) {
							state.data[i].product[j].ingredients.push({
								idIngredients: action.data.ingredients.idIngredients,
								qty: action.data.ingredients.qty
							})

							state.data[i].product[j].cost = 0
							for(var k in state.data[i].product[j].ingredients) {
								for(var l in state.ingredients) {
									if(state.data[i].product[j].ingredients[k].idIngredients === state.ingredients[l].idIngredients) {
										// state.data[i].product[j].cost += state.ingredients[l].cost
										state.data[i].product[j].cost = state.data[i].product[j].cost + (state.ingredients[l].cost * state.data[i].product[j].ingredients[k].qty)
									}
								}
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

		case 'SPLICE_INGREDIENTS':
			for(var i in state.data) {
				if(state.data[i].idCategory === action.data.idCategory) {
					for(var j in state.data[i].product) {
						if(state.data[i].product[j].idProduct === action.data.idProduct) {
							for(var k in state.data[i].product[j].ingredients) {
								if(state.data[i].product[j].ingredients[k].idIngredients === action.data.idIngredients) {
									state.data[i].product[j].ingredients.splice(k, 1)

									state.data[i].product[j].cost = 0
									for(var l in state.data[i].product[j].ingredients) {
										for(var m in state.ingredients) {
											if(state.data[i].product[j].ingredients[l].idIngredients === state.ingredients[m].idIngredients) {
												// state.data[i].product[j].cost += state.ingredients[m].cost
												state.data[i].product[j].cost = state.data[i].product[j].cost + (state.ingredients[m].cost * state.data[i].product[j].ingredients[l].qty)
											}
										}
									}
								}
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

								for(var l in state.data[j].product[k].ingredients) {
									for(var m in state.ingredients) {
										if(state.data[j].product[k].ingredients[l].idIngredients === state.ingredients[m].idIngredients) {
											state.ingredients[m].quantity -=  (action.data.data[i].quantity * state.data[j].product[k].ingredients[l].qty)
										}
									}
									// state.data[j].product[k].ingredients[l].quantity -= action.data.data[i].quantity
								}
							}
						}
					}
				}
			}
			AsyncStorage.setItem('@Data', JSON.stringify(state.data))
			AsyncStorage.setItem('@Ingredients', JSON.stringify(state.ingredients))
			return {
				...state,
				data: [...state.data],
				ingredients: [...state.ingredients]
			}

		case 'LOGIN':
			// AsyncStorage.setItem('@User', JSON.stringify(action.data))
			return {
				...state,
				// process: false,
				user: action.data
			}

		case 'LOGOUT':
			// AsyncStorage.multiRemove(['@User', '@Data', '@Ingredients', '@Penjualan', '@Store', '@Users'],
			// 	(err) => console.log(err))
			// action.data.dispatch({
			// 	key: null,
			// 	type: 'Navigation/RESET',
			// 	index: 0,
			// 	actions: [{ type: 'Navigation/NAVIGATE', routeName: 'Login' }]
			// })
			return {
				...state,
				user: null
			}

		case 'SET_USER':
			return {
				...state,
				user: action.data
			}

		default:
			return state
	}
}

export default CategoryReducers