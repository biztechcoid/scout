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

import {
	Button,
	ButtonIcons,
	MyModal,
	Touchable
} from '../../components'

import { connect } from 'react-redux'
import {
	addProduct,
	updateProduct,
	deleteProduct,
	barcodeProduct
} from '../../redux/actions'


class CategoryScreen extends React.Component {
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
		barcode: null,
		subProduct: null,
		cost: null,
		price: null,
		quantity: null
	}

	_scanQR() {
		if(this.state.modalVisible) {
			this._setModalVisible(false)
		}
		this.props.navigation.navigate('ScanQR', { type: 'barcodeProduct' })
	}

	_addProduct() {
		if(this.state.barcode == '' || this.state.barcode == null) {
			Alert.alert(null, 'barcode product tidak valid')
		} else if(this.state.product == '' || this.state.product == null) {
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
		if(this.state.barcode == '' || this.state.barcode == null) {
			Alert.alert(null, 'barcode product tidak valid')
		} else if(this.state.product == '' || this.state.product == null) {
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
										onChangeText = { (text) => this.props.barcode == null ? this.setState({ barcode: text }) : this.setState({ barcode: this.props.barcode })}
										onSubmitEditing = { () => this._product.focus() }
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
											<Text> Biaya </Text>
										</View>
										<View style = {{ height: 50, justifyContent: 'center' }}>
											<Text> Harga </Text>
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
												placeholder = 'Biaya'
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
												placeholder = 'Harga'
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
							{this.state.idSubProduct == null ?
								<Text> Add Sub-Product </Text>
								:
								<Text> Edit Sub-Product </Text>
							}

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
								<TextInput
									ref = { (c) => this._product = c }
									autoCapitalize = 'words'
									returnKeyType = 'next'
									onChangeText = { (text) => this.setState({ product: text })}
									onSubmitEditing = { () => this._cost.focus() }
									placeholder = 'product'
									value = {this.state.product}/>

								<TextInput
									ref = { (c) => this._cost = c }
									keyboardType = 'numeric'
									returnKeyType = 'next'
									onChangeText = { (text) => this.setState({ cost: text })}
									onSubmitEditing = { () => this._price.focus() }
									placeholder = 'cost'
									value = { this.state.cost == null ? this.state.cost : this.state.cost.toString() }/>

								<TextInput
									ref = { (c) => this._price = c }
									keyboardType = 'numeric'
									returnKeyType = 'next'
									onChangeText = { (text) => this.setState({ price: text })}
									onSubmitEditing = { () => this._quantity.focus() }
									placeholder = 'price'
									value = { this.state.price == null ? this.state.price : this.state.price.toString() }/>

								<TextInput
									ref = { (c) => this._quantity = c }
									keyboardType = 'numeric'
									returnKeyType = 'done'
									onChangeText = { (text) => this.setState({ quantity: text })}
									onSubmitEditing = { this.state.idProduct == null ? this._addProduct.bind(this) : this._updateProduct.bind(this) }
									placeholder = 'quantity'
									value = { this.state.quantity == null ? this.state.quantity : this.state.quantity.toString() }/>
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
									name = 'Clear'/>

								{this.state.idSubProduct == null ?
									<Button
										onPress = { this._addProduct.bind(this) }
										name = 'Add'/>
									:
									<Button
										onPress = { this._updateProduct.bind(this) }
										name = 'Edit'/>
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
					{this.props.category[this.props.navigation.state.params.index].product.map((content, index) => {
						return (
							<View key = { index }>
								<View
									style = { styles.product }>
									<View style = {{ flex: 1, flexDirection: 'row' }}>
										<Touchable onPress = { this._collapse.bind(this, index) }>
											<Text> {index + 1}. </Text>

											<View style = {{ flexDirection: 'column' }}>
												<Text> {content.name} </Text>

												<View style = {{ flexDirection: 'row' }}>
													<View style = {{ flexDirection: 'column' }}>
														<Text> qty </Text>
														<Text> cost </Text>
														<Text> price </Text>
													</View>

													<View style = {{ flexDirection: 'column' }}>
														<Text> : {content.quantity} </Text>
														<Text> : {content.cost} </Text>
														<Text> : {content.price} </Text>
													</View>
												</View>
											</View>
										</Touchable>
									</View>

									<View style = {{ width: 40, height: 40 }}>
										<Touchable
											style = {{ alignItems: 'center', justifyContent: 'center' }}
											onPress = { this.__updateProduct.bind(this, content) }>
											<Text> E </Text>
										</Touchable>
									</View>

									<View style = {{ width: 40, height: 40 }}>
										<Touchable
											style = {{ alignItems: 'center', justifyContent: 'center' }}
											onPress = { this._deleteProduct.bind(this, content) }>
											<Text> X </Text>
										</Touchable>
									</View>
								</View>

								{this.state.view[index] ?
									content.subProduct == undefined ?
										<View style = {[ styles.product, { flexDirection: 'column', marginLeft: 10 }]}>
											<Touchable onPress = { this._setSubProductModal.bind(this, true) }>
												<Text> add </Text>
												<Text> ... </Text>
											</Touchable>
										</View>
									:
									content.subProduct.map((subProduct, index) => {
										return (
											<View style = {[ styles.product, { flexDirection: 'column', marginLeft: 10 }]}>
												<Touchable onPress = { this._setSubProductModal.bind(this, true) }>
													<Text> add </Text>
													<Text> ... </Text>
												</Touchable>
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

	_setSubProductModal(visible) {
		this.setState({
			subProductModal: visible
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
		flexDirection: 'row'
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
		padding: 5,
		marginTop: 2.5,
		marginBottom: 2.5,
		borderRadius: 5,
		borderWidth: 0.5,
		borderColor: 'darkgrey',
		backgroundColor: '#ccc'
	}
})


function mapStateToProps (state) {
	return {
		barcode: state.category.barcode,
		category: state.category.data
	}
}

function mapDispatchToProps (dispatch) {
	return {
		dispatchAddProduct: (data) => dispatch(addProduct(data)),
		dispatchUpdateProduct: (data) => dispatch(updateProduct(data)),
		dispatchDeleteProduct: (data) => dispatch(deleteProduct(data)),
		dispatchBarcodeProduct: (data) => dispatch(barcodeProduct(data))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CategoryScreen)