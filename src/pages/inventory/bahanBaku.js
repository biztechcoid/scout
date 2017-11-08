import React from 'react'
import {
	Alert,
	AsyncStorage,
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
	rupiah
} from '../../modules'


class BahanBakuScreen extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Bahan Baku'
	})

	state = {
		keyboard: false,
		modalVisible: false,

		idIngredients: null,
		barcode: null,
		product: null,
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

	/*
	*
	bahan baku
	*
	*/
	_addIngredients() {
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
				barcode: this.state.barcode,
				name: this.state.product,
				cost: Number(this.state.cost),
				price: Number(this.state.price),
				quantity: Number(this.state.quantity)
			}
			this._setModalVisible(false)
			this.props.dispatchAddIngredients(data)
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
				idIngredients: this.state.idIngredients,
				barcode: this.state.barcode,
				name: this.state.product,
				cost: this.state.cost,
				price: this.state.price,
				quantity: this.state.quantity
			}
			this._setModalVisible(false)
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
		}
	}

	_deleteIngredients(content) {
		var data = {
			idIngredients: content.idIngredients
		}
		Alert.alert(null, 'Anda yakin akan menghapus product '+ content.name,
			[
				{ text: 'Yakin', onPress: () => this.props.dispatchDeleteIngredients(data) },
				{ text: 'Batal' }
			])
	}
	/**/

	_pushIngredients(ingredients) {
		var category = this.props.category[this.props.navigation.state.params.idxCategory]
		var product = category.product[this.props.navigation.state.params.idxProduct]
		var data = {
			idCategory: category.idCategory,
			idProduct: product.idProduct,
			ingredients: ingredients
		}

		if(product.ingredients.length === 0) {
			return this.props.dispatchPushIngredients(data), this.props.navigation.goBack()
		} else {
			for(var i in product.ingredients) {
				if(product.ingredients[i].idIngredients === ingredients.idIngredients) {
					return Alert.alert(null, ingredients.name + ' sudah ada di bahan baku')
				}
			}
			return this.props.dispatchPushIngredients(data), this.props.navigation.goBack()
		}
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

	render() {
		return(
			<View style = { styles.container }>
				<MyModal
					top = {0.5}
					left = {0.5}
					contentStyle = {{ flex: 3 }}
					visible = { this.state.modalVisible }
					onRequestClose = { this._setModalVisible.bind(this, false) }>
					<View style = {{ flex: 1, width: width - 20, height: height - 100, padding: 5, borderRadius: 5, backgroundColor: 'white' }}>
						<View style = { styles.content }>
							<View style = {{ padding: 5, alignItems: 'center', justifyContent: 'center' }}>
								{this.state.idIngredients == null ?
									<Text style = {{ fontWeight: 'bold' }}> Tambah Bahan Baku </Text>
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
									onPress = { () => this.setState({ idProduct: null,
										barcode: null,
										product: null,
										cost: null,
										price: null,
										quantity: null })}
									name = 'Hapus'/>

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
												<Text> Biaya </Text>
												<Text> Harga </Text>
											</View>

											<View style = {{ flexDirection: 'column' }}>
												<Text> : {content.quantity} </Text>
												<Text> : {rupiah(content.cost)} </Text>
												<Text> : {rupiah(content.price)} </Text>
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
	bahanBaku: {
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
		category: state.category.data,
		ingredients: state.category.ingredients
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