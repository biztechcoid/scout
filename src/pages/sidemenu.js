import React from 'react'
import {
	Alert,
	AsyncStorage,
	Image,
	Platform,
	Text,
	View
} from 'react-native'
import DeviceInfo from 'react-native-device-info-fork'
const Json2csvParser = require('json2csv').Parser
import RNFS from 'react-native-fs'
import FileOpener from 'react-native-file-opener'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker'
import ImagePicker from 'react-native-image-crop-picker'
// var ImagePicker = require('react-native-image-picker');

import { connect } from 'react-redux'
import {
	logout,
	localStorageData,
	localStorageSale,
	localStorageUsers
} from '../redux/actions'

import {
	Package,
	Touchable
} from '../components'

import {
	checkFolder,
	date,
	server
} from '../modules'


class SideMenuScreen extends React.Component {
	state = {
		imei: null,
		sourceAsString: '',
		fileName: ''
	}

	_logout() {
		fetch(server + '/sale/updateStockIngredients', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token: this.props.user.token
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
				if(this.props.sale[a].status === undefined) {
					fetch(server + '/sale/addPenjualan', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							token: this.props.user.token
						},
						body: JSON.stringify(this.props.sale[a])
					})
					.then(response => response.json())
					.then(res => {
						if(res.headers.statusCode === 200) {
							// this.props.dispatchUpdatePenjualan(res.data)
							this.props.dispatchLogout(this.props.screenProps)
						}
					})
					.catch(err => console.log(err))
				} else {
					this.props.dispatchLogout(this.props.screenProps)
				}
			}
		} else {
			this.props.dispatchLogout(this.props.screenProps)
		}
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

	_pickerLogo() {
		ImagePicker.openPicker({
		  width: 500,
		  height: 500,
		  cropping: false
		}).then(image => {
		  var _name = image.path.split('/')
		  const data = new FormData()
		  data.append('data', {
		  	uri: image.path,
		  	type: image.mime,
		  	name: _name[_name.length - 1]
		  })
		  data.append('idPusat', this.props.user.idPusat)

		  console.log(data)
		  fetch('http://www.scoutbiz.id/upload-logo.php', {
		  	method: 'POST',
		  	headers: {
		  		'Content-Type': 'multipart/form-data'
		  	},
		  	body: data,
		  })
		  .then((response) => response.json())
		  .then((res) => {
		  	console.log(res)
		  	if(res === 'Berhasil') {
		  		fetch(server + '/users/store', {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							token: this.props.user.token
						}
					})
					.then(response => response.json())
					.then(res => {
						if(res.headers.statusCode === 200) {
							this.props.dispatchLocalStorageUsers({store: res.data})
		  				Alert.alert(null, 'upload gambar berhasil')
						}
					})
					.catch(err => console.log(err))
		  	} else {
		  		Alert.alert(null, 'upload gambar gagal')
		  	}
		  })
		  .catch((err) => console.log(err))
		})

		/*var options = {
		  title: 'Select Avatar',
		  //customButtons: [
		    //{name: 'fb', title: 'Choose Photo from Facebook'},
		  //],
		  storageOptions: {
		    skipBackup: true,
		    path: 'images'
		  }
		};*/

		/*ImagePicker.showImagePicker(options, (response) => {
		  console.log('Response = ', response);


		  if (response.didCancel) {
		    console.log('User cancelled image picker');
		  }
		  else if (response.error) {
		    console.log('ImagePicker Error: ', response.error);
		  }
		  else if (response.customButton) {
		    console.log('User tapped custom button: ', response.customButton);
		  }
		  else {
		    let source = { uri: response.uri };
				const sourceString = response.uri.toString(); 
				this.setState({ 
					dataImage: response.data, 
					fileName: sourceString.split('/').pop(), 
					sourceAsString: sourceString, 
				});

		    // You can also display the image using data:
		    // let source = { uri: 'data:image/jpeg;base64,' + response.data };

		    this.setState({
		      avatarSource: source
		    });

			  const data = new FormData()
			  data.append('data', {
			  	uri: this.state.sourceAsString,
			  	type: response.type,
			  	name: this.state.fileName,
			  })
			  data.append('idPusat', this.props.user.idPusat)

			  console.log(data)
			  fetch('http://www.scoutbiz.id/upload-logo.php', {
			  	method: 'POST',
			  	headers: {
			  		'Content-Type': 'multipart/form-data'
			  	},
			  	body: data,
			  })
			  .then((response) => response.json())
			  .then((res) => {
			  	console.log(res)
			  	if(res === 'Berhasil') {
			  		Alert.alert(null, 'upload gambar berhasil')
			  	} else {
			  		Alert.alert(null, 'upload gambar gagal')
			  	}
			  })
			  .catch((err) => console.log(err))
		  }
		});*/

		/*ImagePicker.launchImageLibrary(options, (response) => {
			console.log('Response = ', response);


		  if (response.didCancel) {
		    console.log('User cancelled image picker');
		  }
		  else if (response.error) {
		    console.log('ImagePicker Error: ', response.error);
		  }
		  else if (response.customButton) {
		    console.log('User tapped custom button: ', response.customButton);
		  }
		  else {
		    let source = { uri: response.uri };
				const sourceString = response.uri.toString(); 
				this.setState({ 
					dataImage: response.data, 
					fileName: sourceString.split('/').pop(), 
					sourceAsString: sourceString, 
				});

		    // You can also display the image using data:
		    // let source = { uri: 'data:image/jpeg;base64,' + response.data };

		    this.setState({
		      avatarSource: source
		    });

			  const data = new FormData()
			  data.append('data', {
			  	uri: this.state.sourceAsString,
			  	type: response.type,
			  	name: this.state.fileName,
			  })
			  data.append('idPusat', this.props.user.idPusat)

			  console.log(data)
			  fetch('http://www.scoutbiz.id/upload-logo.php', {
			  	method: 'POST',
			  	headers: {
			  		'Content-Type': 'multipart/form-data'
			  	},
			  	body: data,
			  })
			  .then((response) => response.json())
			  .then((res) => {
			  	console.log(res)
			  	if(res === 'Berhasil') {
			  		Alert.alert(null, 'upload gambar berhasil')
			  	} else {
			  		Alert.alert(null, 'upload gambar gagal')
			  	}
			  })
			  .catch((err) => console.log(err))
		  }
		})*/
	}

	render() {
		return (
			<View style = {{flex: 1}}>
				<View style={{ backgroundColor:'#353535' }}>
					
							{this.props.user === null ?
								null
								:
					<View style={{flexDirection: 'row', height: 80, marginTop: 20, marginBottom: 20, borderWidth: 0, borderBottomWidth: 0, borderColor: '#f7f7f7',width:'90%',marginLeft:'5%',marginRight:'5%'}}>
						<View style={{width: 80, height: 80, backgroundColor: 'white'}}>
							<Touchable style={{flex: 1}} onPress={this._pickerLogo.bind(this)}>
								<Image style={{flex: 1, width: null, height: null, resizeMode: 'center'}} source={{uri: 'http://www.scoutbiz.id/images/' + this.props.store[0].logo}}/>
							</Touchable>
						</View>

						<View style = {{ flex: 1, justifyContent: 'center', width:'100%'}}>
								<View style={{flex: 1}}>
									<View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
										<Text style={{color: 'white'}}>{this.props.user.bisnisName}</Text>
									</View>
									<View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
										<Text style={{color: 'white'}}>{this.props.user.cabangName}</Text>
									</View>
								</View>
						</View>
					</View>
							}

				</View>

				<View>
					{/*this.props.user ?
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
						null*/
					}


					{this.props.user ?
						// this.props.user.idCabang === null ?
							<View>
								<View style = {{ height: 40, borderWidth: 0, borderBottomWidth: 1, borderColor: '#f7f7f7',width:'90%',marginLeft:'5%',marginRight:'5%' }}>
									<Touchable
										style={{justifyContent: 'center'}}
										onPress={()=>{}}>
										<Text>Hak Akses</Text>
									</Touchable>
								</View>

								{Object.keys(this.props.user.access).map((content, index) => {
									if(this.props.user.access[content] === 'true') {
										return (
											<View key={index}
												style = {{height: 20, borderWidth: 0,width:'90%',marginLeft:'10%',marginRight:'5%'}}>
												<View style={{justifyContent: 'center'}}>
													<Text>{content}</Text>
												</View>
											</View>
										)
									}
								})}

								<View style = {{ height: 40, borderWidth: 0, borderBottomWidth: 1, borderColor: '#f7f7f7',width:'90%',marginLeft:'5%',marginRight:'5%' }}>
									<Touchable
										style={{justifyContent: 'center'}}
										onPress={()=>{}}>
										<Text>{this.props.user.name}</Text>
									</Touchable>
								</View>

								<View style = {{ height: 40, borderWidth: 0, borderBottomWidth: 1, borderColor: '#f7f7f7',width:'90%',marginLeft:'5%',marginRight:'5%' }}>
									<Touchable
										style={{justifyContent: 'center'}}
										onPress={()=>{}}>
										<Text>{this.props.user.email}</Text>
									</Touchable>
								</View>

								<View style = {{ height: 40, borderWidth: 0, borderBottomWidth: 1, borderColor: '#f7f7f7',width:'90%',marginLeft:'5%',marginRight:'5%' }}>
									<Touchable
										style={{justifyContent: 'center'}}
										onPress={()=>{}}>
										<Text>{date(this.props.user.lastLogin)}</Text>
									</Touchable>
								</View>

								{/*<View style = {{ height: 40, borderWidth: 0, borderBottomWidth: 1, borderColor: '#f7f7f7',width:'90%',marginLeft:'5%',marginRight:'5%' }}>
									<Touchable
										style = {{ justifyContent: 'center' }}
										onPress = { () => {
											this.props.screenProps.navigate('DrawerClose')
											this.props.screenProps.navigate('Register', {type: 'Tambah User'})
										}}>
										<Text>Tambah User</Text>
									</Touchable>
								</View>

								<View style = {{ height: 40, borderWidth: 0, borderBottomWidth: 1, borderColor: '#f7f7f7',width:'90%',marginLeft:'5%',marginRight:'5%' }}>
									<Touchable
										style = {{ justifyContent: 'center' }}
										onPress = { () => {
											this.props.screenProps.navigate('DrawerClose')
											this.props.screenProps.navigate('ListUsers')
										}}>
										<Text>List User</Text>
									</Touchable>
								</View>*/}

							</View>
							// :
							// null
						:
						null
					}

					<View style = {{ height: 40, borderWidth: 0, borderBottomWidth: 1, borderColor: '#f7f7f7',width:'90%',marginLeft:'5%',marginRight:'5%' }}>
						<Touchable
							style = {{ justifyContent: 'center' }}
							onPress = { this._export.bind(this) }>
							<Text>Export File</Text>
						</Touchable>
					</View>

					<View style = {{ height: 40, borderWidth: 0, borderBottomWidth: 1, borderColor: '#f7f7f7',width:'90%',marginLeft:'5%',marginRight:'5%' }}>
						<Touchable
							style = {{ justifyContent: 'center' }}
							onPress = { this._chooseFile.bind(this) }>
							<Text>Import File</Text>
						</Touchable>
					</View>
					
					<View style = {{ height: 40, borderWidth: 0, borderBottomWidth: 1, borderColor: '#f7f7f7',width:'90%',marginLeft:'5%',marginRight:'5%' }}>
						<Touchable
							style = {{ justifyContent: 'center' }}
							onPress = { this._logout.bind(this) }>
							<Text>Keluar</Text>
						</Touchable>
					</View>
				</View>

				
				<View style={{position: 'absolute', left: 0, bottom: 0, right: 0}}>
					<View style={{backgroundColor:'#353535'}}>
						<View style={{height: 60, marginTop: 5, marginBottom:5, borderWidth: 0, borderBottomWidth: 0, borderColor: '#f7f7f7'}}>
							<View style={{flex: 1}}>
								<View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
									<Text style={{color: 'white'}}>Powered By</Text>
								</View>

								<Image style={{flex: 2, width: null, height: null, resizeMode: 'center'}} source={require('../assets/img/Scoutbiz-New_Logo.png')} />
							</View>
						</View>
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
	console.log(state)
	return {
		user: state.user.data,
		store: state.user.store,
		data: state.category.data,
		ingredients: state.category.ingredients,
		sale: state.sale.data
	}
}

function mapDispatchToProps (dispatch) {
	return {
		dispatchLogout: (data) => dispatch(logout(data)),
		dispatchLocalStorageData: (data) => dispatch(localStorageData(data)),
		dispatchLocalStorageSale: (data) => dispatch(localStorageSale(data)),
		dispatchLocalStorageUsers: (data) => dispatch(localStorageUsers(data)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SideMenuScreen)