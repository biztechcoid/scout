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

import { connect } from 'react-redux'
import {
	addCategory,
	updateCategory,
	deleteCategory
} from '../../redux/actions'

import {
	Button,
	ButtonIcons,
	MyModal,
	Touchable
} from '../../components'


class InventoryScreen extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		headerStyle: {
			backgroundColor: '#6ecbe0'
		},
		headerLeft: (
			<ButtonIcons
				onPress = { () => { navigation.navigate('DrawerOpen') }}
				name = 'md-menu'
				color = 'white'
				size = { 30 }/>
		)
	})

	state = {
		keyboard: false,
		modalVisible: false,

		idCategory: null,
		category: null
	}

	_addCategory() {
		if(this.state.category == '' || this.state.category == null) {
			Alert.alert(null, 'nama category tidak valid')
		} else {
			var data = {
				name: this.state.category
			}
			this._setModalVisible(false)
			this.props.dispatchAddCategory(data)
			this.setState({
				category: null
			})
		}
	}

	__updateCategory(content) {
		this.setState({
			idCategory: content.idCategory,
			category: content.name
		})
		this._setModalVisible(true)
	}

	_updateCategory() {
		if(this.state.category == '' || this.state.category == null) {
			Alert.alert(null, 'nama category tidak valid')
		} else {
			var data = {
				idCategory: this.state.idCategory,
				name: this.state.category
			}
			this._setModalVisible(false)
			this.props.dispatchUpdateCategory(data)
			this.setState({
				idCategory: null,
				category: null
			})
		}
	}

	_deleteCategory(content) {
		var data = {
			idCategory: content.idCategory
		}
		Alert.alert(null, 'Anda yakin akan menghapus category '+ content.name,
			[
				{ text: 'Yakin', onPress: () => this.props.dispatchDeleteCategory(data) },
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
							<View style = {{ padding: 5, alignItems: 'center', justifyContent: 'center' }}>
								{this.state.idCategory == null ?
									<Text style = {{ fontWeight: 'bold' }}> Tambah Kategori </Text>
									:
									<Text style = {{ fontWeight: 'bold' }}> Ubah Kategori </Text>
								}
							</View>

							<View style = {{ flex: 2 }}>
								<TextInput
									autoCapitalize = 'words'
									returnKeyType = 'done'
									onChangeText = { (text) => this.setState({ category: text })}
									onSubmitEditing = { this.state.idCategory == null ? this._addCategory.bind(this) : this._updateCategory.bind(this) }
									placeholder = 'Kategori'
									value = {this.state.category}/>
							</View>
						</View>
						
						<View style = { styles.content }>
							<View style = { styles.row }>
								<Button
									onPress = { () => this.setState({ category: null })}
									name = 'Hapus'/>

								{this.state.idCategory == null ?
									<Button
										onPress = { this._addCategory.bind(this) }
										name = 'Tambah'/>
									:
									<Button
										onPress = { this._updateCategory.bind(this) }
										name = 'Ubah'/>
								}
							</View>
						</View>
					</View>
				</MyModal>

				<ScrollView style = {{ flex: 1 }}>
					{this.props.category.map((content, index) => {
						return (
							<View
								key = { index }
								style = { styles.category }>
								<Touchable
									style = {{ justifyContent: 'center' }}
									onPress = { () => this.props.navigation.navigate('Category', { index: index, content: content }) }>
									<View style = {{ flexDirection: 'row' }}>
										<Text> {index + 1}. </Text>

										<View style = {{ flexDirection: 'column' }}>
											<Text> {content.name} </Text>
										</View>
									</View>
								</Touchable>

								<View style = {{ width: 40, height: 40 }}>
									<Touchable
										style = {{ justifyContent: 'center', alignItems: 'center'}}
										onPress = { this.__updateCategory.bind(this, content) }>
										<Text> E </Text>
									</Touchable>
								</View>

								<View style = {{ width: 40, height: 40 }}>
									<Touchable
										style = {{ justifyContent: 'center', alignItems: 'center'}}
										onPress = { this._deleteCategory.bind(this, content) }>
										<Text> X </Text>
									</Touchable>
								</View>
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
							name = 'Tambah Kategori'/>
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
				category: null
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
	category: {
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
		dispatchAddCategory: (data) => dispatch(addCategory(data)),
		dispatchUpdateCategory: (data) => dispatch(updateCategory(data)),
		dispatchDeleteCategory: (data) => dispatch(deleteCategory(data))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InventoryScreen)