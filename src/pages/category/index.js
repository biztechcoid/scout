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
		title: `Category ${ navigation.state.params.content.name }`
	})

	state = {
		keyboard: false,
		modalVisible: false,

		idProduct: null,
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
				cost: this.state.cost,
				price: this.state.price,
				quantity: this.state.quantity
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

	render() {
		return(
			<View style = { styles.container }>
				<MyModal
					visible = { this.props.barcode == null ? this.state.modalVisible : true }
					top = {0.5}
					left = {0.5}
					contentStyle = {{ flex: 3 }}
					onRequestClose = { this._setModalVisible.bind(this, false) }>
					<View style = {{ flex: 1, width: width - 20, height: height - 100, padding: 5, borderRadius: 5, backgroundColor: 'white' }}>
						<View style = { styles.content }>
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
									value = {this.state.cost}/>

								<TextInput
									ref = { (c) => this._price = c }
									keyboardType = 'numeric'
									returnKeyType = 'next'
									onChangeText = { (text) => this.setState({ price: text })}
									onSubmitEditing = { () => this._quantity.focus() }
									placeholder = 'price'
									value = {this.state.price}/>

								<TextInput
									ref = { (c) => this._quantity = c }
									keyboardType = 'numeric'
									returnKeyType = 'done'
									onChangeText = { (text) => this.setState({ quantity: text })}
									onSubmitEditing = { this.state.idProduct == null ? this._addProduct.bind(this) : this._updateProduct.bind(this) }
									placeholder = 'quantity'
									value = {this.state.quantity}/>
							</ScrollView>
						</View>
						
						<View style = {{height: 45 }}/>

						<View style = { styles.stickyBottom }>
							<View style = { styles.row }>
								<Button
									onPress = { () => this.setState({ product: null })}
									name = 'Clear'/>

								{this.state.idProduct == null ?
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

				{/*<View style = { styles.row }>
					<View style = {{ flex: 0.5 }}>
						<Button
							onPress = { this._scanQR.bind(this) }
							name = 'Scan' />
					</View>

					<View style = {{ flex: 2 }}>
						<TextInput />
					</View>
				</View>*/}

				<ScrollView style = {{ flex: 1 }}>
					{this.props.category[this.props.navigation.state.params.index].product.map((content, index) => {
						return (
							<View
								key = { index }
								style = { styles.product }>
								<View style = {{ flex: 1, flexDirection: 'row' }}>
									<Text> {index + 1}. </Text>
									<View style = {{ flexDirection: 'column' }}>
										<Text> {content.barcode} </Text>
										<Text> nama : {content.name} </Text>
										<Text> cost : {content.cost} </Text>
										<Text> price: {content.price} </Text>
										<Text> qty  : {content.quantity} </Text>
									</View>
								</View>


								<Touchable
									style = {{ width: 20, height: 20, alignItems: 'center', justifyContent: 'center' }}
									onPress = { this.__updateProduct.bind(this, content) }>
									<Text> E </Text>
								</Touchable>

								<Touchable
									style = {{ width: 20, height: 20, alignItems: 'center', justifyContent: 'center' }}
									onPress = { this._deleteProduct.bind(this, content) }>
									<Text> X </Text>
								</Touchable>
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
							name = 'Add Product'/>
					</View>
				}
			</View>
		)
	}

	_setModalVisible(visible) {
		this.setState({
			modalVisible: visible
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