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
					<Image  style={{flex: 1,width: null,height: null,resizeMode: 'contain'}} source={require('./login/img/logo-500px.png')} />
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
				this.next('Login')
			} else {
				// ada token
				const newRes = JSON.parse(res[0][1])
				this.props.dispatchSetUser(newRes)
				// switch(newRes.level) {
					// case 'manager':
						return this.next('HomeManager')

					// case 'admin':
						// return this.next('HomeAdmin')

					// default:
						// return this.next('Home')
				// }
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