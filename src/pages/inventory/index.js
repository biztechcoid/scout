import React from 'react'
import {
	Alert,
	AsyncStorage,
	Dimensions,
	Keyboard,
	ListView,
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


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

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
		),
		headerRight: (
			<View style = {{ width: 20, height: 20, borderRadius: 10, borderWidth: 0.5, borderColor: '#ccc', marginRight: 10, backgroundColor: navigation.state.params ? navigation.state.params.connection ? 'green' : 'red' : 'red' }}/>
		)
	})

	state = {
		keyboard: false,
		modalVisible: false,

		idCategory: null,
		category: null,

		connection: null
	}

	_addCategory() {
		if(this.state.connection) {
			if(this.state.category == '' || this.state.category == null) {
				Alert.alert(null, 'nama category tidak valid')
			} else {
				var data = {
					idCabang: this.props.profile.idCabang,
					name: this.state.category
				}
				this._setModalVisible(false)
				this.props.dispatchAddCategory(data)
				this.setState({
					category: null
				})
			}
		} else {
			Alert.alert(null, 'koneksi internet bermasalah')
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
		if(this.state.connection) {
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
		} else {
			Alert.alert(null, 'koneksi internet bermasalah')
		}
	}

	_deleteCategory(content) {
		if(this.state.connection) {
			var data = {
				idCategory: content.idCategory
			}
			Alert.alert(null, 'Anda yakin akan menghapus kategori '+ content.name,
				[
					{ text: 'Yakin', onPress: () => this.props.dispatchDeleteCategory(data) },
					{ text: 'Batal' }
				])
		} else {
			Alert.alert(null, 'koneksi internet bermasalah')
		}
	}

	render() {
		return(
			<View style = { styles.container }>
				<MyModal
					top = {this.state.keyboard ? 0 : 0.5}
					left = {0.5}
					visible = { this.state.modalVisible }
					onRequestClose = { this._setModalVisible.bind(this, false) }>
					<View style = {{ flex: 1, width: width - 20, height: height / 4, padding: 15, borderRadius: 5, backgroundColor: 'white' }}>
						<View style = { styles.content }>
							<View style = {{ padding: 5, alignItems: 'center', justifyContent: 'center' }}>
								{this.state.idCategory == null ?
									<Text style = {{ fontWeight: 'bold' }}> Tambah Kategori </Text>
									:
									<Text style = {{ fontWeight: 'bold' }}> Ubah Kategori </Text>
								}
							</View>

							<View style = {{ flex: 2,marginTop:20, }}>
								<TextInput
									autoCapitalize = 'words'
									returnKeyType = 'done'
									underlineColorAndroid = '#ececec'
									onChangeText = { (text) => this.setState({ category: text })}
									onSubmitEditing = { this.state.idCategory == null ? this._addCategory.bind(this) : this._updateCategory.bind(this) }
									placeholder = 'Nama Kategori'
									value = {this.state.category}/>
							</View>
						</View>
						
						<View style = { styles.content }>
							<View style = { styles.stickyBottom }>
								<Button
									color= '#94abb6'
									onPress = { () => this.setState({ category: null })}
									name = 'Hapus'/>
								<Text>&nbsp;</Text>

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

				<ListView
					dataSource = {ds.cloneWithRows(this.props.category)}
					enableEmptySections = {true}
					renderRow = {(content, section, row) =>
					<View>
						{this.props.profile ?
							content.idCabang === this.props.profile.idCabang ?
								<View style = { styles.category }>
									<Touchable
										style = {{ justifyContent: 'center' }}
										onPress = { () => this.props.navigation.navigate('Product', { index: Number(row), content: content }) }>
										<View style = {{ flexDirection: 'row' }}>
											<View style = {{ flexDirection: 'column' }}>
												<Text> {content.name} </Text>
											</View>
										</View>
									</Touchable>

									<ButtonIcons
										style = {{ width: 40, height: 40 }}
										onPress = { this.__updateCategory.bind(this, content) }
										name = 'md-create'
										color = 'grey'
										size = { 20 }/>

									<ButtonIcons
										style = {{ width: 40, height: 40 }}
										onPress = { this._deleteCategory.bind(this, content) }
										name = 'md-close'
										color = 'grey'
										size = { 20 }/>
								</View>
								:
								null
							:
							null
						}
					</View>
				}/>

				{
				// <ScrollView style = {{ flex: 1 }}>
				// 	{this.props.category == null ?
				// 		<View style = {{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				// 			<Text> tidak ada data </Text>
				// 		</View>
				// 		:
				// 		this.props.category.map((content, index) => {
				// 		return (
				// 			<View
				// 				key = { index }
				// 				style = { styles.category }>
				// 				<Touchable
				// 					style = {{ justifyContent: 'center' }}
				// 					onPress = { () => this.props.navigation.navigate('Product', { index: index, content: content }) }>
				// 					<View style = {{ flexDirection: 'row' }}>
				// 						<Text> {index + 1}. </Text>

				// 						<View style = {{ flexDirection: 'column' }}>
				// 							<Text> {content.name} </Text>
				// 						</View>
				// 					</View>
				// 				</Touchable>

				// 				<ButtonIcons
				// 					style = {{ width: 40, height: 40 }}
				// 					onPress = { this.__updateCategory.bind(this, content) }
				// 					name = 'md-create'
				// 					color = 'grey'
				// 					size = { 20 }/>

				// 				<ButtonIcons
				// 					style = {{ width: 40, height: 40 }}
				// 					onPress = { this._deleteCategory.bind(this, content) }
				// 					name = 'md-close'
				// 					color = 'grey'
				// 					size = { 20 }/>

				// 				{/*<View style = {{ width: 40, height: 40 }}>
				// 					<Touchable
				// 						style = {{ justifyContent: 'center', alignItems: 'center'}}
				// 						onPress = { this.__updateCategory.bind(this, content) }>
				// 						<Ionicons
				// 							name = 'md-create'
				// 							size = { 20 }
				// 							color = 'grey'/>
				// 					</Touchable>
				// 				</View>

				// 				<View style = {{ width: 40, height: 40 }}>
				// 					<Touchable
				// 						style = {{ justifyContent: 'center', alignItems: 'center'}}
				// 						onPress = { this._deleteCategory.bind(this, content) }>
				// 						<Ionicons
				// 							name = 'md-close'
				// 							size = { 20 }
				// 							color = 'grey'/>
				// 					</Touchable>
				// 				</View>*/}
				// 			</View>
				// 		)
				// 		})
				// 	}
				// </ScrollView>
				}

				<View style = {{height: 90 }}/>

				{this.state.keyboard ?
					null
					:
					<View style = { styles.stickyBottom }>
						<View style = {{ marginBottom: 5 }}>
							<Button
								onPress = { () => this.props.navigation.navigate('Ingredients') }
								name = 'BAHAN BAKU'/>
						</View>

						<View>
							<Button
								onPress = { this._setModalVisible.bind(this, true) }
								name = 'TAMBAH KATEGORI'/>
						</View>
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

	handleFirstConnectivityChange(isConnected) {
		this.setState({connection: isConnected})

		this.props.navigation.setParams({
			connection: isConnected
		})

		NetInfo.isConnected.removeEventListener(
			'connectionChange',
			this.handleFirstConnectivityChange
		)
	}

	componentWillMount() {
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this))
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this))
	}

	componentDidMount() {
		NetInfo.isConnected.fetch().then(isConnected => {
			this.setState({connection: isConnected})

			this.props.navigation.setParams({
				connection: isConnected
			})
		})
		
		NetInfo.isConnected.addEventListener(
			'connectionChange',
			this.handleFirstConnectivityChange
		)
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
		profile: state.user.data
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