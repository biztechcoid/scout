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
	StyleSheet,
	Image
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
			Alert.alert(null, 'Email atau password tidak valid')
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

			this.props.dispatchLogin(data)
		}
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

				<View style = { styles.containerlogo }>
					<View style = { styles.logo }>
						<Image style = { styles.logoimg } source={require('./img/logo-500px.png')} />
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
			</View>
		)
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
		dispatchLocalStorageSale: (data) => dispatch(localStorageSale(data))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginScreen)