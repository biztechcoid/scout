import React from 'react'
import {
	Alert,
	Picker,
	ScrollView,
	Text,
	TextInput,
	View
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { connect } from 'react-redux'
import {
	registerUser,
	addUser,
	localStorageUsers
} from '../../redux/actions'

import {
	Button,
	MyModal,
	Touchable
} from '../../components'

import {
	makeId,
	online,
	server
} from '../../modules'

class RegisterScreen extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: navigation.state.params.type
	})

	state = {
		name: null,
		email: null,
		phone: null,
		bisnisName: null,
		password: null,
		confirmPassword: null,

		cabang: null,
		pusat: null,
		namaCabang: null,
		ket: null,

		access: {
			persediaan: false,
			penjualan: false,
			pengeluaran: false,
			perpajakan: false,
			laporan: false,
			pengaturan: false
		}
	}

	_register() {
		/*
		*
		check koneksi internet
		*
		*/
		online(value => {
			if(value) {
				const stateCopy = this.state
				if(this.state.name == '' || this.state.name == null) {
					Alert.alert(null, 'Nama tidak valid')
				} else if(this.state.email == '' || this.state.email == null) {
					Alert.alert(null, 'Email tidak valid')
				} else if(this.state.phone == '' || this.state.phone == null) {
					Alert.alert(null, 'Telepon tidak valid')
				} else if(this.state.password == '' || this.state.password == null) {
					Alert.alert(null, 'Password tidak valid')
				} else {
					if(this.state.password === this.state.confirmPassword) {
						/*stateCopy.access = {
							persediaan: true,
							penjualan: true,
							laporan: true,
							monitoring: true
						}*/

						const store = {
							idPusat: makeId(),
							name: 'Pusat',
							bisnisName: this.state.bisnisName,
							ket: null
						}

						const register = {
							idUser: makeId(),
							idPusat: store.idPusat,
							idCabang: null,
							name: this.state.name,
							email: this.state.email,
							phone: this.state.phone,
							password: this.state.password,
							access: {
								persediaan: true,
								penjualan: true,
								pengeluaran: true,
								perpajakan: true,
								laporan: true,
								pengaturan: true
							}
						}

						/*
						*
						post to api
						*
						*/
						fetch(server + '/users/register', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
								token: false
							},
							body: JSON.stringify({
								store: store,
								register: register
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
								Alert.alert(null, 'Pendaftaran berhasil, silahkan masuk',
									[{ text: 'OK', onPress: () => this.props.navigation.goBack() }])
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

						/*this.props.dispatchRegisterUser({
							data: this.state,
							navigation: this.props.navigation
						})*/
					} else {
						Alert.alert(null, 'Ulangi password')
					}
				}
			} else {
				Alert.alert(null, 'koneksi internet bermasalah')
			}
		})
	}

	_chooseCabang(value) {
		const stateCopy = this.state

		if(value === 'addCabang' || value === null) {
			stateCopy.cabang = value
			stateCopy.namaCabang = null
			stateCopy.ket = null
		} else {
			if(this.props.store.idPusat === value) {
				stateCopy.cabang = value
				stateCopy.namaCabang = this.props.store.name
				stateCopy.ket = this.props.store.ket
			} else {
				for(var i in this.props.store.cabang) {
					if(this.props.store.cabang[i].idCabang === value) {
						stateCopy.cabang = value
						stateCopy.namaCabang = this.props.store.cabang[i].name
						stateCopy.ket = this.props.store.cabang[i].ket
					}
				}
			}
		}
		this.setState(stateCopy)
	}

	_choosePusat(value) {
		const stateCopy = this.state

		if(value === 'addPusat' || value === null) {
			stateCopy.pusat = value
		} else {
			for(var i in this.props.store) {
				if(this.props.store[i].idPusat === value) {
					stateCopy.pusat = value
					stateCopy.idPusat = this.props.store[i].idPusat
				}
			}
		}
		this.setState(stateCopy)
	}

	_addUser() {
		/*
		*
		check koneksi internet
		*
		*/
		online(value => {
			if(value) {
				const stateCopy = this.state

				if(stateCopy.name == '' || stateCopy.name == null) {
					Alert.alert(null, 'nama tidak valid')
				} else if(stateCopy.email == '' || stateCopy.email == null) {
					Alert.alert(null, 'email tidak valid')
				} else if(stateCopy.phone == '' || stateCopy.phone == null) {
					Alert.alert(null, 'telepon tidak valid')
				} else if(stateCopy.password == '' || stateCopy.password == null) {
					Alert.alert(null, 'password tidak valid')
				} else {
					if(stateCopy.password === stateCopy.confirmPassword) {
						if(stateCopy.cabang === null) {
							Alert.alert(null, 'cabang tidak valid')
						} else {
							if(!stateCopy.access.persediaan && !stateCopy.access.penjualan && !stateCopy.access.pengeluaran &&
								!stateCopy.access.perpajakan && !stateCopy.access.laporan && !stateCopy.access.pengaturan) {
								return Alert.alert(null, 'silahkan pilih hak akses')
							}

							var cabang, register
							if(stateCopy.cabang === this.props.store.idPusat) {
								cabang = {
									idCabang: 'Follow Pusat',
									name: 'Follow Pusat',
									ket: null
								}
								register = {
									idUser: makeId(),
									idPusat: this.props.store.idPusat,
									idCabang: null,
									name: stateCopy.name,
									email: stateCopy.email,
									phone: stateCopy.phone,
									password: stateCopy.password,
									access: stateCopy.access
								}
							} else if(stateCopy.cabang === 'addCabang') {
								cabang = {
									idCabang: makeId(),
									name: stateCopy.namaCabang,
									ket: stateCopy.ket
								}
								register = {
									idUser: makeId(),
									idPusat: this.props.store.idPusat,
									idCabang: cabang.idCabang,
									name: stateCopy.name,
									email: stateCopy.email,
									phone: stateCopy.phone,
									password: stateCopy.password,
									access: stateCopy.access
								}
							} else {
								cabang = {
									idCabang: 'Follow Pusat',
									name: 'Follow Pusat',
									ket: null
								}
								register = {
									idUser: makeId(),
									idPusat: this.props.store.idPusat,
									idCabang: stateCopy.cabang,
									name: stateCopy.name,
									email: stateCopy.email,
									phone: stateCopy.phone,
									password: stateCopy.password,
									access: stateCopy.access
								}
							}

							/*
							*
							post to api
							*
							*/
							fetch(server + '/users/addUser', {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json',
									token: this.props.user.token
								},
								body: JSON.stringify({
									cabang: cabang,
									register: register
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
									Alert.alert(null, 'Tambah User berhasil',
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


							/*this.props.dispatchAddUser({
								data: stateCopy,
								navigation: this.props.navigation
							})*/
						}
					} else {
						Alert.alert(null, 'ulangi password')
					}
				}
			} else {
				Alert.alert(null, 'koneksi internet bermasalah')
			}
		})
	}

	_editUser() {
		/*
		*
		check koneksi internet
		*
		*/
		online(value => {
			if(value) {
				const stateCopy = this.state

				if(stateCopy.name == '' || stateCopy.name == null) {
					Alert.alert(null, 'nama tidak valid')
				} else if(stateCopy.email == '' || stateCopy.email == null) {
					Alert.alert(null, 'email tidak valid')
				} else if(stateCopy.phone == '' || stateCopy.phone == null) {
					Alert.alert(null, 'telepon tidak valid')
				} else {
					if(stateCopy.cabang === null) {
						Alert.alert(null, 'cabang tidak valid')
					} else {
						if(!stateCopy.access.persediaan && !stateCopy.access.penjualan && !stateCopy.access.pengeluaran &&
							!stateCopy.access.perpajakan && !stateCopy.access.laporan && !stateCopy.access.pengaturan) {
							return Alert.alert(null, 'silahkan pilih hak akses')
						}

						var store, cabang, register
						if(stateCopy.cabang === this.props.store.idPusat) {
							store = {
								idPusat: this.props.store.idPusat,
								name: 'Pusat',
								bisnisName: this.state.bisnisName
							}
							cabang = {
								idCabang: 'Follow Pusat',
								name: 'Follow Pusat',
								ket: null
							}
							register = {
								idUser: stateCopy.idUser,
								idPusat: this.props.store.idPusat,
								idCabang: null,
								name: stateCopy.name,
								email: stateCopy.email,
								phone: stateCopy.phone,
								access: stateCopy.access
							}
						} else if(stateCopy.cabang === 'addCabang') {
							cabang = {
								idCabang: makeId(),
								name: stateCopy.namaCabang,
								ket: stateCopy.ket
							}
							register = {
								idUser: stateCopy.idUser,
								idPusat: this.props.store.idPusat,
								idCabang: cabang.idCabang,
								name: stateCopy.name,
								email: stateCopy.email,
								phone: stateCopy.phone,
								access: stateCopy.access
							}
						} else {
							cabang = {
								idCabang: stateCopy.cabang,
								name: stateCopy.namaCabang,
								ket: stateCopy.ket
							}
							register = {
								idUser: stateCopy.idUser,
								idPusat: this.props.store.idPusat,
								idCabang: stateCopy.cabang,
								name: stateCopy.name,
								email: stateCopy.email,
								phone: stateCopy.phone,
								access: stateCopy.access
							}
						}

						/*
						*
						post to api
						*
						*/
						fetch(server + '/users/editUser', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
								token: this.props.user.token
							},
							body: JSON.stringify({
								store: store,
								cabang: cabang,
								register: register
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
								Alert.alert(null, 'Edit User berhasil',
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


						/*this.props.dispatchAddUser({
							data: stateCopy,
							navigation: this.props.navigation
						})*/
					}
				}
			} else {
				Alert.alert(null, 'koneksi internet bermasalah')
			}
		})
	}

	_listUser() {
		fetch(server + '/users', {
			method: 'GET',
			headers: {
				token: this.props.user.token
			}
		})
		.then(response => response.json())
		.then(res => {
			if(res.headers.statusCode === 200) {
				this.props.dispatchLocalStorageUsers({users: res.data})
				this.props.navigation.goBack()
			}
		})
		.catch(err => console.log(err))
	}

	_access(value) {
		const stateCopy = this.state
		stateCopy.access[value] = !stateCopy.access[value]
		this.setState(stateCopy)
		/*switch(value) {
			case 'persediaan':
				stateCopy.access.persediaan = !stateCopy.access.persediaan
				this.setState(stateCopy)
				break

			case 'penjualan':
				stateCopy.access.penjualan = !stateCopy.access.penjualan
				this.setState(stateCopy)
				break

			case 'pengeluaran':
				stateCopy.access.pengeluaran = !stateCopy.access.pengeluaran
				this.setState(stateCopy)
				break

			case 'laporan':
				stateCopy.access.laporan = !stateCopy.access.laporan
				this.setState(stateCopy)
				break
		}*/
	}

	render() {
		return (
			<ScrollView
				style = {{ flex: 1, padding: 5, backgroundColor: 'white' }}
				keyboardShouldPersistTaps = 'always'>
				<View style = {{ flex: 1,width:'95%',paddingLeft:'2.5%',paddingRight:'2.5%', }}>
					<View style = {{ flexDirection: 'row' }} >
						<View style = {{ flexDirection: 'column' }}>
							<View style = {{ height: 45, justifyContent: 'center' }}>
								<Text>Nama</Text>
							</View>

							<View style = {{ height: 45, justifyContent: 'center' }}>
								<Text>Email</Text>
							</View>

							<View style = {{ height: 45, justifyContent: 'center' }}>
								<Text>Telepon</Text>
							</View>

							{this.props.navigation.state.params.type === 'Edit User' ?
								<View style = {{ height: 45, justifyContent: 'center' }}>
									<Text>Nama Bisnis</Text>
								</View>
								:
								<View>
									<View style = {{ height: 45, justifyContent: 'center' }}>
										<Text>Password</Text>
									</View>

									<View style = {{ height: 45, justifyContent: 'center' }}>
										<Text>Ulangi Password</Text>
									</View>
								</View>
							}

							{this.props.navigation.state.params.type === 'Register' ?
								<View style = {{ height: 45, justifyContent: 'center' }}>
									<Text>Nama Bisnis</Text>
								</View>
								:
								<View>
									<View style = {{ height: 45, justifyContent: 'center' }}>
										<Text>Cabang</Text>
									</View>
								</View>
							}

							{this.state.cabang === 'addCabang' ?
								<View>
									{/*<View style = {{ height: 45, justifyContent: 'center' }}>
										<Text> Pusat </Text>
									</View>*/}

									<View style = {{ height: 45, justifyContent: 'center' }}>
										<Text>Nama</Text>
									</View>

									<View style = {{ height: 45, justifyContent: 'center' }}>
										<Text>Keterangan</Text>
									</View>
								</View>
								:
								this.state.cabang === null ?
									null
									:
									<View>
										<View style = {{ height: 45, justifyContent: 'center' }}>
											<Text>Nama</Text>
										</View>

										<View style = {{ height: 45, justifyContent: 'center' }}>
											<Text>Keterangan</Text>
										</View>
									</View>
							}

							{this.props.navigation.state.params.type === 'Register' ?
								null
								:
								<View style = {{ height: 45, justifyContent: 'center' }}>
									<Text>Hak Akses</Text>
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
									returnKeyType = 'next'
									underlineColorAndroid = '#bebebe'
									onChangeText = { (text) => this.setState({name: text }) }
									onSubmitEditing = { () => this._email.focus() }
									//placeholder = 'Nama'
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
									underlineColorAndroid = '#bebebe'
									onChangeText = { (text) => this.setState({email: text }) }
									onSubmitEditing = { () => this._phone.focus() }
									//placeholder = 'Email'
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
									underlineColorAndroid = '#bebebe'
									onChangeText = { (text) => this.setState({phone: text }) }
									onSubmitEditing = { () => this._bisnisName.focus() }
									//placeholder = 'Telepon'
									style = {{ flex: 1, height: 45 }}
									value = {this.state.phone}/>
							</View>

							{this.props.navigation.state.params.type === 'Edit User' ?
								<View style = {{ flexDirection: 'row' }}>
									<View style = {{ justifyContent: 'center' }}>
										<Text> : </Text>
									</View>

									<TextInput
										ref = { (c) => this._bisnisName = c }
										autoCapitalize = 'none'
										returnKeyType = 'next'
										underlineColorAndroid = '#bebebe'
										onChangeText = { (text) => this.setState({bisnisName: text }) }
										onSubmitEditing = { () => this._password.focus() }
										//placeholder = 'Telepon'
										style = {{ flex: 1, height: 45 }}
										value = {this.state.bisnisName}/>
								</View>
								:
								<View>
									<View style = {{ flexDirection: 'row' }}>
										<View style = {{ justifyContent: 'center' }}>
											<Text> : </Text>
										</View>

										<TextInput
											ref = { (c) => this._password = c }
											autoCapitalize = 'none'
											returnKeyType = 'next'
											underlineColorAndroid = '#bebebe'
											onChangeText = { (text) => this.setState({password: text }) }
											onSubmitEditing = { () => this._confirmPassword.focus() }
											//placeholder = 'Password'
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
											returnKeyType = 'done'
											underlineColorAndroid = '#bebebe'
											onChangeText = { (text) => this.setState({confirmPassword: text }) }
											onSubmitEditing = { this.props.navigation.state.params.type === 'Register' ? this._register.bind(this) : this._addUser.bind(this) }
											//placeholder = 'Ulangi Password'
											secureTextEntry = {true}
											style = {{ flex: 1, height: 45 }}
											value = {this.state.confirmPassword}/>
									</View>
								</View>
							}

							{this.props.navigation.state.params.type === 'Register' ?
								<View style = {{ flexDirection: 'row' }}>
									<View style = {{ justifyContent: 'center' }}>
										<Text> : </Text>
									</View>

									<TextInput
										ref = { (c) => this._bisnisName = c }
										autoCapitalize = 'none'
										returnKeyType = 'next'
										underlineColorAndroid = '#bebebe'
										onChangeText = { (text) => this.setState({bisnisName: text }) }
										onSubmitEditing = { () => this._password.focus() }
										//placeholder = 'Telepon'
										style = {{ flex: 1, height: 45 }}
										value = {this.state.bisnisName}/>
								</View>
								:
								<View>
									<View style = {{ flexDirection: 'row' }}>
										<View style = {{ justifyContent: 'center' }}>
											<Text> : </Text>
										</View>

										<Picker
											style = {{ flex: 1, height: 45 }}
											selectedValue={this.state.cabang}
											onValueChange={(itemValue, itemIndex) => this._chooseCabang(itemValue, itemIndex) }>
											<Picker.Item label = '-- Pilih Cabang --' value = {null} />
											<Picker.Item label = {this.props.store.name} value = {this.props.store.idPusat} />
											{this.props.store.cabang.map((cabang, index) =>
												<Picker.Item key = {index} label = {cabang.name} value = {cabang.idCabang} />
												)}
											<Picker.Item label = 'Tambah Cabang' value = 'addCabang' />
										</Picker>
									</View>
								</View>
							}

							{this.state.cabang === 'addCabang' ?
								<View>
									{/*<View style = {{ flexDirection: 'row' }}>
										<View style = {{ justifyContent: 'center' }}>
											<Text> : </Text>
										</View>

										<Picker
											style = {{ flex: 1, height: 45 }}
											selectedValue={this.state.pusat}
											onValueChange={(itemValue, itemIndex) => this._choosePusat(itemValue, itemIndex) }>
											<Picker.Item label = '-- Pilih Pusat --' value = {null} />
											{this.props.store.map((store, index) =>
												<Picker.Item key = {index} label = {store.name} value = {store.idPusat} />
												)}
											<Picker.Item label = 'Tambah Pusat' value = 'addPusat' />
										</Picker>
									</View>*/}

									<View style = {{ flexDirection: 'row' }}>
										<View style = {{ justifyContent: 'center' }}>
											<Text> : </Text>
										</View>

										<TextInput
											ref = { (c) => this._cabang = c }
											autoCapitalize = 'words'
											returnKeyType = 'next'
											onChangeText = { (text) => this.setState({namaCabang: text }) }
											onSubmitEditing = { () => this._keterangan.focus() }
											placeholder = 'Nama'
											style = {{ flex: 1, height: 45 }}
											value = {this.state.namaCabang}/>
									</View>

									<View style = {{ flexDirection: 'row' }}>
										<View style = {{ justifyContent: 'center' }}>
											<Text> : </Text>
										</View>

										<TextInput
											ref = { (c) => this._keterangan = c }
											autoCapitalize = 'none'
											returnKeyType = 'done'
											onChangeText = { (text) => this.setState({ket: text }) }
											onSubmitEditing = { this._addUser.bind(this) }
											placeholder = 'Keterangan'
											style = {{ flex: 1, height: 45 }}
											value = {this.state.ket}/>
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

							{this.props.navigation.state.params.type === 'Register' ?
								null
								:
								<View style = {{ flexDirection: 'row', height: 45 }}>
									<View style = {{ justifyContent: 'center' }}>
										<Text> : </Text>
									</View>
								</View>
							}
						</View>
					</View>

					{this.props.navigation.state.params.type === 'Register' ?
						null
						:
						<View style = {{marginLeft: 10}}>
							<View style = {{borderWidth: 0}}>
								<Touchable
									style = {{flex: 1, flexDirection: 'row'}}
									onPress = {this._access.bind(this, 'persediaan')}>
									<View style = {{justifyContent: 'center'}}>
										<Ionicons
											name = {this.state.access.persediaan ? 'ios-checkbox-outline' : 'ios-square-outline'}
											size = { 25 }/>
									</View>

									<View style = {{justifyContent: 'center', marginLeft: 5}}>
										<Text> Persediaan </Text>
									</View>
								</Touchable>
							</View>

							<View style = {{borderWidth: 0}}>
								<Touchable
									style = {{flexDirection: 'row'}}
									onPress = {this._access.bind(this, 'penjualan')}>
									<View style = {{justifyContent: 'center'}}>
										<Ionicons
											name = {this.state.access.penjualan ? 'ios-checkbox-outline' : 'ios-square-outline'}
											size = { 25 }/>
									</View>

									<View style = {{justifyContent: 'center', marginLeft: 5}}>
										<Text> Penjualan </Text>
									</View>
								</Touchable>
							</View>

							<View style = {{borderWidth: 0}}>
								<Touchable
									style = {{flexDirection: 'row'}}
									onPress = {this._access.bind(this, 'pengeluaran')}>
									<View style = {{justifyContent: 'center'}}>
										<Ionicons
											name = {this.state.access.pengeluaran ? 'ios-checkbox-outline' : 'ios-square-outline'}
											size = { 25 }/>
									</View>

									<View style = {{justifyContent: 'center', marginLeft: 5}}>
										<Text> Pengeluaran </Text>
									</View>
								</Touchable>
							</View>

							<View style = {{borderWidth: 0}}>
								<Touchable
									style = {{flexDirection: 'row'}}
									onPress = {this._access.bind(this, 'perpajakan')}>
									<View style = {{justifyContent: 'center'}}>
										<Ionicons
											name = {this.state.access.perpajakan ? 'ios-checkbox-outline' : 'ios-square-outline'}
											size = { 25 }/>
									</View>

									<View style = {{justifyContent: 'center', marginLeft: 5}}>
										<Text> Perpajakan </Text>
									</View>
								</Touchable>
							</View>

							<View style = {{borderWidth: 0}}>
								<Touchable
									style = {{flexDirection: 'row'}}
									onPress = {this._access.bind(this, 'laporan')}>
									<View style = {{justifyContent: 'center'}}>
										<Ionicons
											name = {this.state.access.laporan ? 'ios-checkbox-outline' : 'ios-square-outline'}
											size = { 25 }/>
									</View>

									<View style = {{justifyContent: 'center', marginLeft: 5}}>
										<Text> Laporan </Text>
									</View>
								</Touchable>
							</View>

							<View style = {{borderWidth: 0}}>
								<Touchable
									style = {{flexDirection: 'row'}}
									onPress = {this._access.bind(this, 'pengaturan')}>
									<View style = {{justifyContent: 'center'}}>
										<Ionicons
											name = {this.state.access.pengaturan ? 'ios-checkbox-outline' : 'ios-square-outline'}
											size = { 25 }/>
									</View>

									<View style = {{justifyContent: 'center', marginLeft: 5}}>
										<Text> Pengaturan </Text>
									</View>
								</Touchable>
							</View>
						</View>
					}
				</View>

				<View style = {{ marginTop: 20,width:'95%',marginLeft:'2.5%',marginRight:'2.5%' }}>
					{this.props.navigation.state.params.type === 'Register' ?
						<Button
							onPress = { this._register.bind(this) }
							name = 'DAFTAR' />
						:
						this.props.navigation.state.params.type === 'Edit User' ?
						<Button
							onPress = { this._editUser.bind(this) }
							name = 'Edit User' />
						:
						<Button
							onPress = { this._addUser.bind(this) }
							name = 'Tambah User' />
					}
				</View>
			</ScrollView>
		)
	}

	componentWillMount() {
		if(this.props.navigation.state.params.type === 'Edit User') {
			var ket = null
			if(this.props.navigation.state.params.content.idCabang === null) {
				if(this.props.store.idPusat === this.props.navigation.state.params.content.idPusat) {
					ket = this.props.store.ket
				} else {
					for(var i in this.props.store.cabang) {
						if(this.props.store.cabang[i].idCabang === this.props.navigation.state.params.content.idCabang) {
							ket = this.props.store.cabang[i].ket
						}
					}
				}
			}

			this.setState({
				idUser: this.props.navigation.state.params.content.idUser,
				idPusat: this.props.navigation.state.params.content.idPusat,
				idCabang: this.props.navigation.state.params.content.idCabang,

				name: this.props.navigation.state.params.content.name,
				email: this.props.navigation.state.params.content.email,
				phone: this.props.navigation.state.params.content.phone,
				bisnisName: this.props.store.bisnisName,

				cabang: this.props.navigation.state.params.content.idCabang === null ? this.props.navigation.state.params.content.idPusat : this.props.navigation.state.params.content.idCabang,
				namaCabang: this.props.navigation.state.params.content.cabangName,
				ket: ket,

				access: {
					persediaan: this.props.navigation.state.params.content.access.persediaan == 'true' ? true : false,
					penjualan: this.props.navigation.state.params.content.access.penjualan == 'true' ? true : false,
					pengeluaran: this.props.navigation.state.params.content.access.pengeluaran == 'true' ? true : false,
					perpajakan: this.props.navigation.state.params.content.access.perpajakan == 'true' ? true : false,
					laporan: this.props.navigation.state.params.content.access.laporan == 'true' ? true : false,
					pengaturan: this.props.navigation.state.params.content.access.pengaturan == 'true' ? true : false
				}
			})
		}
	}
}

function mapStateToProps (state) {
	return {
		store: state.user.store[0],
		user: state.user.data
	}
}

function mapDispatchToProps (dispatch) {
	return {
		dispatchRegisterUser: (data) => dispatch(registerUser(data)),
		dispatchAddUser: (data) => dispatch(addUser(data)),
		dispatchLocalStorageUsers: (data) => dispatch(localStorageUsers(data)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RegisterScreen)