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
import { addProduct, deleteProduct } from '../../redux/actions'


class CategoryScreen extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: `Category ${ navigation.state.params.content.category }`
	})

	state = {
		keyboard: false,
		modalVisible: false,

		product: null
	}

	_scanQR() {
		if(this.state.modalVisible) {
			this._setModalVisible(false)
		}
		this.props.navigation.navigate('ScanQR', { type: 'addProduct' })
	}

	_addProduct() {
		this._setModalVisible(false)
		this.props.dispatchAddProduct({ category: this.props.category[this.props.navigation.state.params.index].category, product: this.state.product })
		this.setState({ product: null })
	}

	_deleteProduct(content, index) {
		Alert.alert(null, 'Anda yakin akan menghapus product '+ content.name,
			[
				{ text: 'Yakin', onPress: () => this.props.dispatchDeleteProduct({idCategory: this.props.navigation.state.params.index, idProduct: index}) },
				{ text: 'Batal' }
			])
	}

	render() {
		return(
			<View style = { styles.container }>
				<MyModal
					visible = { this.state.modalVisible }
					onRequestClose = { this._setModalVisible.bind(this, false) }>
					<View style = {{ flex: 1, width: width - 20, height: height / 4, padding: 5, borderRadius: 5, backgroundColor: 'white' }}>
						<View style = { styles.content }>
							<View style = { styles.row }>
								<View style = {{ flex: 0.5 }}>
									<Button
										onPress = { this._scanQR.bind(this) }
										name = 'Scan' />
								</View>

								<View style = {{ flex: 2 }}>
									<TextInput
										autoCapitalize = 'words'
										returnKeyType = 'done'
										onChangeText = { (text) => this.setState({ product: text })}
										onSubmitEditing = { this._addProduct.bind(this) }
										placeholder = 'product'
										value = {this.state.product}/>
								</View>
							</View>
						</View>
						
						<View style = { styles.content }>
							<View style = { styles.row }>
								<Button
									onPress = { () => this.setState({ product: null })}
									name = 'Clear'/>

								<Button
									onPress = { this._addProduct.bind(this) }
									name = 'Add'/>
							</View>
						</View>
					</View>
				</MyModal>

				<View style = { styles.row }>
					<View style = {{ flex: 0.5 }}>
						<Button
							onPress = { this._scanQR.bind(this) }
							name = 'Scan' />
					</View>

					<View style = {{ flex: 2 }}>
						<TextInput />
					</View>
				</View>

				<ScrollView style = {{ flex: 1 }}>
					{this.props.category[this.props.navigation.state.params.index].product.map((content, index) => {
						return (
							<View
								key = { index }
								style = { styles.product }>
								<View style = {{ flex: 1, flexDirection: 'row' }}>
									<Text> {index + 1}. </Text>
									<Text> {content.name} </Text>
								</View>

								<Touchable
									style = {{ width: 20, height: 20, alignItems: 'center', justifyContent: 'center' }}
									onPress = { this._deleteProduct.bind(this, content, index) }>
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
		category: state.category.data
	}
}

function mapDispatchToProps (dispatch) {
	return {
		dispatchAddProduct: (data) => dispatch(addProduct(data)),
		dispatchDeleteProduct: (data) => dispatch(deleteProduct(data))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CategoryScreen)