import React from 'react'
import {
	Alert,
	Picker,
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
		title: navigation.state.params.type
	})

	state = {
		name: null,
		email: null,
		phone: null,
		password: null,
		confirmPassword: null,

		cabang: null,
		namaCabang: null,
		ket: null
	}

	_register() {
		if(this.state.name == '' || this.state.name == null) {
			Alert.alert(null, 'nama tidak valid')
		} else if(this.state.email == '' || this.state.email == null) {
			Alert.alert(null, 'email tidak valid')
		} else if(this.state.phone == '' || this.state.phone == null) {
			Alert.alert(null, 'telepon tidak valid')
		} else if(this.state.password == '' || this.state.password == null) {
			Alert.alert(null, 'password tidak valid')
		} else {
			if(this.state.password === this.state.confirmPassword) {
				this.props.dispatchRegisterUser({
					data: this.state,
					navigation: this.props.navigation
				})
			} else {
				Alert.alert(null, 'ulangi password')
			}
		}
	}

	_chooseCabang(value) {
		const stateCopy = this.state

		if(value === 'addCabang' || value === null) {
			stateCopy.cabang = value
		} else {
			for(var i in this.props.cabang) {
				if(this.props.cabang[i].idCabang === value) {
					stateCopy.cabang = value
					stateCopy.namaCabang = this.props.cabang[i].name
					stateCopy.ket = this.props.cabang[i].ket
				}
			}
		}
		this.setState(stateCopy)
	}

	_addUser() {

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

							{this.props.navigation.state.params.type === 'Register' ?
								null
								:
								<View style = {{ height: 45, justifyContent: 'center' }}>
									<Text> Cabang </Text>
								</View>
							}

							{this.state.cabang === 'addCabang' ?
								<View>
									<View style = {{ height: 45, justifyContent: 'center' }}>
										<Text> Nama Cabang </Text>
									</View>

									<View style = {{ height: 45, justifyContent: 'center' }}>
										<Text> Keterangan </Text>
									</View>
								</View>
								:
								this.state.cabang === null ?
									null
									:
									<View>
										<View style = {{ height: 45, justifyContent: 'center' }}>
											<Text> Nama Cabang </Text>
										</View>

										<View style = {{ height: 45, justifyContent: 'center' }}>
											<Text> Keterangan </Text>
										</View>
									</View>
							}
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
									returnKeyType = 'done'
									onChangeText = { (text) => this.setState({confirmPassword: text }) }
									onSubmitEditing = { this._register.bind(this) }
									placeholder = 'Ulangi Password'
									secureTextEntry = {true}
									style = {{ flex: 1, height: 45 }}
									value = {this.state.confirmPassword}/>
							</View>

							{this.props.navigation.state.params.type === 'Register' ?
								null
								:
								<View style = {{ flexDirection: 'row' }}>
									<View style = {{ justifyContent: 'center' }}>
										<Text> : </Text>
									</View>

									<Picker
										style = {{ flex: 1, height: 45 }}
										selectedValue={this.state.cabang}
										onValueChange={(itemValue, itemIndex) => this._chooseCabang(itemValue, itemIndex) }>
										<Picker.Item label = '-- Pilih Cabang --' value = {null} />
										{this.props.cabang.map((cabang, index) =>
											<Picker.Item key = {index} label = {cabang.name} value = {cabang.idCabang} />
											)}
										<Picker.Item label = 'Tambah Cabang' value = 'addCabang' />
									</Picker>
								</View>
							}

							{this.state.cabang === 'addCabang' ?
								<View>
									<View style = {{ flexDirection: 'row' }}>
										<View style = {{ justifyContent: 'center' }}>
											<Text> : </Text>
										</View>

										<TextInput
											ref = { (c) => this._cabang = c }
											autoCapitalize = 'none'
											// keyboardType = 'email-address'
											returnKeyType = 'next'
											onChangeText = { (text) => this.setState({namaCabang: text }) }
											onSubmitEditing = { () => this._keterangan.focus() }
											placeholder = 'Nama Cabang'
											secureTextEntry = {true}
											style = {{ flex: 1, height: 45 }}
											value = {this.state.confirmPassword}/>
									</View>

									<View style = {{ flexDirection: 'row' }}>
										<View style = {{ justifyContent: 'center' }}>
											<Text> : </Text>
										</View>

										<TextInput
											ref = { (c) => this._keterangan = c }
											autoCapitalize = 'none'
											// keyboardType = 'email-address'
											returnKeyType = 'next'
											onChangeText = { (text) => this.setState({ket: text }) }
											onSubmitEditing = { this._addUser.bind(this) }
											placeholder = 'Keterangan'
											secureTextEntry = {true}
											style = {{ flex: 1, height: 45 }}
											value = {this.state.confirmPassword}/>
									</View>
								</View>
								:
								this.state.cabang === null ?
									null
									:
									<View>
										<View style = {{ flex: 1, height: 45, justifyContent: 'center' }}>
											<Text> : {this.state.namaCabang} </Text>
										</View>

										<View style = {{ flex: 1, height: 45, justifyContent: 'center' }}>
											<Text> : {this.state.ket} </Text>
										</View>
									</View>
							}
						</View>
					</View>
				</View>

				<View style = {{ marginTop: 10 }}>
					{this.props.navigation.state.params.type === 'Register' ?
						<Button
							onPress = { this._register.bind(this) }
							name = 'Register' />
						:
						<Button
							onPress = { this._addUser.bind(this) }
							name = 'Tambah User' />
					}
				</View>
			</ScrollView>
		)
	}
}

function mapStateToProps (state) {
	return {
		cabang: state.user.cabang
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