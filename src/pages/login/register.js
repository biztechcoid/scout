import React from 'react'
import {
	ScrollView,
	Text,
	TextInput,
	View
} from 'react-native'

import {
	Button,
	MyModal
} from '../../components'

class RegisterScreen extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Register'
	})

	state = {
		email: null
	}

	render() {
		return (
			<ScrollView style = {{ flex: 1, padding: 5, backgroundColor: 'white' }}>
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
									autoCapitalize = 'none'
									keyboardType = 'email-address'
									returnKeyType = 'next'
									onChangeText = { (text) => this.setState({email: text }) }
									onSubmitEditing = { () => this._password.focus() }
									placeholder = 'Email'
									style = {{ flex: 1, height: 45 }}
									value = {this.state.email}/>
							</View>

							<View style = {{ flexDirection: 'row' }}>
								<View style = {{ justifyContent: 'center' }}>
									<Text> : </Text>
								</View>

								<TextInput
									autoCapitalize = 'none'
									keyboardType = 'email-address'
									returnKeyType = 'next'
									onChangeText = { (text) => this.setState({email: text }) }
									onSubmitEditing = { () => this._password.focus() }
									placeholder = 'Email'
									style = {{ flex: 1, height: 45 }}
									value = {this.state.email}/>
							</View>

							<View style = {{ flexDirection: 'row' }}>
								<View style = {{ justifyContent: 'center' }}>
									<Text> : </Text>
								</View>

								<TextInput
									autoCapitalize = 'none'
									keyboardType = 'email-address'
									returnKeyType = 'next'
									onChangeText = { (text) => this.setState({email: text }) }
									onSubmitEditing = { () => this._password.focus() }
									placeholder = 'Email'
									style = {{ flex: 1, height: 45 }}
									value = {this.state.email}/>
							</View>

							<View style = {{ flexDirection: 'row' }}>
								<View style = {{ justifyContent: 'center' }}>
									<Text> : </Text>
								</View>

								<TextInput
									autoCapitalize = 'none'
									keyboardType = 'email-address'
									returnKeyType = 'next'
									onChangeText = { (text) => this.setState({email: text }) }
									onSubmitEditing = { () => this._password.focus() }
									placeholder = 'Email'
									style = {{ flex: 1, height: 45 }}
									value = {this.state.email}/>
							</View>

							<View style = {{ flexDirection: 'row' }}>
								<View style = {{ justifyContent: 'center' }}>
									<Text> : </Text>
								</View>

								<TextInput
									autoCapitalize = 'none'
									keyboardType = 'email-address'
									returnKeyType = 'next'
									onChangeText = { (text) => this.setState({email: text }) }
									onSubmitEditing = { () => this._password.focus() }
									placeholder = 'Email'
									style = {{ flex: 1, height: 45 }}
									value = {this.state.email}/>
							</View>
						</View>
					</View>
				</View>

				<Button
					onPress = { () => this.props.navigation.navigate('Register') }
					name = 'Register' />
			</ScrollView>
		)
	}
}

module.exports = RegisterScreen