import React from 'react'
import {
	Alert,
	AsyncStorage,
	Platform,
	Text,
	View,
	Image
} from 'react-native'
import DeviceInfo from 'react-native-device-info-fork'
const Json2csvParser = require('json2csv').Parser
import RNFS from 'react-native-fs'
import FileOpener from 'react-native-file-opener'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker'

import { connect } from 'react-redux'
import {
	logout,
	localStorageData,
	localStorageSale
} from '../redux/actions'

import {
	Package,
	Touchable
} from '../components'

import {
	checkFolder,
	date
} from '../modules'


class SideMenuScreen extends React.Component {
	state = {
		imei: null
	}

	_logout() {
		this.props.dispatchLogout(this.props.screenProps)
	}

	_openFile() {
		FileOpener.open('/storage/emulated/0/Scout/Data/scout.csv', 'application/pdf')
			.then(() => {
				console.log('success!!')
			},(e) => {
				console.log('error!!')
			})
	}

	_save() {
		/*
		*
		save file
		*
		*/
		data = {
			data: this.props.data,
			ingredients: this.props.ingredients,
			penjualan: this.props.sale
		}
		
		RNFS.writeFile('/storage/emulated/0/Scout/Data/scout.csv', JSON.stringify(data), 'utf8')
			.then(success => {
				Alert.alert(null, 'file berhasil export di Storage/Scout/Data')
				// this._openFile()
			})
			.catch(err => {
				Alert.alert(null, 'export file gagal')
			})
	}

	_export() {
		/*
		*
		check folder
		*
		*/
		this.props.screenProps.navigate('DrawerClose')
		checkFolder('/storage/emulated/0/Scout/Data', value => {
			if(value) {
				this._save()
			}
		})
	}

	_import(res) {
		RNFS.readFile(res, 'utf8')
			.then(success => {
				var data = JSON.parse(success)
				console.log(data)
				this.props.dispatchLocalStorageData({data: data.data})
				this.props.dispatchLocalStorageData({ingredients: data.ingredients})
				this.props.dispatchLocalStorageSale(data.penjualan)
				Alert.alert(null, 'import file berhasil')
			})
			.catch(err => {
				Alert.alert(null, 'import file gagal')
			})
	}

	_chooseFile() {
		this.props.screenProps.navigate('DrawerClose')

		DocumentPicker.show({
      filetype: [DocumentPickerUtil.allFiles()],
    },(error,res) => {
    	if(error) {
    		return console.log(error)
    	}

      // Android
      if(res === null) {
      	return console.log(res)
      }

      console.log(res)
      console.log(
         res.uri,
         res.type, // mime type
         res.fileName,
         res.fileSize
      )
      this._import(res.uri)
    })
	}

	render() {
		return (
			<View style = {{flex: 1}}>
				<View style={{ backgroundColor:'#353535' }}>
					<View style = {{ height: 40,marginTop:20,marginBottom:20, borderWidth: 0, borderBottomWidth: 0, borderColor: '#f7f7f7',width:'90%',marginLeft:'5%',marginRight:'5%' }}>
						<View style = {{ flex: 1, alignItems: 'center', justifyContent: 'center',width:'100%'}}>
							<View  style={{justifyContent: 'center',width:'80%',flex: 1,}}>
								<Image  style={{flex: 1,width: null,height: null,resizeMode: 'contain'}} source={require('../assets/img/LOGO.png')} />
							</View>
						</View>
					</View>
				</View>

				<View>
					{this.props.user ?
						<View style = {{ width:'90%',marginLeft:'5%',marginRight:'5%', marginTop:20, marginBottom:20 }}>
							<View style = {{ flexDirection: 'row' }}>
								<View>
									<Text> Email </Text>
									<Text> Name </Text>
									<Text> Terakhir Masuk </Text>
								</View>

								<View>
									<Text> : { this.props.user.email } </Text>
									<Text> : { this.props.user.name } </Text>
									<Text> : { date(this.props.user.lastLogin) } </Text>
								</View>
							</View>
						</View>
						:
						null
					}

					{this.props.user ?
						this.props.user.idCabang === 'null' ?
							<View>
								<View style = {{ height: 40, borderWidth: 0, borderBottomWidth: 1, borderColor: '#f7f7f7',width:'90%',marginLeft:'5%',marginRight:'5%' }}>
									<Touchable
										style = {{ justifyContent: 'center' }}
										onPress = { () => {
											this.props.screenProps.navigate('DrawerClose')
											this.props.screenProps.navigate('Register', {type: 'Tambah User'})
										}}>
										<Text> Tambah User </Text>
									</Touchable>
								</View>

								<View style = {{ height: 40, borderWidth: 0, borderBottomWidth: 1, borderColor: '#f7f7f7',width:'90%',marginLeft:'5%',marginRight:'5%' }}>
									<Touchable
										style = {{ justifyContent: 'center' }}
										onPress = { () => {
											this.props.screenProps.navigate('DrawerClose')
											this.props.screenProps.navigate('ListUsers')
										}}>
										<Text> List User </Text>
									</Touchable>
								</View>

								<View style = {{ height: 40, borderWidth: 0, borderBottomWidth: 1, borderColor: '#f7f7f7',width:'90%',marginLeft:'5%',marginRight:'5%' }}>
									<Touchable
										style = {{ justifyContent: 'center' }}
										onPress = { this._logout.bind(this) }>
										<Text> Keluar </Text>
									</Touchable>
								</View>
							</View>
							:
							null
						:
						null
					}

					<View style = {{ height: 40, borderWidth: 0, borderBottomWidth: 1, borderColor: '#f7f7f7',width:'90%',marginLeft:'5%',marginRight:'5%' }}>
						<Touchable
							style = {{ justifyContent: 'center' }}
							onPress = { this._export.bind(this) }>
							<Text> Export File </Text>
						</Touchable>
					</View>

					<View style = {{ height: 40, borderWidth: 0, borderBottomWidth: 1, borderColor: '#f7f7f7',width:'90%',marginLeft:'5%',marginRight:'5%' }}>
						<Touchable
							style = {{ justifyContent: 'center' }}
							onPress = { this._chooseFile.bind(this) }>
							<Text> Import File </Text>
						</Touchable>
					</View>
				</View>

				
				<View style = {{position: 'absolute', left: 0, bottom: 0, right: 0}}>
					<View style = {{flex: 1}}>
						<Text> IMEI {this.state.imei} </Text>
					</View>

					<View style = {{flex: 1, alignItems: 'center'}}>
						<Text> version {Package.version} </Text>
					</View>
				</View>
			</View>
		)
	}

	componentWillMount() {
		Platform.OS === 'ios' ?
			this.setState({imei: DeviceInfo.getIdfa()})
			:
			this.setState({imei: DeviceInfo.getImei()})
	}
}


function mapStateToProps (state) {
	return {
		user: state.user.data,
		data: state.category.data,
		ingredients: state.category.ingredients,
		sale: state.sale.data
	}
}

function mapDispatchToProps (dispatch) {
	return {
		dispatchLogout: (data) => dispatch(logout(data)),
		dispatchLocalStorageData: (data) => dispatch(localStorageData(data)),
		dispatchLocalStorageSale: (data) => dispatch(localStorageSale(data))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SideMenuScreen)