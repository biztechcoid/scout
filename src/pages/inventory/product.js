import React from 'react'
import {
	Alert,
	Dimensions,
	Keyboard,
	ListView,
	Modal,
	View,
	ScrollView,
	StyleSheet,
	Text,
	TextInput
} from 'react-native'
const { width, height } = Dimensions.get('window')
import Ionicons from 'react-native-vector-icons/Ionicons'

import {
	Button,
	ButtonIcons,
	MyModal,
	Touchable
} from '../../components'

import{
	makeId,
	online,
	rupiah,
	server
} from '../../modules'

import { connect } from 'react-redux'
import {
	addProduct,
	updateProduct,
	deleteProduct,
	addSubProduct,
	updateSubProduct,
	deleteSubProduct,
	barcodeProduct
} from '../../redux/actions'


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

class ProductScreen extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: `Kategori ${ navigation.state.params.content.name }`
	})

	state = {
		keyboard: false,

		modalVisible: false,
		idProduct: null,
		barcode: null,
		product: null,
		cost: null,
		price: null,
		quantity: null,

		view: [],
		subProductModal: false,
		idSubProduct: null,
		// barcode: null,
		// subProduct: null,
		// cost: null,
		// price: null,
		// quantity: null
	}

	_scanQR() {
		if(this.state.modalVisible) {
			this._setModalVisible(false)
		}
		this.props.navigation.navigate('ScanQR', { type: 'barcodeProduct' })
	}

	/*
	*
	product
	*
	*/
	_addProduct() {
		online(value => {
			if(value) {
				/*if(this.state.barcode == '' || this.state.barcode == null) {
					Alert.alert(null, 'barcode product tidak valid')
				} else*/ if(this.state.product == '' || this.state.product == null) {
					Alert.alert(null, 'nama product tidak valid')
				} else if(this.state.cost == '' || this.state.cost == null) {
					Alert.alert(null, 'cost product tidak valid')
				} else if(this.state.price == '' || this.state.price == null) {
					Alert.alert(null, 'price product tidak valid')
				} else if(this.state.quantity == '' || this.state.quantity == null) {
					Alert.alert(null, 'quantity product tidak valid')
				} else {
					var data = {
						idProduct: makeId(),
						idCategory: this.props.navigation.state.params.content.idCategory,
						barcode: this.state.barcode,
						name: this.state.product,
						cost: Number(this.state.cost),
						price: Number(this.state.price),
						quantity: Number(this.state.quantity)
					}
					/*
					*
					post to api
					*
					*/
					fetch(server + '/inventory/addProduct', {
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
							this.props.dispatchAddProduct(data)
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
				}
			} else {
				Alert.alert(null, 'koneksi internet bermasalah')
			}
		})
	}

	__updateProduct(content) {
		this.setState({
			idProduct: content.idProduct,
			barcode: content.barcode,
			product: content.name,
			cost: content.cost,
			price: content.price,
			quantity: content.quantity
		})
		this._setModalVisible(true)
	}

	_updateProduct() {
		online(value => {
			if(value) {
				/*if(this.state.barcode == '' || this.state.barcode == null) {
					Alert.alert(null, 'barcode product tidak valid')
				} else*/ if(this.state.product == '' || this.state.product == null) {
					Alert.alert(null, 'nama product tidak valid')
				} else if(this.state.cost == '' || this.state.cost == null) {
					Alert.alert(null, 'cost product tidak valid')
				} else if(this.state.price == '' || this.state.price == null) {
					Alert.alert(null, 'price product tidak valid')
				} else if(this.state.quantity == '' || this.state.quantity == null) {
					Alert.alert(null, 'quantity product tidak valid')
				} else {
					var data = {
						idCategory: this.props.navigation.state.params.content.idCategory,
						idProduct: this.state.idProduct,
						barcode: this.state.barcode,
						name: this.state.product,
						cost: this.state.cost,
						price: this.state.price,
						quantity: this.state.quantity
					}
					var postData = {
						// idCategory: this.props.navigation.state.params.content.idCategory,
						idProduct: this.state.idProduct,
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
					fetch(server + '/inventory/updateProduct', {
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
							this.props.dispatchUpdateProduct(data)
							this.props.dispatchBarcodeProduct(null)
							this.setState({
								idProduct: null,
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
				}
			} else {
				Alert.alert(null, 'koneksi internet bermasalah')
			}
		})
	}

	__deleteProduct(data) {
		/*
		*
		post to api
		*
		*/
		fetch(server + '/inventory/deleteProduct', {
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
				this.props.dispatchDeleteProduct(data)
			} else {
				Alert.alert(null, res.headers.message)
			}
		})
		.catch(err => console.log(err))
	}

	_deleteProduct(content) {
		online(value => {
			if(value) {
				var data = {
					idCategory: this.props.navigation.state.params.content.idCategory,
					idProduct: content.idProduct
				}
				Alert.alert(null, 'Anda yakin akan menghapus product '+ content.name,
					[
						{ text: 'Yakin', onPress: () => this.__deleteProduct(data) },
						{ text: 'Batal' }
					])
			} else {
				Alert.alert(null, 'koneksi internet bermasalah')
			}
		})
	}
	/**/

	/*
	*
	sub product
	*
	*/
	_addSubProduct() {
		online(value => {
			if(value) {
				/*if(this.state.barcode == '' || this.state.barcode == null) {
					Alert.alert(null, 'barcode product tidak valid')
				} else*/ if(this.state.product == '' || this.state.product == null) {
					Alert.alert(null, 'nama product tidak valid')
				} else if(this.state.cost == '' || this.state.cost == null) {
					Alert.alert(null, 'cost product tidak valid')
				} else if(this.state.price == '' || this.state.price == null) {
					Alert.alert(null, 'price product tidak valid')
				} else if(this.state.quantity == '' || this.state.quantity == null) {
					Alert.alert(null, 'quantity product tidak valid')
				} else {
					var data = {
						idCategory: this.props.navigation.state.params.content.idCategory,
						idProduct: this.state.idProduct,
						idSubProduct: makeId(),
						barcode: this.state.barcode,
						name: this.state.product,
						cost: Number(this.state.cost),
						price: Number(this.state.price),
						quantity: Number(this.state.quantity)
					}
					var postData = {
						idProduct: this.state.idProduct,
						idSubProduct: data.idSubProduct,
						barcode: this.state.barcode,
						name: this.state.product,
						cost: Number(this.state.cost),
						price: Number(this.state.price),
						quantity: Number(this.state.quantity)
					}
					/*
					*
					post to api
					*
					*/
					fetch(server + '/inventory/addSubProduct', {
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
							this.props.dispatchAddSubProduct(data)
							this.props.dispatchBarcodeProduct(null)
							this.setState({
								idProduct: null,
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
					this._setSubProductModal(false)
				}
			} else {
				Alert.alert(null, 'koneksi internet bermasalah')
			}
		})
	}

	__updateSubProduct(content, idProduct) {
		this.setState({
			idSubProduct: content.idSubProduct,
			barcode: content.barcode,
			product: content.name,
			cost: content.cost,
			price: content.price,
			quantity: content.quantity
		})
		this._setSubProductModal(true, idProduct)
	}

	_updateSubProduct() {
		online(value => {
			if(value) {
				/*if(this.state.barcode == '' || this.state.barcode == null) {
					Alert.alert(null, 'barcode product tidak valid')
				} else*/ if(this.state.product == '' || this.state.product == null) {
					Alert.alert(null, 'nama product tidak valid')
				} else if(this.state.cost == '' || this.state.cost == null) {
					Alert.alert(null, 'cost product tidak valid')
				} else if(this.state.price == '' || this.state.price == null) {
					Alert.alert(null, 'price product tidak valid')
				} else if(this.state.quantity == '' || this.state.quantity == null) {
					Alert.alert(null, 'quantity product tidak valid')
				} else {
					var data = {
						idCategory: this.props.navigation.state.params.content.idCategory,
						idProduct: this.state.idProduct,
						idSubProduct: this.state.idSubProduct,
						barcode: this.state.barcode,
						name: this.state.product,
						cost: this.state.cost,
						price: this.state.price,
						quantity: this.state.quantity
					}
					var postData = {
						idSubProduct: this.state.idSubProduct,
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
					fetch(server + '/inventory/updateSubProduct', {
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
							this.props.dispatchUpdateSubProduct(data)
							this.props.dispatchBarcodeProduct(null)
							this.setState({
								idProduct: null,
								idSubProduct: null,
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
					this._setSubProductModal(false)
				}
			} else {
				Alert.alert(null, 'koneksi internet bermasalah')
			}
		})
	}

	__deleteSubProduct(data){
		/*
		*
		post to api
		*
		*/
		fetch(server + '/inventory/deleteSubProduct', {
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
				this.props.dispatchDeleteSubProduct(data)
			} else {
				Alert.alert(null, res.headers.message)
			}
		})
		.catch(err => console.log(err))
	}

	_deleteSubProduct(content, idProduct) {
		online(value => {
			if(value) {
				var data = {
					idCategory: this.props.navigation.state.params.content.idCategory,
					idProduct: idProduct,
					idSubProduct: content.idSubProduct
				}
				Alert.alert(null, 'Anda yakin akan menghapus sub-product '+ content.name,
					[
						{ text: 'Yakin', onPress: () => this.__deleteSubProduct(data) },
						{ text: 'Batal' }
					])
			} else {
				Alert.alert(null, 'koneksi internet bermasalah')
			}
		})
	}
	/**/

	_collapse(index) {
		const stateCopy = this.state

		stateCopy.view[index] = !stateCopy.view[index]

		this.setState(stateCopy)
	}

	render() {
		return(
			<View style = { styles.container }>
				{/*
				*
				add product
				*
				*/}
				<MyModal
					visible = { this.props.barcode == null ? this.state.modalVisible : true }
					top = {this.state.keyboard ? 0 : 0.5}
					left = {0.5}
					contentStyle = {{ flex: 3 }}
					onRequestClose = { this._setModalVisible.bind(this, false) }>
					<View style = {{ flex: 1, width: width - 20, height: height - 100, padding: 5, borderRadius: 5, backgroundColor: 'white' }}>
						<View style = { styles.content }>
							<View style = {{ padding: 5, alignItems: 'center', justifyContent: 'center' }}>
								{this.state.idProduct == null ?
									<Text style = {{ fontWeight: 'bold' }}> Tambah Produk </Text>
									:
									<Text style = {{ fontWeight: 'bold' }}> Ubah Produk </Text>
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
										underlineColorAndroid = '#ececec'
										returnKeyType = 'next'
										onChangeText = { (text) => this.props.barcode == null ? this.setState({ barcode: text }) : this.setState({ barcode: this.props.barcode })}
										onSubmitEditing = { () => this._product.focus() }
										placeholder = 'Barcode'
										value = { this.props.barcode == null ? this.state.barcode : this.props.barcode }/>
								</View>
							</View>

							<ScrollView
								overScrollMode = {'always'}
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
										<View style = {{ height: 50, justifyContent: 'center' }}>
											<Text> Harga Jual </Text>
										</View>
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
												underlineColorAndroid = '#ececec'
												onChangeText = { (text) => this.setState({ product: text })}
												onSubmitEditing = { () => this._cost.focus() }
												placeholder = 'Produk'
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
												onSubmitEditing = { () => this._price.focus() }
												placeholder = 'Harga Pokok'
												value = { this.state.cost == null ? this.state.cost : this.state.cost.toString() }/>
										</View>

										<View style = {{ flexDirection: 'row' }}>
											<View style = {{ height: 50, justifyContent: 'center' }}>
												<Text> : </Text>
											</View>
											
											<TextInput
												ref = { (c) => this._price = c }
												style = {{ flex: 1, height: 50 }}
												keyboardType = 'numeric'
												underlineColorAndroid = '#ececec'
												returnKeyType = 'next'
												onChangeText = { (text) => this.setState({ price: text })}
												onSubmitEditing = { () => this._quantity.focus() }
												placeholder = 'Harga Jual'
												value = { this.state.price == null ? this.state.price : this.state.price.toString() }/>
										</View>

										<View style = {{ flexDirection: 'row' }}>
											<View style = {{ height: 50, justifyContent: 'center' }}>
												<Text> : </Text>
											</View>
											
											<TextInput
												ref = { (c) => this._quantity = c }
												style = {{ flex: 1, height: 50 }}
												keyboardType = 'numeric'
												underlineColorAndroid = '#ececec'
												returnKeyType = 'done'
												onChangeText = { (text) => this.setState({ quantity: text })}
												onSubmitEditing = { this.state.idProduct == null ? this._addProduct.bind(this) : this._updateProduct.bind(this) }
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

								{this.state.idProduct == null ?
									<Button
										onPress = { this._addProduct.bind(this) }
										name = 'Tambah'/>
									:
									<Button
										onPress = { this._updateProduct.bind(this) }
										name = 'Ubah'/>
								}
							</View>
						</View>
					</View>
				</MyModal>

				{/*
				*
				add sub-product
				*
				*/}
				<MyModal
					visible = { this.props.barcode == null ? this.state.subProductModal : true }
					top = {0.5}
					left = {0.5}
					contentStyle = {{ flex: 3 }}
					onRequestClose = { this._setSubProductModal.bind(this, false) }>
					<View style = {{ flex: 1, width: width - 20, height: height - 100, padding: 5, borderRadius: 5, backgroundColor: 'white' }}>
						<View style = { styles.content }>
							<View style = {{ padding: 5, alignItems: 'center', justifyContent: 'center' }}>
								{this.state.idSubProduct == null ?
									<Text style = {{ fontWeight: 'bold' }}> Tambah Sub-Produk </Text>
									:
									<Text style = {{ fontWeight: 'bold' }}> Ubah Sub-Produk </Text>
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
												underlineColorAndroid = '#ececec'
										onChangeText = { (text) => this.props.barcode == null ? this.setState({ barcode: text }) : this.setState({ barcode: this.props.barcode })}
										onSubmitEditing = { () => this._product.focus() }
										placeholder = 'Barcode'
										value = { this.props.barcode == null ? this.state.barcode : this.props.barcode }/>
								</View>
							</View>

							<ScrollView
								style = {{ flex: 3,width:'90%',marginLeft:'5%',marginRight:'5%' }}
								keyboardShouldPersistTaps = 'always'>
								<View style = {{ flexDirection: 'row' }}>
									<View style = {{ flexDirection: 'column' }}>
										<View style = {{ height: 50, justifyContent: 'center' }}>
											<Text> Sub-Produk </Text>
										</View>
										<View style = {{ height: 50, justifyContent: 'center' }}>
											<Text> Harga Pokok </Text>
										</View>
										<View style = {{ height: 50, justifyContent: 'center' }}>
											<Text> Harga Jual </Text>
										</View>
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
												underlineColorAndroid = '#ececec'
												returnKeyType = 'next'
												onChangeText = { (text) => this.setState({ product: text })}
												onSubmitEditing = { () => this._cost.focus() }
												placeholder = 'Produk'
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
												onSubmitEditing = { () => this._price.focus() }
												placeholder = 'Harga Pokok'
												value = { this.state.cost == null ? this.state.cost : this.state.cost.toString() }/>
										</View>

										<View style = {{ flexDirection: 'row' }}>
											<View style = {{ height: 50, justifyContent: 'center' }}>
												<Text> : </Text>
											</View>
											
											<TextInput
												ref = { (c) => this._price = c }
												style = {{ flex: 1, height: 50 }}
												keyboardType = 'numeric'
												underlineColorAndroid = '#ececec'
												returnKeyType = 'next'
												onChangeText = { (text) => this.setState({ price: text })}
												onSubmitEditing = { () => this._quantity.focus() }
												placeholder = 'Harga Jual'
												value = { this.state.price == null ? this.state.price : this.state.price.toString() }/>
										</View>

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
												onSubmitEditing = { this.state.idSubProduct == null ? this._addSubProduct.bind(this) : this._updateSubProduct.bind(this) }
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
										quantity: null }); this._setSubProductModal(false)}}
									name = 'Batal'/>
								<Text>&nbsp;</Text>

								{this.state.idSubProduct == null ?
									<Button
										onPress = { this._addSubProduct.bind(this) }
										name = 'Tambah'/>
									:
									<Button
										onPress = { this._updateSubProduct.bind(this) }
										name = 'Ubah'/>
								}
							</View>
						</View>
					</View>
				</MyModal>

				{/*
				*
				list product
				*
				*/}
				<ListView
					dataSource = {ds.cloneWithRows(this.props.category[this.props.navigation.state.params.index].product)}
					enableEmptySections = {true}
					renderRow = {(content, section, row) =>
						<View key = { Number(row) }>
							<View
								style = { styles.product }>
								<View style = {{ flex: 1, flexDirection: 'row' }}>
									{/*<Touchable
										onPress = { this._collapse.bind(this, Number(row)) }>*/}
										<View style = {{ flexDirection: 'column' }}>
											<View style = {{ flexDirection: 'row' }}>
												<Text> {Number(row) + 1}. </Text>

												<View style = {{ flexDirection: 'column' }}>
													<Text> {content.name} </Text>
													
													<View style = {{ flexDirection: 'row' }}>
														<View style = {{ flexDirection: 'column' }}>
															<Text> Stok </Text>
															<Text> Harga Pokok </Text>
															<Text> Harga Jual </Text>
														</View>

														<View style = {{ flexDirection: 'column' }}>
															<Text> : {content.quantity} </Text>
															<Text> : {rupiah(content.cost)} </Text>
															<Text style = {{color: content.price <= content.cost ? 'red' : null}}> : {rupiah(content.price)} </Text>
														</View>
													</View>
												</View>
											</View>
										</View>
									{/*</Touchable>*/}
								</View>

								<ButtonIcons
									style = {{ width: 40, height: 40 }}
									onPress = { this.__updateProduct.bind(this, content) }
									name = 'md-create'
									color = 'grey'
									size = { 20 }/>

								<ButtonIcons
									style = {{ width: 40, height: 40 }}
									onPress = { this._deleteProduct.bind(this, content) }
									name = 'md-close'
									color = 'grey'
									size = { 20 }/>

								<ButtonIcons
									style = {{ width: 40, height: 40 }}
									onPress = { this._collapse.bind(this, Number(row)) }
									name = { this.state.view[Number(row)] ? 'ios-arrow-up' : 'ios-arrow-down' }
									color = 'grey'
									size = { 20 }/>
							</View>

							{this.state.view[Number(row)] ?
								content.subProduct == undefined || content.subProduct.length == 0 ?
									<View style = {[ styles.product, { flexDirection: 'column', marginLeft: 10, height: 40 }]}>
										<Touchable
											onPress = { this._setSubProductModal.bind(this, true, content.idProduct) }
											style = {{ justifyContent: 'center' }}>
											<Text> Tambah Sub-Produk </Text>
										</Touchable>
									</View>
								:
								<View>
									<ListView
										dataSource = {ds.cloneWithRows(content.subProduct)}
										enableEmptySections = {true}
										renderRow = {(subProduct, section, subRow) =>
											<View
												style = {[ styles.product, { flexDirection: 'row', marginLeft: 10 }]}>
												<View style = {{ flex: 1, flexDirection: 'row' }}>
													<Text> {Number(subRow) + 1}. </Text>

													<View style = {{ flexDirection: 'column' }}>
														<Text> {subProduct.name} </Text>

														<View style = {{ flexDirection: 'row' }}>
															<View style = {{ flexDirection: 'column' }}>
																<Text> Stok </Text>
																<Text> Harga Pokok </Text>
																<Text> Harga Jual </Text>
															</View>

															<View style = {{ flexDirection: 'column' }}>
																<Text> : {subProduct.quantity} </Text>
																<Text> : {rupiah(subProduct.cost)} </Text>
																<Text> : {rupiah(subProduct.price)} </Text>
															</View>
														</View>
													</View>
												</View>

												<ButtonIcons
													style = {{ width: 40, height: 40 }}
													onPress = { this.__updateSubProduct.bind(this, subProduct, content.idProduct) }
													name = 'md-create'
													color = 'grey'
													size = { 20 }/>

												<ButtonIcons
													style = {{ width: 40, height: 40 }}
													onPress = { this._deleteSubProduct.bind(this, subProduct, content.idProduct) }
													name = 'md-close'
													color = 'grey'
													size = { 20 }/>
											</View>
									}/>

									<View style = {[ styles.product, { flexDirection: 'column', marginLeft: 10, height: 40 }]}>
										<Touchable
											onPress = { this._setSubProductModal.bind(this, true, content.idProduct) }
											style = {{ justifyContent: 'center' }}>
											<Text> Tambah Sub-Produk </Text>
										</Touchable>
									</View>
								</View>
								:
								null
							}
						</View>
				}/>
				{
				// <ScrollView style = {{ flex: 1 }}>
				// 	{this.props.category[this.props.navigation.state.params.index].product.map((content, index) => {
				// 		return (
				// 			<View key = { index }>
				// 				<View
				// 					style = { styles.product }>
				// 					<View style = {{ flex: 1, flexDirection: 'row' }}>
				// 						<Touchable
				// 							onPress = { this._collapse.bind(this, index) }>
				// 							<View style = {{ flexDirection: 'column' }}>
				// 								<View style = {{ flexDirection: 'row' }}>
				// 									<Text> {index + 1}. </Text>

				// 									<View style = {{ flexDirection: 'column' }}>
				// 										<Text> {content.name} </Text>
														
				// 										<View style = {{ flexDirection: 'row' }}>
				// 											<View style = {{ flexDirection: 'column' }}>
				// 												<Text> Stok </Text>
				// 												<Text> Biaya </Text>
				// 												<Text> Harga </Text>
				// 											</View>

				// 											<View style = {{ flexDirection: 'column' }}>
				// 												<Text> : {content.quantity} </Text>
				// 												<Text> : {rupiah(content.cost)} </Text>
				// 												<Text> : {rupiah(content.price)} </Text>
				// 											</View>
				// 										</View>
				// 									</View>
				// 								</View>

				// 							</View>
				// 						</Touchable>
				// 					</View>

				// 					<ButtonIcons
				// 						style = {{ width: 40, height: 40 }}
				// 						onPress = { this.__updateProduct.bind(this, content) }
				// 						name = 'md-create'
				// 						color = 'grey'
				// 						size = { 20 }/>

				// 					<ButtonIcons
				// 						style = {{ width: 40, height: 40 }}
				// 						onPress = { this._deleteProduct.bind(this, content) }
				// 						name = 'md-close'
				// 						color = 'grey'
				// 						size = { 20 }/>

				// 					{/*<View style = {{ width: 40, height: 40 }}>
				// 						<Touchable
				// 							style = {{ alignItems: 'center', justifyContent: 'center' }}
				// 							onPress = { this.__updateProduct.bind(this, content) }>
				// 							<Ionicons
				// 								name = 'md-create'
				// 								size = { 20 }
				// 								color = 'grey'/>
				// 						</Touchable>
				// 					</View>

				// 					<View style = {{ width: 40, height: 40 }}>
				// 						<Touchable
				// 							style = {{ alignItems: 'center', justifyContent: 'center' }}
				// 							onPress = { this._deleteProduct.bind(this, content) }>
				// 							<Ionicons
				// 								name = 'md-close'
				// 								size = { 20 }
				// 								color = 'grey'/>
				// 						</Touchable>
				// 					</View>*/}
				// 				</View>

				// 				{this.state.view[index] ?
				// 					content.subProduct == undefined || content.subProduct.length == 0 ?
				// 						<View style = {[ styles.product, { flexDirection: 'column', marginLeft: 10, height: 40 }]}>
				// 							<Touchable
				// 								onPress = { this._setSubProductModal.bind(this, true, content.idProduct) }
				// 								style = {{ justifyContent: 'center' }}>
				// 								<Text> Tambah Sub-Produk </Text>
				// 							</Touchable>
				// 						</View>
				// 					:
				// 					<View>
				// 						{content.subProduct.map((subProduct, index) => {
				// 							return (
				// 								<View
				// 									key = {index}
				// 									style = {[ styles.product, { flexDirection: 'row', marginLeft: 10 }]}>
				// 									<View style = {{ flex: 1, flexDirection: 'row' }}>
				// 										<Text> {index + 1}. </Text>

				// 										<View style = {{ flexDirection: 'column' }}>
				// 											<Text> {subProduct.name} </Text>

				// 											<View style = {{ flexDirection: 'row' }}>
				// 												<View style = {{ flexDirection: 'column' }}>
				// 													<Text> Stok </Text>
				// 													<Text> Biaya </Text>
				// 													<Text> Harga </Text>
				// 												</View>

				// 												<View style = {{ flexDirection: 'column' }}>
				// 													<Text> : {subProduct.quantity} </Text>
				// 													<Text> : {rupiah(subProduct.cost)} </Text>
				// 													<Text> : {rupiah(subProduct.price)} </Text>
				// 												</View>
				// 											</View>
				// 										</View>
				// 									</View>

				// 									<ButtonIcons
				// 										style = {{ width: 40, height: 40 }}
				// 										onPress = { this.__updateSubProduct.bind(this, subProduct, content.idProduct) }
				// 										name = 'md-create'
				// 										color = 'grey'
				// 										size = { 20 }/>

				// 									<ButtonIcons
				// 										style = {{ width: 40, height: 40 }}
				// 										onPress = { this._deleteSubProduct.bind(this, subProduct, content.idProduct) }
				// 										name = 'md-close'
				// 										color = 'grey'
				// 										size = { 20 }/>
				// 								</View>
				// 							)
				// 						})}

				// 						<View style = {[ styles.product, { flexDirection: 'column', marginLeft: 10, height: 40 }]}>
				// 							<Touchable
				// 								onPress = { this._setSubProductModal.bind(this, true, content.idProduct) }
				// 								style = {{ justifyContent: 'center' }}>
				// 								<Text> Tambah Sub-Produk </Text>
				// 							</Touchable>
				// 						</View>
				// 					</View>
				// 					:
				// 					null
				// 				}
				// 			</View>
				// 		)

				// 	})}
				// </ScrollView>
				}

				<View style = {{height: 45 }}/>

				{this.state.keyboard ?
					null
					:
					<View style = { styles.stickyBottom }>
						<Button
							onPress = { this._setModalVisible.bind(this, true) }
							name = 'Tambah Produk'/>
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
				idProduct: null,
				barcode: null,
				product: null,
				cost: null,
				price: null,
				quantity: null
			})
		}
	}

	_setSubProductModal(visible, idProduct) {
		this.setState({
			subProductModal: visible,
			idProduct: idProduct
		})
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
		flex: 1,
		padding: 5,
		backgroundColor: 'white'
	},
	content: {
		flex: 1,
		justifyContent: 'center'
	},
	row: {
		flexDirection: 'row',
		// width:'90%',
		// marginLeft:'5%',
		// marginRight:'5%'
	},
	stickyBottom: {
		position: 'absolute',
		left: 5,
		right: 5,
		bottom: 5
	},
	product: {
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
		barcode: state.category.barcode,
		category: state.category.data,
		profile: state.user.data
	}
}

function mapDispatchToProps (dispatch) {
	return {
		dispatchAddProduct: (data) => dispatch(addProduct(data)),
		dispatchUpdateProduct: (data) => dispatch(updateProduct(data)),
		dispatchDeleteProduct: (data) => dispatch(deleteProduct(data)),
		dispatchAddSubProduct: (data) => dispatch(addSubProduct(data)),
		dispatchUpdateSubProduct: (data) => dispatch(updateSubProduct(data)),
		dispatchDeleteSubProduct: (data) => dispatch(deleteSubProduct(data)),
		dispatchBarcodeProduct: (data) => dispatch(barcodeProduct(data))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductScreen)