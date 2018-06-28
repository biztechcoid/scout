import React from 'react'
import {
	Alert,
	AsyncStorage,
	Dimensions,
	Keyboard,
	Modal,
	NetInfo,
	View,
	ScrollView,
	StyleSheet,
	Text,
	TextInput
} from 'react-native'
const { width, height } = Dimensions.get('window')
import Ionicons from 'react-native-vector-icons/Ionicons'

import { connect } from 'react-redux'
import {
	addIngredients,
	updateIngredients,
	deleteIngredients,
	pushIngredients,
	barcodeProduct
} from '../../redux/actions'

import {
	Button,
	ButtonIcons,
	MyModal,
	Touchable
} from '../../components'

import{
	makeId,
	rupiah,
	online,
	server
} from '../../modules'


class BahanBakuScreen extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Bahan Baku'
	})

	state = {
		keyboard: false,
		modalVisible: false,
		modalQty: false,

		idIngredients: null,
		barcode: null,
		product: null,
		cost: null,
		price: null,
		quantity: null,

		// connection: null,
		data: {}
	}

	_scanQR() {
		if(this.state.modalVisible) {
			this._setModalVisible(false)
		}
		this.props.navigation.navigate('ScanQR', { type: 'barcodeProduct' })
	}

	/*
	*
	bahan baku
	*
	*/
	_addIngredients() {
		online(value => {
			if(value) {
				/*if(this.state.barcode == '' || this.state.barcode == null) {
					Alert.alert(null, 'barcode product tidak valid')
				} else*/ if(this.state.product == '' || this.state.product == null) {
					Alert.alert(null, 'nama product tidak valid')
				} else if(this.state.cost == '' || this.state.cost == null) {
					Alert.alert(null, 'cost product tidak valid')
				} /*else if(this.state.price == '' || this.state.price == null) {
					Alert.alert(null, 'price product tidak valid')
				}*/ else if(this.state.quantity == '' || this.state.quantity == null) {
					Alert.alert(null, 'quantity product tidak valid')
				} else {
					online(value => {
						if(value) {
							var data = {
								idIngredients: makeId(),
								barcode: this.state.barcode,
								name: this.state.product,
								cost: Number(this.state.cost),
								price: Number(this.state.price),
								quantity: Number(this.state.quantity)
							}
							var postData = {
								idIngredients: data.idIngredients,
								idPusat: this.props.profile.idPusat,
								idCabang: this.props.profile.idCabang,
								barcode: data.barcode,
								name: data.name,
								cost: data.cost,
								price: data.price,
								quantity: data.quantity
							}
							/*
							*
							post to api
							*
							*/
							fetch(server + '/inventory/addIngredients', {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json',
									token: this.props.profile.token
								},
								body: JSON.stringify(postData)
							})
							.then(response => response.json())
							.then(res => {
								if(res.headers.statusCode === 200) {
									this.props.dispatchAddIngredients(data)
									this.props.dispatchBarcodeProduct(null)
									this.setState({
										barcode: null,
										product: null,
										cost: null,
										price: null,
										quantity: null
									})
								} else {
									Alert.alert(null, res.headers.message)
								}
							})
							.catch(err => console.log(err))
							this._setModalVisible(false)
						} else {
							Alert.alert(null, 'koneksi internet bermasalah')
						}
					})
				}
			} else {
				Alert.alert(null, 'koneksi internet bermasalah')
			}
		})
	}

	__updateIngredients(content) {
		this.setState({
			idIngredients: content.idIngredients,
			barcode: content.barcode,
			product: content.name,
			cost: content.cost,
			price: content.price,
			quantity: content.quantity
		})
		this._setModalVisible(true)
	}

	_updateIngredients() {
		online(value => {
			if(value) {
				/*if(this.state.barcode == '' || this.state.barcode == null) {
					Alert.alert(null, 'barcode product tidak valid')
				} else*/ if(this.state.product == '' || this.state.product == null) {
					Alert.alert(null, 'nama product tidak valid')
				} else if(this.state.cost == '' || this.state.cost == null) {
					Alert.alert(null, 'cost product tidak valid')
				} /*else if(this.state.price == '' || this.state.price == null) {
					Alert.alert(null, 'price product tidak valid')
				}*/ else if(this.state.quantity == '' || this.state.quantity == null) {
					Alert.alert(null, 'quantity product tidak valid')
				} else {
					online(value => {
						if(value) {
							var data = {
								idIngredients: this.state.idIngredients,
								barcode: this.state.barcode,
								name: this.state.product,
								cost: this.state.cost,
								price: this.state.price,
								quantity: this.state.quantity
							}
							/*
							*
							post to api
							*
							*/
							fetch(server + '/inventory/updateIngredients', {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json',
									token: this.props.profile.token
								},
								body: JSON.stringify(data)
							})
							.then(response => response.json())
							.then(res => {
								if(res.headers.statusCode === 200) {
									this.props.dispatchUpdateIngredients(data)
									this.props.dispatchBarcodeProduct(null)
									this.setState({
										idIngredients: null,
										barcode: null,
										product: null,
										cost: null,
										price: null,
										quantity: null
									})
								} else {
									Alert.alert(null, res.headers.message)
								}
							})
							.catch(err => console.log(err))
							this._setModalVisible(false)
						} else {
							Alert.alert(null, 'koneksi internet bermasalah')
						}
					})
				}
			} else {
				Alert.alert(null, 'koneksi internet bermasalah')
			}
		})
	}

	__deleteIngredients(data) {
		/*
		*
		post to api
		*
		*/
		fetch(server + '/inventory/deleteIngredients', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token: this.props.profile.token
			},
			body: JSON.stringify(data)
		})
		.then(response => response.json())
		.then(res => {
			if(res.headers.statusCode === 200) {
				this.props.dispatchDeleteIngredients(data)
			} else {
				Alert.alert(null, res.headers.message)
			}
		})
		.catch(err => console.log(err))
	}

	_deleteIngredients(content) {
		online(value => {
			if(value) {
				var data = {
					idIngredients: content.idIngredients
				}
				Alert.alert(null, 'Anda yakin akan menghapus bahan baku ' + content.name,
					[
						{ text: 'Yakin', onPress: () => this.__deleteIngredients(data) },
						{ text: 'Batal' }
					])
			} else {
				Alert.alert(null, 'koneksi internet bermasalah')
			}
		})
	}
	/**/

	_pushIngredients(ingredients) {
		var category = this.props.category[this.props.navigation.state.params.idxCategory]
		var product = category.product[this.props.navigation.state.params.idxProduct]
		var stateCopy = this.state
		stateCopy.data['idCategory'] = category.idCategory
		stateCopy.data['idProduct'] = product.idProduct
		stateCopy.data['ingredients'] = {}
		stateCopy.data.ingredients['idIngredients'] = ingredients.idIngredients
		this.setState(stateCopy)

		online(value => {
			if(value) {
				if(product.ingredients.length === 0) {
					return this._setModalQty(true)
				} else {
					for(var i in product.ingredients) {
						if(product.ingredients[i] === ingredients.idIngredients) {
							return Alert.alert(null, ingredients.name + ' sudah ada di bahan baku')
						}
					}
					return this._setModalQty(true)
				}
			} else {
				Alert.alert(null, 'koneksi internet bermasalah')
			}
		})
		/*var data = {
			idCategory: this.props.navigation.state.params.idCategory,
			idProduct: this.props.navigation.state.params.product.idProduct,
			ingredients: ingredients
		}

		if(this.props.navigation.state.params.product.ingredients.length === 0) {
			return this.props.dispatchPushIngredients(data), this.props.navigation.goBack()
		} else {
			for(var i in this.props.navigation.state.params.product.ingredients) {
				if(this.props.navigation.state.params.product.ingredients[i].idIngredients === ingredients.idIngredients) {
					return Alert.alert(null, ingredients.name + ' sudah ada di bahan baku')
				} else {
					return this.props.dispatchPushIngredients(data), this.props.navigation.goBack()
				}
			}
		}*/
	}

	_submitIngredients() {
		const stateCopy = this.state
		stateCopy.data.ingredients['qty'] = this.state.qty
		this.setState(stateCopy)
		var postData = {
			idIngredients: stateCopy.data.ingredients.idIngredients,
			idProduct: stateCopy.data.idProduct,
			idSubProduct: null,
			qty: stateCopy.data.ingredients.qty
		}
		/*
		*
		post to api
		*
		*/
		fetch(server + '/inventory/addBahanBaku', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token: this.props.profile.token
			},
			body: JSON.stringify(postData)
		})
		.then(response => response.json())
		.then(res => {
			if(res.headers.statusCode === 200) {
				this.props.dispatchPushIngredients(this.state.data)
			} else {
				Alert.alert(null, res.headers.message)
			}
		})
		.catch(err => console.log(err))
		this._setModalQty(false)
		this.props.navigation.goBack()
	}

	render() {
		return(
			<View style = { styles.container }>
				<MyModal
					top = {0.5}
					left = {0.5}
					contentStyle = {{flex: 1}}
					visible = {this.state.modalQty}
					onRequestClose = {this._setModalQty.bind(this, false)}>
					<View style = {{ flex: 1, width: width - 20, height: height - 100, padding: 5, borderRadius: 5, backgroundColor: 'white' }}>
						<View style = {{flex: 1}}>
							<Text>Masukkan jumlah kuantitas bahan baku yang dibutuhkan</Text>
						</View>

						<View style = {{flex: 1}}>
							<TextInput
								returnKeyType = 'done'
								onChangeText = {(text) => this.setState({qty: text})}
								onSubmitEditing = {this._submitIngredients.bind(this)}
								underlineColorAndroid = '#ececec'
								value = {this.state.qty}/>
						</View>

						<View style = {{flex: 1}}/>
						<View style = {styles.stickyBottom}>
							<Button
								onPress = {this._submitIngredients.bind(this)}
								name = 'Selesai'/>
						</View>
					</View>
				</MyModal>

				<MyModal
					top = {this.state.keyboard ? 0 : 0.5}
					left = {0.5}
					contentStyle = {{ flex: 3 }}
					visible = { this.state.modalVisible }
					onRequestClose = { this._setModalVisible.bind(this, false) }>
					<View style = {{ flex: 1, width: width - 20, height: height - 100, padding: 5, borderRadius: 5, backgroundColor: 'white' }}>
						<View style = { styles.content }>
							<View style = {{ padding: 5, alignItems: 'center', justifyContent: 'center' }}>
								{this.state.idIngredients == null ?
									<Text style = {{ fontWeight: 'bold' }}> Bahan Baku </Text>
									:
									<Text style = {{ fontWeight: 'bold' }}> Ubah Bahan Baku </Text>
								}
							</View>

							<View style = { styles.row }>
								<View style = {{ flex: 0.5 }}>
									<Button
										onPress = { this._scanQR.bind(this) }
										name = 'Scan' />
								</View>

								<View style = {{ flex: 2 }}>
									<TextInput
										returnKeyType = 'next'
										onChangeText = { (text) => this.props.barcode == null ? this.setState({ barcode: text }) : this.setState({ barcode: this.props.barcode })}
										onSubmitEditing = { () => this._product.focus() }
										underlineColorAndroid = '#ececec'
										placeholder = 'Barcode'
										value = { this.props.barcode == null ? this.state.barcode : this.props.barcode }/>
								</View>
							</View>

							<ScrollView
								style = {{ flex: 3 }}
								keyboardShouldPersistTaps = 'always'>
								<View style = {{ flexDirection: 'row' }}>
									<View style = {{ flexDirection: 'column' }}>
										<View style = {{ height: 50, justifyContent: 'center' }}>
											<Text> Produk </Text>
										</View>
										<View style = {{ height: 50, justifyContent: 'center' }}>
											<Text> Harga Pokok </Text>
										</View>
										{/*<View style = {{ height: 50, justifyContent: 'center' }}>
											<Text> Harga </Text>
										</View>*/}
										<View style = {{ height: 50, justifyContent: 'center' }}>
											<Text> Kuantitas </Text>
										</View>
									</View>

									<View style = {{ flex: 1, flexDirection: 'column' }}>
										<View style = {{ flexDirection: 'row' }}>
											<View style = {{ height: 50, justifyContent: 'center' }}>
												<Text> : </Text>
											</View>
											
											<TextInput
												ref = { (c) => this._product = c }
												style = {{ flex: 1, height: 50 }}
												autoCapitalize = 'words'
												returnKeyType = 'next'
												placeholder = 'Produk'
												underlineColorAndroid = '#ececec'
												onChangeText = { (text) => this.setState({ product: text })}
												onSubmitEditing = { () => this._cost.focus() }

												value = {this.state.product}/>
										</View>

										<View style = {{ flexDirection: 'row' }}>
											<View style = {{ height: 50, justifyContent: 'center' }}>
												<Text> : </Text>
											</View>
											
											<TextInput
												ref = { (c) => this._cost = c }
												style = {{ flex: 1, height: 50 }}
												keyboardType = 'numeric'
												underlineColorAndroid = '#ececec'
												returnKeyType = 'next'
												onChangeText = { (text) => this.setState({ cost: text })}
												onSubmitEditing = { () => this._quantity.focus() }
												placeholder = 'Harga Pokok'
												value = { this.state.cost == null ? this.state.cost : this.state.cost.toString() }/>
										</View>

										{/*<View style = {{ flexDirection: 'row' }}>
											<View style = {{ height: 50, justifyContent: 'center' }}>
												<Text> : </Text>
											</View>
											
											<TextInput
												ref = { (c) => this._price = c }
												style = {{ flex: 1, height: 50 }}
												keyboardType = 'numeric'
												returnKeyType = 'next'
												underlineColorAndroid = '#ececec'
												onChangeText = { (text) => this.setState({ price: text })}
												onSubmitEditing = { () => this._quantity.focus() }
												placeholder = 'Harga'
												value = { this.state.price == null ? this.state.price : this.state.price.toString() }/>
										</View>*/}

										<View style = {{ flexDirection: 'row' }}>
											<View style = {{ height: 50, justifyContent: 'center' }}>
												<Text> : </Text>
											</View>
											
											<TextInput
												ref = { (c) => this._quantity = c }
												style = {{ flex: 1, height: 50 }}
												keyboardType = 'numeric'
												returnKeyType = 'done'
												underlineColorAndroid = '#ececec'
												onChangeText = { (text) => this.setState({ quantity: text })}
												onSubmitEditing = { this.state.idProduct == null ? this._addIngredients.bind(this) : this._updateIngredients.bind(this) }
												placeholder = 'Kuantitas'
												value = { this.state.quantity == null ? this.state.quantity : this.state.quantity.toString() }/>
										</View>
									</View>
								</View>
							</ScrollView>
						</View>
						
						<View style = {{height: 45 }}/>

						<View style = { styles.stickyBottom }>
							<View style = { styles.row }>
								<Button
									color='#94abb6'
									onPress = { () => {this.setState({ idProduct: null,
										barcode: null,
										product: null,
										cost: null,
										price: null,
										quantity: null }); this._setModalVisible(false)}}
									name = 'Batal'/>
								<Text>&nbsp;</Text>

								{this.state.idIngredients == null ?
									<Button
										onPress = { this._addIngredients.bind(this) }
										name = 'Tambah'/>
									:
									<Button
										onPress = { this._updateIngredients.bind(this) }
										name = 'Ubah'/>
								}
							</View>
						</View>
					</View>
				</MyModal>

				<ScrollView style = {{ flex: 1 }}>
					{this.props.ingredients.map((content, index) => {
						return (
							<View
								key = {index}
								style = {[ styles.bahanBaku, { flexDirection: 'row' }]}>
								<Touchable
									onPress = { this._pushIngredients.bind(this, content) }
									style = {{ flex: 1, flexDirection: 'row' }}>
									<Text> {index + 1}. </Text>

									<View style = {{ flexDirection: 'column' }}>
										<Text> {content.name} </Text>

										<View style = {{ flexDirection: 'row' }}>
											<View style = {{ flexDirection: 'column' }}>
												<Text> Stok </Text>
												<Text> Harga Pokok </Text>
												{/*<Text> Harga </Text>*/}
											</View>

											<View style = {{ flexDirection: 'column' }}>
												<Text> : {content.quantity} </Text>
												<Text> : {rupiah(content.cost)} </Text>
												{/*<Text> : {rupiah(content.price)} </Text>*/}
											</View>
										</View>
									</View>
								</Touchable>

								<ButtonIcons
									style = {{ width: 40, height: 40 }}
									onPress = { this.__updateIngredients.bind(this, content) }
									name = 'md-create'
									color = 'grey'
									size = { 20 }/>

								<ButtonIcons
									style = {{ width: 40, height: 40 }}
									onPress = { this._deleteIngredients.bind(this, content) }
									name = 'md-close'
									color = 'grey'
									size = { 20 }/>
							</View>
						)
					})}
				</ScrollView>

				<View style = {{height: 45 }}/>

				{this.state.keyboard ?
					null
					:
					<View style = { styles.stickyBottom }>
						<Button
							onPress = { this._setModalVisible.bind(this, true) }
							name = 'Tambah Bahan Baku'/>
					</View>
				}
			</View>
		)
	}

	_setModalVisible(visible) {
		if(visible) {
			this.setState({
				modalVisible: visible
			})
		} else {
			/* set default state jika modal tertutup */
			this.setState({
				modalVisible: visible,
				idIngredients: null,
				barcode: null,
				product: null,
				cost: null,
				price: null,
				quantity: null
			})
		}
	}

	_setModalQty(visible) {
		this.setState({modalQty: visible})
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

	// handleFirstConnectivityChange(isConnected) {
	// 	this.setState({connection: isConnected})

	// 	this.props.navigation.setParams({
	// 		connection: isConnected
	// 	})

	// 	NetInfo.isConnected.removeEventListener(
	// 		'connectionChange',
	// 		this.handleFirstConnectivityChange
	// 	)
	// }

	componentWillMount() {
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this))
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this))
	}

	// componentDidMount() {
	// 	NetInfo.isConnected.fetch().then(isConnected => {
	// 		this.setState({connection: isConnected})

	// 		this.props.navigation.setParams({
	// 			connection: isConnected
	// 		})
	// 	})
		
	// 	NetInfo.isConnected.addEventListener(
	// 		'connectionChange',
	// 		this.handleFirstConnectivityChange
	// 	)
	// }

	componentWillUnmount() {
		this.keyboardDidShowListener.remove()
		this.keyboardDidHideListener.remove()
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 5,
		backgroundColor: 'white'
	},
	content: {
		flex: 1,
		justifyContent: 'center'
	},
	row: {
		flexDirection: 'row'
	},
	stickyBottom: {
		position: 'absolute',
		left: 5,
		right: 5,
		bottom: 5
	},
	bahanBaku: {
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
	}
})


function mapStateToProps (state) {
	return {
		category: state.category.data,
		ingredients: state.category.ingredients,
		profile: state.user.data
	}
}

function mapDispatchToProps (dispatch) {
	return {
		dispatchAddIngredients: (data) => dispatch(addIngredients(data)),
		dispatchUpdateIngredients: (data) => dispatch(updateIngredients(data)),
		dispatchDeleteIngredients: (data) => dispatch(deleteIngredients(data)),
		dispatchPushIngredients: (data) => dispatch(pushIngredients(data)),
		dispatchBarcodeProduct: (data) => dispatch(barcodeProduct(data))

	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BahanBakuScreen)