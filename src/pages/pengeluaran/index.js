import React from 'react'
import {
	Alert,
	Picker,
	ScrollView,
	StyleSheet,
	View,
	Text,
	TextInput
} from 'react-native'
import { connect } from 'react-redux'

import {
	addPengeluaran,
	updatePengeluaran
} from '../../redux/actions'

import {
	Button,
	Online
} from '../../components'

import {
	makeId,
	online,
	server
} from '../../modules'

var bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

var tahun = []

for(var i = 2018; i <= new Date().getFullYear() + 1; i++) {
	tahun.push(i.toString())
}


class Pengeluaran extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		headerStyle: {
			backgroundColor: '#6ecbe0'
		},
		/*headerLeft: (
			<ButtonIcons
				onPress={() => {navigation.navigate('DrawerOpen')}}
				name='md-menu'
				color='white'
				size={30}/>
		),*/
		headerRight: (
			<Online/>
		)
	})

	state = {
		upah: 0,
		sewa: 0,
		listrik: 0,
		promosi: 0,
		lain: 0
	}

	_bulan(bulan) {
		this.setState({bulan: bulan})
		this.find(bulan, this.state.tahun)
	}

	_tahun(tahun) {
		this.setState({tahun: tahun})
		this.find(this.state.bulan, tahun)
	}

	find(bulan, tahun) {
		if(bulan != undefined && tahun != undefined) {
			if(this.props.pengeluaran[bulan + '_' + tahun] === undefined) {
				this.setState({
					upah: 0,
					sewa: 0,
					listrik: 0,
					promosi: 0,
					lain: 0
				})
			} else {
				this.setState({
					idPengeluaran: this.props.pengeluaran[bulan + '_' + tahun].idPengeluaran.toString(),
					upah: this.props.pengeluaran[bulan + '_' + tahun].upah.toString(),
					sewa: this.props.pengeluaran[bulan + '_' + tahun].sewa.toString(),
					listrik: this.props.pengeluaran[bulan + '_' + tahun].listrik.toString(),
					promosi: this.props.pengeluaran[bulan + '_' + tahun].promosi.toString(),
					lain: this.props.pengeluaran[bulan + '_' + tahun].lain.toString()
				})
			}
		}
	}

	_simpan() {
		var data = {
			idPengeluaran: makeId(),
			idPusat: this.props.profile.idPusat,
			idCabang: this.props.profile.idCabang,
			upah: this.state.upah,
			sewa: this.state.sewa,
			listrik: this.state.listrik,
			promosi: this.state.promosi,
			lain: this.state.lain,
			bulan: this.state.bulan,
			tahun: this.state.tahun
		}

		online(value => {
			if(value) {
				if(data.bulan != undefined && data.tahun != undefined) {
					if(this.props.pengeluaran[this.state.bulan + '_' + this.state.tahun] === undefined) {
						/*
						*
						post to api
						*
						*/
						fetch(server + '/sale/addPengeluaran', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
								token: this.props.profile.token
							},
							body: JSON.stringify(data)
						})
						.then(response => response.json())
						.then(res => {
							Alert.alert(null, res.headers.message)
							
							if(res.headers.statusCode === 200) {
								this.props.dispatchAddPengeluaran(data)
							}
						})
						.catch(err => console.log(err))
					} else {
						Alert.alert(null, 'Data sudah ada')
					}
				} else {
					Alert.alert(null, 'Pilih bulan dan tahun')
				}
			} else {
				Alert.alert(null, 'koneksi internet bermasalah')
			}
		})
	}

	_update() {
		var data = {
			idPengeluaran: this.state.idPengeluaran,
			idPusat: this.props.profile.idPusat,
			idCabang: this.props.profile.idCabang,
			upah: this.state.upah,
			sewa: this.state.sewa,
			listrik: this.state.listrik,
			promosi: this.state.promosi,
			lain: this.state.lain,
			bulan: this.state.bulan,
			tahun: this.state.tahun
		}

		online(value => {
			if(value) {
				/*
				*
				post to api
				*
				*/
				fetch(server + '/sale/updatePengeluaran', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						token: this.props.profile.token
					},
					body: JSON.stringify(data)
				})
				.then(response => response.json())
				.then(res => {
					Alert.alert(null, res.headers.message)
					
					if(res.headers.statusCode === 200) {
						this.props.dispatchUpdatePengeluaran(data)
					}
				})
				.catch(err => console.log(err))
			} else {
				Alert.alert(null, 'koneksi internet bermasalah')
			}
		})
	}

	render() {
		return (
			<View style={{flex: 1, backgroundColor: 'white'}}>
				<View style={{flexDirection: 'row'}}>
					<View style={{flex: 1}}>
						<Picker
							mode = 'dropdown'
							selectedValue = { this.state.bulan }
							onValueChange = { this._bulan.bind(this) }>
							<Picker.Item label = 'Bulan' value = {null} />
							{bulan.map((content, index) => {
								return (
									<Picker.Item key={index} label = {content} value = {index} />
								)
							})}
						</Picker>
					</View>

					<View style={{flex: 1}}>
						<Picker
							mode = 'dropdown'
							selectedValue = { this.state.tahun }
							onValueChange = { this._tahun.bind(this) }>
							<Picker.Item label = 'Tahun' value = {null} />
							{tahun.map((content, index) => {
								return (
									<Picker.Item key={index} label = {content} value = {content} />
								)
							})}
						</Picker>
					</View>
				</View>

				<ScrollView
					overScrollMode = {'always'}
					style = {{ flex: 3 }}
					keyboardShouldPersistTaps = 'always'>
					<View style = {{ flexDirection: 'row' }}>
						<View style = {{ flexDirection: 'column' }}>
							<View style = {{ height: 50, justifyContent: 'center' }}>
								<Text> Beban Upah/Gaji </Text>
							</View>
							<View style = {{ height: 50, justifyContent: 'center' }}>
								<Text> Beban Sewa Lokasi </Text>
							</View>
							<View style = {{ height: 50, justifyContent: 'center' }}>
								<Text> Beban Listrik, Air, Gas </Text>
							</View>
							<View style = {{ height: 50, justifyContent: 'center' }}>
								<Text> Beban Promosi </Text>
							</View>
							<View style = {{ height: 50, justifyContent: 'center' }}>
								<Text> Beban Lain-lain </Text>
							</View>
						</View>

						<View style = {{ flex: 1, flexDirection: 'column' }}>
							<View style = {{ flexDirection: 'row' }}>
								<View style = {{ height: 50, justifyContent: 'center' }}>
									<Text> : </Text>
								</View>
								
								<TextInput
									ref = { (c) => this._upah = c }
									style = {{ flex: 1, height: 50 }}
									keyboardType = 'numeric'
									underlineColorAndroid = '#ececec'
									returnKeyType = 'next'
									onChangeText = { (text) => this.setState({ upah: text })}
									onSubmitEditing = { () => this._sewa.focus() }
									value = { this.state.upah }/>
							</View>

							<View style = {{ flexDirection: 'row' }}>
								<View style = {{ height: 50, justifyContent: 'center' }}>
									<Text> : </Text>
								</View>
								
								<TextInput
									ref = { (c) => this._sewa = c }
									style = {{ flex: 1, height: 50 }}
									keyboardType = 'numeric'
									underlineColorAndroid = '#ececec'
									returnKeyType = 'next'
									onChangeText = { (text) => this.setState({ sewa: text })}
									onSubmitEditing = { () => this._listrik.focus() }
									value = { this.state.sewa }/>
							</View>

							<View style = {{ flexDirection: 'row' }}>
								<View style = {{ height: 50, justifyContent: 'center' }}>
									<Text> : </Text>
								</View>
								
								<TextInput
									ref = { (c) => this._listrik = c }
									style = {{ flex: 1, height: 50 }}
									keyboardType = 'numeric'
									underlineColorAndroid = '#ececec'
									returnKeyType = 'next'
									onChangeText = { (text) => this.setState({ listrik: text })}
									onSubmitEditing = { () => this._promosi.focus() }
									value = { this.state.listrik }/>
							</View>

							<View style = {{ flexDirection: 'row' }}>
								<View style = {{ height: 50, justifyContent: 'center' }}>
									<Text> : </Text>
								</View>
								
								<TextInput
									ref = { (c) => this._promosi = c }
									style = {{ flex: 1, height: 50 }}
									keyboardType = 'numeric'
									underlineColorAndroid = '#ececec'
									returnKeyType = 'next'
									onChangeText = { (text) => this.setState({ promosi: text })}
									onSubmitEditing = { () => this._lain.focus() }
									value = { this.state.promosi }/>
							</View>

							<View style = {{ flexDirection: 'row' }}>
								<View style = {{ height: 50, justifyContent: 'center' }}>
									<Text> : </Text>
								</View>
								
								<TextInput
									ref = { (c) => this._lain = c }
									style = {{ flex: 1, height: 50 }}
									keyboardType = 'numeric'
									underlineColorAndroid = '#ececec'
									returnKeyType = 'done'
									onChangeText = { (text) => this.setState({ lain: text })}
									onSubmitEditing = {() => {}}
									value = { this.state.lain }/>
							</View>
						</View>
					</View>
				</ScrollView>

				<View style={styles.stickyBottom}>
					<View style={{flexDirection: 'row'}}>
						<View style={{flex: 1, margin: 5}}>
							<Text style={{fontWeight: 'bold'}}>TOTAL</Text>
						</View>

						<View style={{flex: 1, margin: 5, alignItems: 'flex-end'}}>
							<Text style={{fontWeight: 'bold'}}>{
								Number(this.state.upah) + Number(this.state.sewa) +
								Number(this.state.listrik) + Number(this.state.promosi) +
								Number(this.state.lain)
							}</Text>
						</View>
					</View>

					<View style={{flexDirection: 'row'}}>
						<Button
							onPress={this._simpan.bind(this)}
							name='SIMPAN'/>

						<Text>&nbsp;</Text>

						<Button
							onPress = {this._update.bind(this)}
							name = 'UBAH'/>
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	stickyBottom: {
		flex: 1,
		position: 'absolute',
		left: 5,
		right: 5,
		bottom: 5
	}
})

function mapStateToProps (state) {
	return {
		profile: state.user.data,
		pengeluaran: state.sale.pengeluaran
	}
}

function mapDispatchToProps (dispatch) {
	return {
		dispatchAddPengeluaran: (data) => dispatch(addPengeluaran(data)),
		dispatchUpdatePengeluaran: (data) => dispatch(updatePengeluaran(data))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Pengeluaran)