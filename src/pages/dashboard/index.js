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
	RefreshControl,
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
	deleteCategory,
	localStorageData,
	localStorageSale,
	localStorageUsers,
	updatePenjualan
} from '../../redux/actions'

import {
	Button,
	ButtonIcons,
	Online,
	MyModal,
	Touchable
} from '../../components'

import {
	online,
	server
} from '../../modules'

var menu = [
	{name: 'Persediaan', icon: 'md-cube', pages: 'Inventory', access: 'Persediaan'},
	{name: 'Penjualan', icon: 'md-cash', pages: 'Sale', access: 'Penjualan'},
	{name: 'Pengeluaran', icon: 'md-cart', pages: 'Pengeluaran', access: 'Pengeluaran'},
	{name: 'Perpajakan', icon: 'md-paper', pages: 'Perpajakan', access: 'Perpajakan'},
	{name: 'Laporan', icon: 'ios-list-box-outline', pages: 'Report', access: 'Laporan'},
	{name: 'Pengaturan', icon: 'md-settings', pages: 'ListUsers', access: 'Pengeluaran'},
]


class InventoryScreen extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		headerStyle: {
			backgroundColor: '#6ecbe0'
		},
		headerLeft: (
			<ButtonIcons
				onPress={() => {navigation.navigate('DrawerOpen')}}
				name='md-menu'
				color='white'
				size={30}/>
		),
		headerRight: (
			<Online/>
		)
	})

	state = {
		keyboard: false,
		modalVisible: false,

		idCategory: null,
		category: null,
		refreshing: false
	}

	_addCategory() {
		online(value => {
			if(value) {
				if(this.state.category == '' || this.state.category == null) {
					Alert.alert(null, 'nama category tidak valid')
				} else {
					var data = {
						/*
						*
						offline
						idCabang diganti dengan imei device
						*
						*/
						// idCabang: this.props.profile.idCabang,
						idCabang: this.props.device.imei,
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
		})
	}

	__updateCategory(content) {
		this.setState({
			idCategory: content.idCategory,
			category: content.name
		})
		this._setModalVisible(true)
	}

	_updateCategory() {
		online(value => {
			if(value) {
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
		})
	}

	_deleteCategory(content) {
		online(value => {
			if(value) {
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
		})
	}

	_onRefresh() {
		this.setState({refreshing: true})
		this._updateStock()
	}

	_updateStock() {
		fetch(server + '/sale/updateStockIngredients', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token: this.props.profile.token
			},
			body: JSON.stringify(this.props.ingredients)
		})
		.then(response => response.json())
		.then(res => {
			if(res.headers.statusCode === 200) {
				this._uploadPenjualan()
			}
		})
		.catch(err => console.log(err))
	}

	_uploadPenjualan() {
		if(this.props.sale.length > 0) {
			for(var a in this.props.sale) {
				if(this.props.sale[a].status !== true) {
					fetch(server + '/sale/addPenjualan', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							token: this.props.profile.token
						},
						body: JSON.stringify(this.props.sale[a])
					})
					.then(response => response.json())
					.then(res => {
						if(res.headers.statusCode === 200) {
							this.props.dispatchUpdatePenjualan(res.data)
							return this._getUsers()
						}
					})
					.catch(err => console.log(err))
				}
			}
			return this._getUsers()
		} else {
			return this._getUsers()
		}
	}

	_getUsers() {
		fetch(server + '/users', {
			method: 'GET',
			headers: {
				token: this.props.profile.token
			}
		})
		.then(response => response.json())
		.then(res => {
			if(res.headers.statusCode === 200) {
				this.props.dispatchLocalStorageUsers({users: res.data})
				this._getStore()
			}
		})
		.catch(err => console.log(err))
	}

	_getStore() {
		fetch(server + '/users/store', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				token: this.props.profile.token
			}
		})
		.then(response => response.json())
		.then(res => {
			if(res.headers.statusCode === 200) {
				this.props.dispatchLocalStorageUsers({store: res.data})
				this._getInventory()
			}
		})
		.catch(err => console.log(err))
	}

	_getInventory() {
		fetch(server + '/inventory', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				token: this.props.profile.token
			}
		})
		.then(response => response.json())
		.then(res => {
			if(res.headers.statusCode === 200) {
				this.props.dispatchLocalStorageData({data: res.data})
				this._getIngredients()
			}
		})
		.catch(err => console.log(err))
	}

	_getIngredients() {
		fetch(server + '/inventory/getIngredients', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				token: this.props.profile.token
			}
		})
		.then(response => response.json())
		.then(res => {
			if(res.headers.statusCode === 200) {
				this.props.dispatchLocalStorageData({ingredients: res.data})
				this._getPengeluaran()
			}
		})
		.catch(err => console.log(err))
	}

	_getPengeluaran() {
		fetch(server + '/sale/getPengeluaran', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				token: this.props.profile.token
			}
		})
		.then(response => response.json())
		.then(res => {
			if(res.headers.statusCode === 200) {
				this.props.dispatchLocalStorageSale({pengeluaran: res.data})
				this.setState({refreshing: false})
			}
		})
		.catch(err => console.log(err))
	}

	render() {
		return(
			<View style={styles.container}>
				<ScrollView
					style={{flex: 1}}
					refreshControl={
						<RefreshControl
							colors={['red', 'green', 'blue']}
							refreshing={this.state.refreshing}
							onRefresh={this._onRefresh.bind(this)}
						/>
					}>
					{menu.map((content, index) => {
						if(index%2 === 0) {
							return (
								<View key={index} style={{flex: 1, flexDirection: 'row'}}>
									<View style={{flex: 1, borderWidth: 2, borderRadius: 10, borderColor: 'orange', margin: 5, backgroundColor: '#6ecbe0'}}>
										<Touchable
											style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30}}
											onPress={() => this.props.profile.access[menu[index].access.toLowerCase()] ? this.props.navigation.navigate(menu[index].pages) : null}>
											<Ionicons
												name={menu[index].icon}
												size={50}
												color='white'/>
											<Text style={{color: 'white'}}>{menu[index].name}</Text>
										</Touchable>
									</View>

									<View style={{flex: 1, borderWidth: 2, borderRadius: 10, borderColor: 'orange', margin: 5, backgroundColor: '#6ecbe0'}}>
										<Touchable
											style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30}}
											onPress={() => this.props.profile.access[menu[index + 1].access.toLowerCase()] ? this.props.navigation.navigate(menu[index + 1].pages) : null}>
											<Ionicons
												name={menu[index + 1].icon}
												size={50}
												color='white'/>
											<Text style={{color: 'white'}}>{menu[index + 1].name}</Text>
										</Touchable>
									</View>
								</View>
							)
						}
					})}
				</ScrollView>

				<View style={{flex: 0.3}}>
					<View style={{flex: 1, backgroundColor: '#6ecbe0', justifyContent: 'center', alignItems: 'center', marginTop: 5}}>
						<Text style={{fontWeight: 'bold', color: 'white'}}>[Tutorial] Belajar Cara Pakai</Text>
					</View>

					<View style={{flex: 2, padding: 5}}>
						<View style={{flex: 1, borderWidth: 0}}>
							<Touchable
								onPress={() => {}}>
							<View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
								<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
									<Ionicons
										name='ios-book'
										size={25}
										color='red'/>
								</View>

								<View  style={{flex: 5, justifyContent: 'center'}}>
									<Text>Text</Text>
								</View>
							</View>
							</Touchable>
						</View>

						<View style={{flex: 1, borderWidth: 0}}>
							<Touchable
								onPress={() => {}}>
							<View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
								<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
									<Ionicons
										name='logo-youtube'
										size={ 25 }
										color='red'/>
								</View>

								<View  style={{flex: 5, justifyContent: 'center'}}>
									<Text>Video</Text>
								</View>
							</View>
							</Touchable>
						</View>
					</View>
				</View>
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

	componentDidMount() {
		this.props.profile === null ?
			null
			:
			this._getUsers.bind(this, this.props.profile.token, this.props.profile)
	}

	componentWillUnmount() {
		this.keyboardDidShowListener.remove()
		this.keyboardDidHideListener.remove()
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
		device: state.user.device,
		category: state.category.data,
		ingredients: state.category.ingredients,
		profile: state.user.data,
		sale: state.sale.data,
	}
}

function mapDispatchToProps (dispatch) {
	return {
		dispatchAddCategory: (data) => dispatch(addCategory(data)),
		dispatchUpdateCategory: (data) => dispatch(updateCategory(data)),
		dispatchDeleteCategory: (data) => dispatch(deleteCategory(data)),
		dispatchLocalStorageData: (data) => dispatch(localStorageData(data)),
		dispatchLocalStorageSale: (data) => dispatch(localStorageSale(data)),
		dispatchLocalStorageUsers: (data) => dispatch(localStorageUsers(data)),
		dispatchUpdatePenjualan: (data) => dispatch(updatePenjualan(data))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InventoryScreen)