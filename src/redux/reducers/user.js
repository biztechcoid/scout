'use strict'

import {
	AsyncStorage
} from 'react-native'

/*
*
user
*
*/
/*
{
	data: {
		token: string,
		idUser: string,
		email: string,
		name: string,
		password: string,
		level: string,
		lastLogin: date
	},
	navigation: function,
	process: bolean
}
*/

const initialState = {
	data: null,
	navigation: null,
	process: false
}

const UserReducers = (state = initialState, action) => {
	switch(action.type) {
		case 'LOGIN_PROCESS':
			return {
				...state,
				process: action.data
			}

		/*
		*
		login
		*
		*/
		/*
		action.data = {
			navigation: function,
			data: {
				email: string,
				password: string
			}
		}
		*/
		case 'LOGIN':
			const user = null
			if(action.data.data.email == 'manager' && action.data.data.password == 'manager') {
				action.data.navigation.dispatch({
				  type: 'Navigation/RESET',
				  index: 0,
				  actions: [{ type: 'Navigation/NAVIGATE', routeName: 'HomeManager' }]
				})

				user = {
					token: 'token',
					idUser: 'idManager',
					email: action.data.data.email,
					name: 'Manager',
					password: action.data.data.password,
					level: 'manager',
					lastLogin: new Date()
				}
			} else if(action.data.data.email == 'sales' && action.data.data.password == 'sales') {
				action.data.navigation.dispatch({
				  type: 'Navigation/RESET',
				  index: 0,
				  actions: [{ type: 'Navigation/NAVIGATE', routeName: 'HomeSales' }]
				})

				user = {
					token: 'token',
					idUser: 'idSales',
					email: action.data.data.email,
					name: 'Sales',
					password: action.data.data.password,
					level: 'sales',
					lastLogin: new Date()
				}
			} else {
				action.data.navigation.dispatch({
				  type: 'Navigation/RESET',
				  index: 0,
				  actions: [{ type: 'Navigation/NAVIGATE', routeName: 'Home' }]
				})

				user = {
					token: 'token',
					idUser: 'idUser',
					email: action.data.data.email,
					name: 'User',
					password: action.data.data.password,
					level: 'user',
					lastLogin: new Date()
				}
			}
			AsyncStorage.setItem('@User', JSON.stringify(user))
			return {
				...state,
				process: false,
				data: user
			}

		case 'LOGOUT':
			/*
			*
			remove old token from local storage
			*
			*/
			AsyncStorage.removeItem('@Token')
			/**/
			AsyncStorage.removeItem('@User')
			action.data.dispatch({
				key: null,
				type: 'Navigation/RESET',
				index: 0,
				actions: [{ type: 'Navigation/NAVIGATE', routeName: 'Login' }]
			})
			return {
				...state,
				data: null
			}

		case 'SET_USER':
			return {
				...state,
				data: action.data
			}

		default:
			return state
	}
}

module.exports = UserReducers