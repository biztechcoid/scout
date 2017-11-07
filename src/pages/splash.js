import React from 'react'
import {
	AsyncStorage,
	Text,
	View,
	Keyboard
} from 'react-native'

import { connect } from 'react-redux'
import {
	setUser,
	localStorageData,
	localStorageSale
} from '../redux/actions'

class SplashScreen extends React.Component {
	render() {
		return(
			<View style = {{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#61b5c7' }}>
				<Text> Splash </Text>
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
		}, 1)
	}

	componentDidMount() {
		Keyboard.dismiss()
		
		/*
		*
		cek token di local storage
		*
		*/
		AsyncStorage.getItem('@User', (err, res) => {
			if(err) {
				return true
			}

			if(res == null) {
				/*
				tidak ada token
				*/
				this.next('Login')
				/**/
			} else {
				/*
				ada token
				*/
				const newRes = JSON.parse(res)
				this.props.dispatchSetUser(newRes)
				switch(newRes.level) {
					case 'manager':
						return this.next('HomeManager')

					case 'admin':
						return this.next('HomeAdmin')

					default:
						return this.next('Home')
				}
				/**/
			}
		})
		/**/


		/*
		*
		cek data di local storage
		*
		*/
		AsyncStorage.getItem('@Data', (err, resData) => {
			if(err) {
				return state
			}

			if(resData == null) {
				return true
			} else {
				this.props.dispatchLocalStorageData({data: JSON.parse(resData)})
			}
		})

		AsyncStorage.getItem('@Ingredients', (err, resData) => {
			if(err) {
				return state
			}

			if(resData == null) {
				return true
			} else {
				this.props.dispatchLocalStorageData({ingredients: JSON.parse(resData)})
			}
		})

		AsyncStorage.getItem('@Penjualan', (err, resData) => {
			if(err) {
				return state
			}

			if(resData == null) {
				return true
			} else {
				this.props.dispatchLocalStorageSale(JSON.parse(resData))
			}
		})
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
		dispatchLocalStorageSale: (data) => dispatch(localStorageSale(data))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SplashScreen)