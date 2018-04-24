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
	Online,
	MyModal,
	Touchable
} from '../../components'

import {
	online
} from '../../modules'

var menu = [
	{name: 'Persediaan', icon: 'md-cube', pages: 'Inventory'},
	{name: 'Penjualan', icon: 'md-cash', pages: 'Sale'},
	{name: 'Pengeluaran', icon: 'md-cart', pages: 'Pengeluaran'},
	{name: 'Perpajakan', icon: 'md-paper', pages: 'level4'},
	{name: 'Laporan', icon: 'ios-list-box-outline', pages: 'Report'},
	{name: 'Pengaturan', icon: 'md-settings', pages: 'level4'}
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
		category: null
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

	render() {
		return(
			<View style={styles.container}>
				<ScrollView style={{flex: 1, padding: 5}}>
					{menu.map((content, index) => {
						if(index%2 === 0) {
							return (
								<View style={{flex: 1, flexDirection: 'row'}}>
									<View style={{flex: 1, borderWidth: 2, borderRadius: 10, borderColor: 'orange', margin: 5, backgroundColor: '#6ecbe0'}}>
										<Touchable
											style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 30}}
											onPress={() => this.props.navigation.navigate(menu[index].pages)}>
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
											onPress={() => this.props.navigation.navigate(menu[index + 1].pages)}>
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