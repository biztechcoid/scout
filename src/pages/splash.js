import React from 'react'
import {
	AsyncStorage,
	Text,
	View,
	Keyboard,
	Image
} from 'react-native'

import { connect } from 'react-redux'
import {
	setUser,
	localStorageData,
	localStorageSale,
	localStorageUsers
} from '../redux/actions'

class SplashScreen extends React.Component {
	render() {
		return(
			<View style = {{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#353535' }}>
				<View  style={{justifyContent: 'center',width:'80%',flex: 1,}}>
					<Image  style={{flex: 1,width: null,height: null,resizeMode: 'contain'}} source={require('../assets/img/LOGO.png')} />
				</View>
			</View>
		)
	}

	next(pages) {
		setTimeout(() => {
			this.props.navigation.dispatch({
				type: 'Navigation/RESET',
				index: 0,
				actions: [{ type: 'Navigation/NAVIGATE', routeName: pages }]
			})
		}, 1500)
	}

	componentDidMount() {
		Keyboard.dismiss()

		AsyncStorage.multiGet(['@User', '@Data', '@Ingredients', '@Penjualan', '@Store', '@Users'], (err, res) => {
			// console.log(res)
			/*
			*
			@Data
			*
			*/
			if(JSON.parse(res[1][1]) !== null) {
				this.props.dispatchLocalStorageData({data: JSON.parse(res[1][1])})
			}
			/**/

			/*
			*
			@Ingredients
			*
			*/
			if(JSON.parse(res[2][1]) !== null) {
				this.props.dispatchLocalStorageData({ingredients: JSON.parse(res[2][1])})
			}
			/**/

			/*
			*
			@Penjualan
			*
			*/
			if(JSON.parse(res[3][1]) !== null) {
				this.props.dispatchLocalStorageSale(JSON.parse(res[3][1]))
			}
			/**/

			/*
			*
			@Store
			*
			*/
			if(JSON.parse(res[4][1]) !== null) {
				this.props.dispatchLocalStorageUsers({store: JSON.parse(res[4][1])})
			}
			/**/

			/*
			*
			@Users
			*
			*/
			if(JSON.parse(res[5][1]) !== null) {
				this.props.dispatchLocalStorageUsers({users: JSON.parse(res[5][1])})
			}
			/**/

			/*
			*
			@User
			*
			*/
			if(res[0][1] == null) {
				// tidak ada token
				/*
				*
				offline

				user langsung masuk ke level 2
				*
				*/
				// this.next('Login')
				this.next('Dashboard')
			} else {
				// ada token
				const newRes = JSON.parse(res[0][1])
				console.log(newRes)
				this.props.dispatchSetUser(newRes)
				// switch(newRes.level) {
					// case 'manager':
						// return this.next('HomeManager')

					// case 'admin':
						// return this.next('HomeAdmin')

					// default:
						// return this.next('Home')
				// }

				/*
				*
				hak akses
				*
				*/
				/*
				level 1
					- persediaan
					- penjualan
					- laporan
					- monitoring

				level 2
					- persediaan
					- penjualan
					- laporan

				level 3
					- persediaan
					- penjualan

				level 4
					- persediaan

				level 5
					- penjualan

				level 6
					- laporan

				level 7
					- monitoring

				level 8
					- persediaan
					- laporan

				level 9
					- persediaan
					- monitoring

				level 10
					- penjualan
					- laporan

				level 11
					- penjualan
					- monitoring

				level 12
					- laporan
					- monitoring

				level 13
					- persediaan
					- penjualan
					- monitoring

				level 14
					- persediaan
					- laporan
					- monitoring

				level 15
					- penjualan
					- laporan
					- monitoring
				*/
				if(newRes.access) {
					if(newRes.access.persediaan && newRes.access.penjualan && newRes.access.laporan) {
						return this.next('level2')
					} else if(newRes.access.persediaan && newRes.access.penjualan) {
						return this.next('level3')
					} else if(newRes.access.persediaan) {
						return this.next('level4')
					} else if(newRes.access.penjualan) {
						return this.next('level5')
					} else if(newRes.access.laporan) {
						return this.next('level6')
					} else if(newRes.access.persediaan && newRes.access.laporan) {
						return this.next('level8')
					} else if(newRes.access.penjualan && newRes.access.laporan) {
						return this.next('level10')
					} else {
						return this.next('Login')
					}
				} else {
					return this.next('Login')
				}
				/**/
			}
			/**/
		})
		
		/*
		*
		cek token di local storage
		*
		*/
		// AsyncStorage.getItem('@User', (err, res) => {
		// 	if(err) {
		// 		return true
		// 	}

		// 	if(res == null) {
		// 		/*
		// 		tidak ada token
		// 		*/
		// 		this.next('Login')
		// 		/**/
		// 	} else {
		// 		/*
		// 		ada token
		// 		*/
		// 		const newRes = JSON.parse(res)
		// 		this.props.dispatchSetUser(newRes)
		// 		switch(newRes.level) {
		// 			case 'manager':
		// 				return this.next('HomeManager')

		// 			case 'admin':
		// 				return this.next('HomeAdmin')

		// 			default:
		// 				return this.next('Home')
		// 		}
		// 		/**/
		// 	}
		// })
		/**/


		/*
		*
		cek data di local storage
		*
		*/
		// AsyncStorage.getItem('@Data', (err, resData) => {
		// 	if(err) {
		// 		return state
		// 	}

		// 	if(resData == null) {
		// 		return true
		// 	} else {
		// 		this.props.dispatchLocalStorageData({data: JSON.parse(resData)})
		// 	}
		// })

		// AsyncStorage.getItem('@Ingredients', (err, resData) => {
		// 	if(err) {
		// 		return state
		// 	}

		// 	if(resData == null) {
		// 		return true
		// 	} else {
		// 		this.props.dispatchLocalStorageData({ingredients: JSON.parse(resData)})
		// 	}
		// })

		// AsyncStorage.getItem('@Penjualan', (err, resData) => {
		// 	if(err) {
		// 		return state
		// 	}

		// 	if(resData == null) {
		// 		return true
		// 	} else {
		// 		this.props.dispatchLocalStorageSale(JSON.parse(resData))
		// 	}
		// })
		/**/
	}
}


function mapStateToProps (state) {
	return {

	}
}

function mapDispatchToProps (dispatch) {
	return {
		dispatchSetUser: (data) => dispatch(setUser(data)),
		dispatchLocalStorageData: (data) => dispatch(localStorageData(data)),
		dispatchLocalStorageSale: (data) => dispatch(localStorageSale(data)),
		dispatchLocalStorageUsers: (data) => dispatch(localStorageUsers(data))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SplashScreen)