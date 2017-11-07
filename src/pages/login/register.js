import React from 'react'
import {
	ScrollView,
	Text,
	TextInput,
	View
} from 'react-native'

import { connect } from 'react-redux'
import {
	registerUser
} from '../../redux/actions'

import {
	Button,
	MyModal
} from '../../components'

class RegisterScreen extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Register'
	})

	state = {
		name: null,
		email: null,
		phone: null,
		password: null,
		confirmPassword: null
	}

	_register() {
		this.props.dispatchRegisterUser({
			data: this.state,
			navigation: this.props.navigation
		})
	}

	render() {
		return (
			<ScrollView
				style = {{ flex: 1, padding: 5, backgroundColor: 'white' }}
				keyboardShouldPersistTaps = 'always'>
				<View style = {{ flex: 1 }}>
					<View style = {{ flexDirection: 'row' }} >
						<View style = {{ flexDirection: 'column' }}>
							<View style = {{ height: 45, justifyContent: 'center' }}>
								<Text> Nama </Text>
							</View>

							<View style = {{ height: 45, justifyContent: 'center' }}>
								<Text> Email </Text>
							</View>

							<View style = {{ height: 45, justifyContent: 'center' }}>
								<Text> Telepon </Text>
							</View>

							<View style = {{ height: 45, justifyContent: 'center' }}>
								<Text> Password </Text>
							</View>

							<View style = {{ height: 45, justifyContent: 'center' }}>
								<Text> Ulangi Password </Text>
							</View>
						</View>

						<View style = {{ flex: 1, flexDirection: 'column' }}>
							<View style = {{ flexDirection: 'row' }}>
								<View style = {{ justifyContent: 'center' }}>
									<Text> : </Text>
								</View>

								<TextInput
									autoCapitalize = 'words'
									// keyboardType = 'email-address'
									returnKeyType = 'next'
									onChangeText = { (text) => this.setState({name: text }) }
									onSubmitEditing = { () => this._email.focus() }
									placeholder = 'Nama'
									style = {{ flex: 1, height: 45 }}
									value = {this.state.name}/>
							</View>

							<View style = {{ flexDirection: 'row' }}>
								<View style = {{ justifyContent: 'center' }}>
									<Text> : </Text>
								</View>

								<TextInput
									ref = { (c) => this._email = c }
									autoCapitalize = 'none'
									keyboardType = 'email-address'
									returnKeyType = 'next'
									onChangeText = { (text) => this.setState({email: text }) }
									onSubmitEditing = { () => this._phone.focus() }
									placeholder = 'Email'
									style = {{ flex: 1, height: 45 }}
									value = {this.state.email}/>
							</View>

							<View style = {{ flexDirection: 'row' }}>
								<View style = {{ justifyContent: 'center' }}>
									<Text> : </Text>
								</View>

								<TextInput
									ref = { (c) => this._phone = c }
									autoCapitalize = 'none'
									keyboardType = 'phone-pad'
									returnKeyType = 'next'
									onChangeText = { (text) => this.setState({phone: text }) }
									onSubmitEditing = { () => this._password.focus() }
									placeholder = 'Telepon'
									style = {{ flex: 1, height: 45 }}
									value = {this.state.phone}/>
							</View>

							<View style = {{ flexDirection: 'row' }}>
								<View style = {{ justifyContent: 'center' }}>
									<Text> : </Text>
								</View>

								<TextInput
									ref = { (c) => this._password = c }
									autoCapitalize = 'none'
									// keyboardType = 'email-address'
									returnKeyType = 'next'
									onChangeText = { (text) => this.setState({password: text }) }
									onSubmitEditing = { () => this._confirmPassword.focus() }
									placeholder = 'Password'
									secureTextEntry = {true}
									style = {{ flex: 1, height: 45 }}
									value = {this.state.password}/>
							</View>

							<View style = {{ flexDirection: 'row' }}>
								<View style = {{ justifyContent: 'center' }}>
									<Text> : </Text>
								</View>

								<TextInput
									ref = { (c) => this._confirmPassword = c }
									autoCapitalize = 'none'
									// keyboardType = 'email-address'
									returnKeyType = 'next'
									onChangeText = { (text) => this.setState({confirmPassword: text }) }
									onSubmitEditing = { this._register.bind(this) }
									placeholder = 'Ulangi Password'
									secureTextEntry = {true}
									style = {{ flex: 1, height: 45 }}
									value = {this.state.confirmPassword}/>
							</View>
						</View>
					</View>
				</View>

				<View style = {{ marginTop: 10 }}>
					<Button
						onPress = { this._register.bind(this) }
						name = 'Register' />
				</View>
			</ScrollView>
		)
	}
}

function mapStateToProps (state) {
	return {
	}
}

function mapDispatchToProps (dispatch) {
	return {
		dispatchRegisterUser: (data) => dispatch(registerUser(data))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RegisterScreen)