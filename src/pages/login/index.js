import React from 'react'
import {
	ActivityIndicator,
	Alert,
	AsyncStorage,
	Dimensions,
	Text,
	TextInput,
	View,
	ScrollView,
	StyleSheet
} from 'react-native'
const { width, height } = Dimensions.get('window')

import { connect } from 'react-redux'
import {
	loginProcess,
	login,
	localStorageData,
	localStorageSale
} from '../../redux/actions'

import {
	Button,
	MyModal
} from '../../components'


class LoginScreen extends React.Component {
	state = {
		email: null,
		password: null
	}

	_login() {
		if(this.state.email == '' || this.state.password == '' || this.state.email == null || this.state.password == null) {
			Alert.alert(null, 'email atau password tidak valid')
		} else {
			this._loginProcess(true)
			
			const data = {
				navigation: this.props.navigation,
				data: {
					email: this.state.email,
					password: this.state.password
				}
			}

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
					this.props.dispatchLocalStorageData(JSON.parse(resData))
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

			this.props.dispatchLogin(data)
		}
	}

	_loginProcess(value) {
		this.props.dispatchLoginProcess(value)
	}

	render() {
		return(
			<ScrollView
				style = {{ flex: 1, padding: 5, backgroundColor: 'white' }}
				keyboardShouldPersistTaps = 'always'>
				<MyModal
					visible = { this.props.loginProcess }
					onRequestClose = { this._loginProcess.bind(this, false) }>
					<ActivityIndicator size = 'large' color= '#6ecbe0' />
				</MyModal>

				<View style = { styles.container }/>

				<View style = { styles.container }>
					<View style = { styles.content }>
						<TextInput
							autoCapitalize = 'none'
							keyboardType = 'email-address'
							returnKeyType = 'next'
							onChangeText = { (text) => this.setState({email: text }) }
							onSubmitEditing = { () => this._password.focus() }
							placeholder = 'Email'
							value = {this.state.email}/>

						<TextInput
							ref = { (c) => this._password = c }
							autoCapitalize = 'none'
							returnKeyType = 'done'
							onChangeText = { (text) => this.setState({password: text }) }
							onSubmitEditing = { this._login.bind(this) }
							placeholder = 'Password'
							value = {this.state.password}
							secureTextEntry = {true}/>
					</View>

					<View style = {{ flex: 1 }}>
						<Button
							onPress = { this._login.bind(this) }
							name = 'Login' />

						<Button
							onPress = { () => this.props.navigation.navigate('Register') }
							name = 'Register' />
					</View>
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		height: (height / 2) - 10
	},
	content: {
		flex: 1,
		justifyContent: 'center'
	},
	stickyBottom: {
		position: 'absolute',
		left: 5,
		right: 5,
		bottom: 5
	}
})


function mapStateToProps (state) {
	return {
		loginProcess: state.user.process
	}
}

function mapDispatchToProps (dispatch) {
	return {
		dispatchLoginProcess: (data) => dispatch(loginProcess(data)),
		dispatchLogin: (data) => dispatch(login(data)),
		dispatchLocalStorageData: (data) => dispatch(localStorageData(data)),
		dispatchLocalStorageSale: (data) => dispatch(localStorageSale(data))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginScreen)