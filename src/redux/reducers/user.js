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
	process: bolean,
	user: [{
		idUser: string,
		idPusat: string,
		idCabang: string,
		name: string,
		email: string,
		phone: string,
		password: string
	}],
	store: [{
		idPusat: string,
		name: string,
		ket: string,
		cabang: [{
			idCabang: string,
			name: string,
			ket: string
		}]
	}]
}
*/

const initialState = {
	users: [],
	store: [],
	data: null,
	navigation: null,
	process: false
}

const UserReducers = (state = initialState, action) => {
	switch(action.type) {
		case 'LOCAL_STORAGE_USERS':
			console.log(action.data)
			if(action.data.users === undefined) {
				return {
					...state,
					store: action.data.store
				}
			} else {
				for(var i in action.data.users) {
					for(var j in state.store) {
						if(action.data.users[i].idPusat === state.store[j].idPusat) {
							for(var k in state.store[j].cabang) {
								if(action.data.users[i].idCabang === state.store[j].cabang[k].idCabang) {
									action.data.users[i]['cabangName'] = state.store[j].cabang[k].name
								} else if(action.data.users[i].idCabang === null) {
									action.data.users[i]['cabangName'] = 'Pusat'
								}
							}
						}
					}
				}
				return {
					...state,
					users: action.data.users
				}
			}

		/*
		*
		register
		*
		*/
		/*
		action.data: {
			data: {
				name: string,
				email: string,
				phone: string,
				password: string
			},
			navigation: function
		}
		*/
		case 'REGISTER_USER':
			/*
			*
			check list users
			*
			*/
			/*for(var i in state.users) {
				if(state.users[i].email.toUpperCase() == action.data.data.email.toUpperCase()) {
					// user sudah terdaftar
					Alert.alert(null, 'user ' + action.data.data.email + ' sudah terdaftar')
					return state
				}
			}*/
			const store = {
				idPusat: makeId(),
				name: 'Pusat',
				ket: null,
				// cabang: []
			}
			const register = {
				idUser: makeId(),
				idPusat: store.idPusat,
				idCabang: null,
				name: action.data.data.name,
				email: action.data.data.email,
				phone: action.data.data.phone,
				password: action.data.data.password,
				access: {
					persediaan: true,
					penjualan: true,
					laporan: true,
					monitoring: true
				}
			}

			/*
			*
			post to api
			*
			*/
			fetch(server + '/users/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					token: false
				},
				body: JSON.stringify({
					store: store,
					register: register
				})
			})
			.then(response => response.json())
			.then(res => {
				// create array cabang for localstorage
				store['cabang'] = []

				if(res.headers.statusCode === 200) {
					/*
					*
					success
					*
					*/
					AsyncStorage.multiSet([
						// ['@Users', JSON.stringify([...state.users, register])],
						['@Store', JSON.stringify([...state.store, store])]
					], (err) => console.log(err))

					Alert.alert(null, 'Pendaftaran berhasil, silahkan masuk',
						[{ text: 'OK', onPress: () => action.data.navigation.goBack() }])

					return {
						...state,
						store: [...state.store, store],
						// users: [...state.users, register]
					}
				} else {
					/*
					*
					failed
					*
					*/
					Alert.alert(null, res.headers.message)
				}
			})
			.catch(err => console.log(err))
			return {
				...state
			}

		/*
		*
		add user
		*
		*/
		case 'ADD_USER':
			var store, addUser
			// console.log('add cabang', action.data.data)
				store = {
					idCabang: makeId(),
					name: action.data.data.namaCabang,
					ket: action.data.data.ket
				}
				for(var i in state.store) {
					if(state.store[i].idPusat === state.data.idPusat) {
						state.store[i].cabang = [...state.store[i].cabang, store]
					}
				}
					
				addUser = {
					idUser: makeId(),
					idPusat: state.data.idPusat,
					idCabang: store.idCabang,
					name: action.data.data.name,
					email: action.data.data.email,
					phone: action.data.data.phone,
					password: action.data.data.password,
					access: action.data.data.access
				}
				AsyncStorage.multiSet([
					['@Users', JSON.stringify([...state.users, addUser])],
					['@Store', JSON.stringify([...state.store])]
				], (err) => console.log(err))
				Alert.alert(null, 'register user berhasil', [{ text: 'OK', onPress: () => action.data.navigation.goBack() }])
				return {
					...state,
					store: [...state.store],
					users: [...state.users, addUser]
				}

			// if(action.data.cabang === 'addCabang' && action.data.pusat === 'addPusat') {
			// 	/*
			// 	*
			// 	add new pusat
			// 	*
			// 	*/
			// 	console.log('add pusat', action.data)
			// 	store = {
			// 		idPusat: makeId(),
			// 		name: action.data.namaCabang,
			// 		ket: action.data.ket,
			// 		cabang: []
			// 	}
			// 	addUser = {
			// 		idUser: makeId(),
			// 		idPusat: store.idPusat,
			// 		idCabang: null,
			// 		name: action.data.name,
			// 		email: action.data.email,
			// 		phone: action.data.phone,
			// 		password: action.data.password
			// 	}
			// 	AsyncStorage.multiSet([
			// 		['@Users', JSON.stringify([...state.users, addUser])],
			// 		['@Store', JSON.stringify([...state.store, store])]
			// 	], (err) => console.log(err))
			// 	Alert.alert(null, 'register user berhasil', [{ text: 'OK', onPress: () => action.data.navigation.goBack() }])
			// 	return {
			// 		...state,
			// 		store: [...state.store, store],
			// 		users: [...state.users, addUser]
			// 	}
			// } else if(action.data.cabang === 'addCabang' && action.data.pusat === action.data.idPusat) {
			// 	/*
			// 	*
			// 	add new cabang
			// 	*
			// 	*/
			// 	console.log('add cabang', action.data)
			// 	for(var i in state.store) {
			// 		if(state.store[i].idPusat === action.data.idPusat) {
			// 			store = {
			// 				idCabang: makeId(),
			// 				name: action.data.namaCabang,
			// 				ket: action.data.ket
			// 			}
			// 			state.store[i].cabang = [...state.store[i].cabang, store]
			// 		}
			// 	}
			// 	addUser = {
			// 		idUser: makeId(),
			// 		idPusat: action.data.idPusat,
			// 		idCabang: store.idCabang,
			// 		name: action.data.name,
			// 		email: action.data.email,
			// 		phone: action.data.phone,
			// 		password: action.data.password
			// 	}
			// 	AsyncStorage.multiSet([
			// 		['@Users', JSON.stringify([...state.users, addUser])],
			// 		['@Store', JSON.stringify([...state.store])]
			// 	], (err) => console.log(err))
			// 	Alert.alert(null, 'register user berhasil', [{ text: 'OK', onPress: () => action.data.navigation.goBack() }])
			// 	return {
			// 		...state,
			// 		store: [...state.store],
			// 		users: [...state.users, addUser]
			// 	}
			// } else if(action.data.cabang === 'addCabang' && action.data.pusat === null) {
			// 	Alert.alert(null, 'silahkan pilih pusat')
			// }  else {
			// 	/*
			// 	*
			// 	choose pusat or cabang
			// 	*
			// 	*/
			// 	console.log('choose', action.data)
			// 	addUser = {
			// 		idUser: makeId(),
			// 		idPusat: action.data.idPusat,
			// 		idCabang: action.data.idCabang,
			// 		name: action.data.name,
			// 		email: action.data.email,
			// 		phone: action.data.phone,
			// 		password: action.data.password
			// 	}
			// 	AsyncStorage.multiSet([
			// 		['@Users', JSON.stringify([...state.users, addUser])],
			// 		['@Store', JSON.stringify([...state.store])]
			// 	], (err) => console.log(err))
			// 	Alert.alert(null, 'register user berhasil', [{ text: 'OK', onPress: () => action.data.navigation.goBack() }])
			// 	return {
			// 		...state,
			// 		users: [...state.users, addUser]
			// 	}
			// }
			// return state

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
			/*
			*
			field masih kosong
			*
			*/
			/*if(state.users == null || state.users.length == 0) {
				Alert.alert(null, 'User atau password salah')
			} else {*/
				/*
				*
				loop list users
				*
				*/
				/*for(var i in state.users) {
					if(state.users[i].email.toUpperCase() == action.data.data.email.toUpperCase()) {
						if(state.users[i].password === action.data.data.password) {
							// user dan password benar
							state.users[i]['lastLogin'] = new Date()
							action.data.navigation.dispatch({
							  type: 'Navigation/RESET',
							  index: 0,
							  actions: [{ type: 'Navigation/NAVIGATE', routeName:
							  	state.users[i].access ?
										state.users[i].access.persediaan && state.users[i].access.penjualan && state.users[i].access.laporan ?
											'level2'
										: state.users[i].access.persediaan && state.users[i].access.penjualan ?
											'level3'
										: state.users[i].access.persediaan ?
											'level4'
										: state.users[i].access.penjualan ?
											'level5'
										: state.users[i].access.laporan ?
											'level6'
										: state.users[i].access.persediaan && state.users[i].access.laporan ?
											'level8'
										: state.users[i].access.penjualan && state.users[i].access.laporan ?
											'level10'
										:
											'Login'
									:
										'Login'
								}]
							})
							AsyncStorage.setItem('@User', JSON.stringify(state.users[i]))
							return {
								...state,
								process: false,
								data: state.users[i]
							}
						} else {
							// password salah
							Alert.alert(null, 'User atau password salah')
						}
					}
				}
				// user tidak ada
				Alert.alert(null, 'User atau password salah')*/

				/*
				*
				post to api
				*
				*/
				fetch(server + '/users/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						token: false
					},
					body: JSON.stringify(action.data.data)
				})
				.then(response => response.json())
				.then(res => {
					if(res.headers.statusCode === 200) {
						state.data = res.data
						state.data['token'] = res.headers.token
						action.data.navigation.dispatch({
						  type: 'Navigation/RESET',
						  index: 0,
						  actions: [{ type: 'Navigation/NAVIGATE', routeName:
						  	state.data.access ?
									state.data.access.persediaan && state.data.access.penjualan && state.data.access.laporan ?
										'level2'
									: state.data.access.persediaan && state.data.access.penjualan ?
										'level3'
									: state.data.access.persediaan ?
										'level4'
									: state.data.access.penjualan ?
										'level5'
									: state.data.access.laporan ?
										'level6'
									: state.data.access.persediaan && state.data.access.laporan ?
										'level8'
									: state.data.access.penjualan && state.data.access.laporan ?
										'level10'
									:
										'Login'
								:
									'Login'
							}]
						})
						AsyncStorage.setItem('@User', JSON.stringify(state.data))
						return {
							...state,
							process: false,
							data: state.data
						}
					} else {
						Alert.alert(null, res.headers.message)
					}
				})
				.catch(err => console.log(err))
			// }

			/*const user = null
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
			} else if(action.data.data.email == 'admin' && action.data.data.password == 'admin') {
				action.data.navigation.dispatch({
				  type: 'Navigation/RESET',
				  index: 0,
				  actions: [{ type: 'Navigation/NAVIGATE', routeName: 'HomeAdmin' }]
				})

				user = {
					token: 'token',
					idUser: 'idAdmin',
					email: action.data.data.email,
					name: 'Admin',
					password: action.data.data.password,
					level: 'admin',
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
			}*/
			// AsyncStorage.setItem('@User', JSON.stringify(user))
			return {
				...state,
				process: false,
				// data: user
			}

		case 'LOGOUT':
			AsyncStorage.multiRemove(['@User', '@Data', '@Ingredients', '@Penjualan', '@Store', '@Users'],
				(err) => console.log(err))
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