import React from 'react'
import {
	Alert,
	FlatList,
	StyleSheet,
	Text,
	View
} from 'react-native'
import { connect } from 'react-redux'

import {
	localStorageUsers
} from '../../redux/actions'

import {
	Button,
	ButtonIcons
} from '../../components'

import {
	online,
	server
} from '../../modules'


class ListUsersScreen extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Daftar User'
	})

	_updateUser(content) {
		this.props.navigation.navigate('Register', {type: 'Edit User', content: content})
	}

	_deleteUser(content) {
		online(value => {
			if(value) {
				Alert.alert(null, 'Anda yakin user ' + content.name + ' akan dihapus?',
					[{text: 'OK', onPress: () => this.__deleteUser(content)},
					{text: 'Cancel'}])
			} else {
				Alert.alert(null, 'koneksi internet bermasalah')
			}
		})
	}

	__deleteUser(content) {
		/*
		*
		post to api
		*
		*/
		fetch(server + '/users/deleteUser', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token: this.props.profile.token
			},
			body: JSON.stringify({
				idUser: content.idUser,
				idPusat: content.idPusat,
				idCabang: content.idCabang
			})
		})
		.then(response => response.json())
		.then(res => {
			if(res.headers.statusCode === 200) {
				/*
				*
				success
				*
				*/
				Alert.alert(null, res.headers.message,
					[{ text: 'OK', onPress: () => this._listUser() }])
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
	}

	_listUser() {
		fetch(server + '/users', {
			method: 'GET',
			headers: {
				token: this.props.profile.token
			}
		})
		.then(response => response.json())
		.then(res => {
			if(res.headers.statusCode === 200) {
				this.props.dispatchLocalStorageUsers({users: res.data})
			}
		})
		.catch(err => console.log(err))
	}

	render() {
		return (
			<View style = {{flex: 1, backgroundColor: 'white', padding: 5}}>
				<FlatList
					data = {this.props.users}
					extraData = {this.state}
					keyExtractor = {(item, index) => index}
					renderItem = {({item, index}) =>
						<View style = {styles.category}>
							<View style = {{ flex: 1, flexDirection: 'row' }}>
								<View>
									<Text> Name </Text>
									<Text> Cabang </Text>
									<Text> Email </Text>
									<Text> Phone </Text>
								</View>

								<View>
									<Text> : {item.name} </Text>
									<Text> : {item.cabangName} </Text>
									<Text> : {item.email} </Text>
									<Text> : {item.phone} </Text>
								</View>
							</View>

							<ButtonIcons
								style = {{ width: 40, height: 40 }}
								onPress = { this._updateUser.bind(this, item) }
								name = 'md-create'
								color = 'grey'
								size = { 20 }/>

							<ButtonIcons
								style = {{ width: 40, height: 40 }}
								onPress = { this._deleteUser.bind(this, item) }
								name = 'md-close'
								color = 'grey'
								size = { 20 }/>
						</View>
					}
				/>

				<View style={styles.stickyBottom}>
					<View>
						<Button
							onPress = {() => this.props.navigation.navigate('Register', {type: 'Tambah User'})}
							name = 'TAMBAH USER'/>
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	category: {
		flex: 1,
		flexDirection: 'row',
		paddingLeft: 10,
		padding:5,
		marginTop: 2.5,
		marginBottom: 2.5,
		borderRadius: 5,
		borderWidth: 0.5,
		borderColor: '#f2c9a0',
		backgroundColor: '#fcecc2'
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
		users: state.user.users,
		profile: state.user.data,
		// store: state.user.sotre
	}
}

function mapDispatchToProps (dispatch) {
	return {
		dispatchLocalStorageUsers: (data) => dispatch(localStorageUsers(data))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ListUsersScreen)