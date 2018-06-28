import React from 'react'
import {
	ActivityIndicator,
	Alert,
	AsyncStorage,
	Dimensions,
	Keyboard,
	Text,
	TextInput,
	View,
	ScrollView,
	StyleSheet,
	Image
} from 'react-native'
const { width, height } = Dimensions.get('window')

import { connect } from 'react-redux'
import {
	loginProcess,
	login,
	localStorageData,
	localStorageSale,
	localStorageUsers
} from '../../redux/actions'

import {
	Button,
	MyModal
} from '../../components'

import {
	online,
	server
} from '../../modules'


class LoginScreen extends React.Component {
	state = {
		keyboard: false,
		email: '',
		password: '',
	}

	_login() {
		if(this.state.email == '' || this.state.password == '' || this.state.email == null || this.state.password == null) {
			Alert.alert(null, 'Email atau password tidak valid')
		} else {
			/*
			*
			check internet connection
			*
			*/
			if(online) {
				this._loginProcess(true)
				
				const data = {
					// navigation: this.props.navigation,
					// data: {
						email: this.state.email,
						password: this.state.password
					// }
				}

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
					body: JSON.stringify(data)
				})
				.then(response => response.json())
				.then(res => {
					if(res.headers.statusCode === 200) {
						res.data['token'] = res.headers.token
						this.props.navigation.dispatch({
						  type: 'Navigation/RESET',
						  index: 0,
						  actions: [{ type: 'Navigation/NAVIGATE', routeName: 'Dashboard'}]
						})

						this._getUsers(res.data.token, res.data)
					} else {
						this._loginProcess(false)
						Alert.alert(null, res.headers.message)
					}
				})
				.catch(err => console.log(err))
			} else {
				Alert.alert(null, 'koneksi internet bermasalah')
			}

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
			// 		this.props.dispatchLocalStorageData(JSON.parse(resData))
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

	_getUsers(token, data) {
		fetch(server + '/users', {
			method: 'GET',
			headers: {
				token: token
			}
		})
		.then(response => response.json())
		.then(res => {
			if(res.headers.statusCode === 200) {
				this.props.dispatchLocalStorageUsers({users: res.data})
				this._getStore(token, data)
			}
		})
		.catch(err => console.log(err))
	}

	_getStore(token, data) {
		fetch(server + '/users/store', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				token: token
			}
		})
		.then(response => response.json())
		.then(res => {
			if(res.headers.statusCode === 200) {
				this.props.dispatchLocalStorageUsers({store: res.data})
				this._getInventory(token, data)
			}
		})
		.catch(err => console.log(err))
	}

	_getInventory(token, data) {
		fetch(server + '/inventory', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				token: token
			}
		})
		.then(response => response.json())
		.then(res => {
			if(res.headers.statusCode === 200) {
				this.props.dispatchLocalStorageData({data: res.data})
				this._getIngredients(token)
				this.props.dispatchLogin(data)
			}
		})
		.catch(err => console.log(err))
	}

	_getIngredients(token) {
		fetch(server + '/inventory/getIngredients', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				token: token
			}
		})
		.then(response => response.json())
		.then(res => {
			if(res.headers.statusCode === 200) {
				this.props.dispatchLocalStorageData({ingredients: res.data})
				this._getPengeluaran(token)
			}
		})
		.catch(err => console.log(err))
	}

	_getPengeluaran(token) {
		fetch(server + '/sale/getPengeluaran', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				token: token
			}
		})
		.then(response => response.json())
		.then(res => {
			if(res.headers.statusCode === 200) {
				this.props.dispatchLocalStorageSale({pengeluaran: res.data})
				this._getPenjualan(token)
			}
		})
		.catch(err => console.log(err))
	}

	_getPenjualan(token) {
		fetch(server + '/sale/getPenjualan', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				token: token
			}
		})
		.then(response => response.json())
		.then(res => {
			if(res.headers.statusCode === 200) {
				this.props.dispatchLocalStorageSale({penjualan: res.data})
			}
		})
		.catch(err => console.log(err))
	}

	_loginProcess(value) {
		this.props.dispatchLoginProcess(value)
	}

	render() {
		return(
			<View
				style = {{ flex: 1, padding: 5, backgroundColor: '#353535' }}
				keyboardShouldPersistTaps = 'always'>
				<MyModal
					visible = { this.props.loginProcess }
					onRequestClose = { this._loginProcess.bind(this, false) }>
					<ActivityIndicator size = 'large' color= '#6ecbe0' />
				</MyModal>

				<ScrollView>
				<View style = { styles.containerlogo }>
					<View style = { styles.logo }>
						<Image style = { styles.logoimg } source={require('../../assets/img/Scoutbiz-New_Logo.png')} />
					</View>
				</View>

				<View style = { styles.container }>
					<View style = { styles.content }>
						<TextInput style = { styles.txt }
							autoCapitalize = 'none'
							keyboardType = 'email-address'
							placeholderTextColor = '#919191'
							underlineColorAndroid = '#6b6b6b'
							returnKeyType = 'next'
							onChangeText = { (text) => this.setState({email: text }) }
							onSubmitEditing = { () => this._password.focus() }
							placeholder = 'Email'
							value = {this.state.email}/>

						<TextInput style = { styles.txt }
							ref = { (c) => this._password = c }
							autoCapitalize = 'none'
							placeholderTextColor = '#919191'
							underlineColorAndroid = '#6b6b6b'
							returnKeyType = 'done'
							onChangeText = { (text) => this.setState({password: text }) }
							onSubmitEditing = { this._login.bind(this) }
							placeholder = 'Password'
							secureTextEntry = {true}
							value = {this.state.password}/>
					</View>

					<View style = {{ flex: 1 }}>
						<Button
						  color= '#f08519'
							onPress = { this._login.bind(this) }
							name = 'MASUK' />
					</View>
				</View>
				</ScrollView>

				{this.state.keyboard == false ?
					<View style = { styles.stickyBottom }>
						<Text
							onPress = { () => this.props.navigation.navigate('Register', {type: 'Register'}) }
							style = {{ textAlign:'center' }}>
								Belum Punya Akun ? &nbsp;
								<Text style={{color: '#2278a5'}}>
									DAFTAR
								</Text>
						</Text>
					</View>
					:
					null
				}
			</View>
		)
	}

	_keyboardDidShow() {
		this.setState({
			keyboard: true
		})
	}

	_keyboardDidHide() {
		this.setState({
			keyboard: false
		})
	}

	componentWillMount() {
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this))
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this))
	}

	componentWillUnmount() {
		this.keyboardDidShowListener.remove()
		this.keyboardDidHideListener.remove()
	}
}

const styles = StyleSheet.create({
	container: {
		height: (height / 2) - 10,
		width: '85%',
		marginLeft:'7.5%',
		marginRight:'7.5%'
	},
	containerlogo: {
		height: (height / 2) - 10,
		alignItems: 'center'
	},
	logo: {
		flex: 1,
		width:'80%',
		justifyContent: 'center',
	},
	logoimg: {
		flex: 1,
		width: null,
		height: null,
		resizeMode: 'contain'
	},
	txt: {
		color:'#FFF',
	},
	content: {
		flex: 1,
		justifyContent: 'center'
	},
	stickyBottom: {
		flex: 1,
		justifyContent: 'center',
		position: 'absolute',
		bottom: 0,
		left:0,
		backgroundColor:'#FFF',
		width:(width),
		padding:10,
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
		dispatchLocalStorageSale: (data) => dispatch(localStorageSale(data)),
		dispatchLocalStorageUsers: (data) => dispatch(localStorageUsers(data))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginScreen)