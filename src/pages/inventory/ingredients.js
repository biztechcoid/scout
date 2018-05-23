import React from 'react'
import {
	Alert,
	Dimensions,
	Keyboard,
	Modal,
	View,
	ScrollView,
	StyleSheet,
	Text,
	TextInput
} from 'react-native'
const { width, height } = Dimensions.get('window')
// import Ionicons from 'react-native-vector-icons/Ionicons'

import {
	Button,
	ButtonIcons,
	MyModal,
	Touchable
} from '../../components'

import{
	rupiah
} from '../../modules'

import { connect } from 'react-redux'
import {
	addProduct,
	updateProduct,
	deleteProduct,
	addSubProduct,
	updateSubProduct,
	deleteSubProduct,
	spliceIngredients,
	barcodeProduct
} from '../../redux/actions'


class IngredientsScreen extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'BAHAN BAKU'
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

		viewCategory: [],
		viewProduct: [],
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
				barcode: this.state.barcode,
				name: this.state.product,
				cost: Number(this.state.cost),
				price: Number(this.state.price),
				quantity: Number(this.state.quantity)
			}
			this._setModalVisible(false)
			this.props.dispatchAddProduct(data)
			this.props.dispatchBarcodeProduct(null)
			this.setState({
				barcode: null,
				product: null,
				cost: null,
				price: null,
				quantity: null
			})
		}
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
			this._setModalVisible(false)
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
		}
	}

	_deleteProduct(content) {
		var data = {
			idCategory: this.props.navigation.state.params.content.idCategory,
			idProduct: content.idProduct
		}
		Alert.alert(null, 'Anda yakin akan menghapus product '+ content.name,
			[
				{ text: 'Yakin', onPress: () => this.props.dispatchDeleteProduct(data) },
				{ text: 'Batal' }
			])
	}
	/**/

	/*
	*
	sub product
	*
	*/
	_addSubProduct() {
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
				cost: Number(this.state.cost),
				price: Number(this.state.price),
				quantity: Number(this.state.quantity)
			}
			this._setSubProductModal(false)
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
		}
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
			this._setSubProductModal(false)
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
		}
	}

	_deleteSubProduct(content, idProduct) {
		var data = {
			idCategory: this.props.navigation.state.params.content.idCategory,
			idProduct: idProduct,
			idSubProduct: content.idSubProduct
		}
		Alert.alert(null, 'Anda yakin akan menghapus sub-product '+ content.name,
			[
				{ text: 'Yakin', onPress: () => this.props.dispatchDeleteSubProduct(data) },
				{ text: 'Batal' }
			])
	}
	/**/

	_spliceIngredients(idCategory, idProduct, ingredients) {
		var data = {
			idCategory: idCategory,
			idProduct: idProduct,
			idIngredients: ingredients.idIngredients
		}
		Alert.alert(null, 'Anda yakin akan menghapus bahan baku ' + ingredients.name,
			[
				{ text: 'Yakin', onPress: () => this.props.dispatchSpliceIngredients(data) },
				{ text: 'Batal' }
			])
	}

	_collapse(idx, value) {
		const stateCopy = this.state

		switch(value) {
			case 'category':
				stateCopy.viewCategory[idx] = !stateCopy.viewCategory[idx]
				return this.setState(stateCopy)

			case 'product':
				stateCopy.viewProduct[idx] = !stateCopy.viewProduct[idx]
				return this.setState(stateCopy)

			default:
				return this.setState(stateCopy)
		}
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
					top = {0.5}
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
										returnKeyType = 'next'
										underlineColorAndroid = '#ececec'
										onChangeText = { (text) => this.props.barcode == null ? this.setState({ barcode: text }) : this.setState({ barcode: this.props.barcode })}
										onSubmitEditing = { () => this._product.focus() }
										placeholder = 'Barcode'
										value = { this.props.barcode == null ? this.state.barcode : this.props.barcode }/>
								</View>
							</View>

							<ScrollView
								style = {{ flex: 3, width:'90%', marginLeft:'5%', marginRight:'5%' }}
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
									onPress = { () => this.setState({ idProduct: null,
										barcode: null,
										product: null,
										cost: null,
										price: null,
										quantity: null })}
									name = 'Hapus'/>

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
									<Text style = {{ fontWeight: 'bold' }}> Bahan Baku </Text>
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
										onChangeText = { (text) => this.props.barcode == null ? this.setState({ barcode: text }) : this.setState({ barcode: this.props.barcode })}
										onSubmitEditing = { () => this._product.focus() }
										placeholder = 'barcode'
										value = { this.props.barcode == null ? this.state.barcode : this.props.barcode }/>
								</View>
							</View>

							<ScrollView
								style = {{ flex: 3 }}
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
									onPress = { () => this.setState({ idProduct: null,
										barcode: null,
										product: null,
										cost: null,
										price: null,
										quantity: null })}
									name = 'Hapus'/>

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
				<ScrollView style = {{ flex: 1 }}>
					{this.props.category.map((category, idxCategory) => {
						return (
							<View key = { idxCategory }>
								<View style = {[ styles.product, { height: 60 }]}>
									{/*<Touchable
										style = {{ justifyContent: 'center' }}
										onPress = { this._collapse.bind(this, idxCategory, 'category') }>*/}
										<View style = {{flex: 1, justifyContent: 'center'}}>
										<View style = {{ flexDirection: 'row' }}>
											<Text> {idxCategory + 1}. </Text>

											<View style = {{ flexDirection: 'column' }}>
												<Text> {category.name} </Text>
											</View>
										</View>
										</View>
									{/*</Touchable>*/}

									<ButtonIcons
										style = {{ width: 40, height: 40 }}
										onPress = { this._collapse.bind(this, idxCategory, 'category') }
										name = { this.state.viewCategory[idxCategory] ? 'ios-arrow-up' : 'ios-arrow-down' }
										color = 'grey'
										size = { 20 }/>
								</View>

								{this.state.viewCategory[idxCategory] ?
									category.product.map((product, idxProduct) => {
										return (
											<View key = { idxProduct }>
												<View
													style = {[ styles.product, {marginLeft: 10 }]}>
													<View style = {{ flex: 1, flexDirection: 'row' }}>
														{/*<Touchable
															onPress = { this._collapse.bind(this, idxCategory + idxProduct, 'product') }>*/}
															<View style = {{ flexDirection: 'column' }}>
																<View style = {{ flexDirection: 'row' }}>
																	<Text> {idxProduct + 1}. </Text>

																	<View style = {{ flexDirection: 'column' }}>
																		<Text> {product.name} </Text>
																		
																		<View style = {{ flexDirection: 'row' }}>
																			<View style = {{ flexDirection: 'column' }}>
																				<Text> Stok </Text>
																				<Text> Harga Pokok </Text>
																				<Text> Harga Jual </Text>
																			</View>

																			<View style = {{ flexDirection: 'column' }}>
																				<Text> : {product.quantity} </Text>
																				<Text> : {rupiah(product.cost)} </Text>
																				<Text style = {{color: product.price <= product.cost ? 'red' : null}}> : {rupiah(product.price)} </Text>
																			</View>
																		</View>
																	</View>
																</View>

															</View>
														{/*</Touchable>*/}
													</View>

													<ButtonIcons
														style = {{ width: 40, height: 40 }}
														onPress = { this._collapse.bind(this, idxCategory + idxProduct, 'product') }
														name = { this.state.viewProduct[idxCategory + idxProduct] ? 'ios-arrow-up' : 'ios-arrow-down' }
														color = 'grey'
														size = { 20 }/>

													{/*<ButtonIcons
														style = {{ width: 40, height: 40 }}
														onPress = { this.__updateProduct.bind(this, product) }
														name = 'md-create'
														color = 'grey'
														size = { 20 }/>*/}

													{/*<ButtonIcons
														style = {{ width: 40, height: 40 }}
														onPress = { this._deleteProduct.bind(this, product) }
														name = 'md-close'
														color = 'grey'
														size = { 20 }/>*/}
												</View>

												{this.state.viewProduct[idxCategory + idxProduct] ?
													product.ingredients == undefined || product.ingredients.length == 0 ?
														<View style = {[ styles.product, { flexDirection: 'column', marginLeft: 20, height: 40 }]}>
															<Touchable
																onPress = { () => this.props.navigation.navigate('BahanBaku', {idxCategory: idxCategory, idxProduct: idxProduct}) }
																style = {{ justifyContent: 'center' }}>
																<Text> Bahan Baku </Text>
															</Touchable>
														</View>
													:
													<View>
														{product.ingredients.map((ingredients, index) => {
															return (
																<View
																	key = {index}
																	style = {{flex: 1}}>
																	{this.props.ingredients.map((content, id) => {
																		if(ingredients.idIngredients === content.idIngredients) {
																			return (
																				<View
																					key = {id}
																					style = {[ styles.product, { flexDirection: 'row', marginLeft: 20 }]}>
																					<View style = {{ flex: 1, flexDirection: 'row' }}>
																						<Text> {index + 1}. </Text>

																						<View style = {{ flexDirection: 'column' }}>
																							<Text> {content.name} </Text>

																							<View style = {{ flexDirection: 'row' }}>
																								<View style = {{ flexDirection: 'column' }}>
																									<Text> Stok </Text>
																									<Text> Harga Pokok </Text>
																									<Text> Kuantitas </Text>
																								</View>

																								<View style = {{ flexDirection: 'column' }}>
																									<Text> : {content.quantity} </Text>
																									<Text> : {rupiah(content.cost)} </Text>
																									<Text> : {ingredients.qty} </Text>
																								</View>
																							</View>
																						</View>
																					</View>

																					{/*<ButtonIcons
																						style = {{ width: 40, height: 40 }}
																						onPress = { this.__updateSubProduct.bind(this, content, product.idProduct) }
																						name = 'md-create'
																						color = 'grey'
																						size = { 20 }/>*/}

																					<ButtonIcons
																						style = {{ width: 40, height: 40 }}
																						onPress = { this._spliceIngredients.bind(this, category.idCategory, product.idProduct, content) }
																						name = 'md-close'
																						color = 'grey'
																						size = { 20 }/>
																				</View>
																			)
																		}
																	})}
																</View>
															)
														})}

														<View style = {[ styles.product, { flexDirection: 'column', marginLeft: 20, height: 40 }]}>
															<Touchable
																onPress = { () => this.props.navigation.navigate('BahanBaku', {idxCategory: idxCategory, idxProduct: idxProduct}) }
																style = {{ justifyContent: 'center' }}>
																<Text> Tambah Bahan Baku </Text>
															</Touchable>
														</View>
													</View>
													:
													null
												}
											</View>
										)
									})
									:
									null
								}
							</View>
						)
					})}
				</ScrollView>
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
		width:'90%',
		marginLeft:'5%',
		marginRight:'5%'
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
		ingredients: state.category.ingredients
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
		dispatchSpliceIngredients: (data) => dispatch(spliceIngredients(data)),
		dispatchBarcodeProduct: (data) => dispatch(barcodeProduct(data))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(IngredientsScreen)