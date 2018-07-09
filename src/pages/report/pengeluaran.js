import React from 'react'
import {
	Alert,
	View,
	Picker,
	Text
} from 'react-native'
import { connect } from 'react-redux'

import {
	rupiah,
	server
} from '../../modules'

import {
	pengeluaran,
	resetReportPengeluaran
} from '../../redux/actions'

var bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

var tahun = []

for(var i = 2018; i <= new Date().getFullYear() + 1; i++) {
	tahun.push(i.toString())
}

var choose = []

for(var i in tahun) {
	for(var j in bulan) {
		choose.push(bulan[j] + ' ' + tahun[i])
	}
}


class Pengeluaran extends React.Component {
	state = {
		bulan: null,
		tahun: null,
		cabang: null
	}
	
	_cabang(value) {
		this.setState({cabang: value})
		this.find(this.state.from, this.state.to, value)
	}

	_from(value) {
		if(value > this.state.to) {
			return Alert.alert(null, 'data tidak valid')
		}
		this.setState({from: value})
		this.find(value, this.state.to, this.state.cabang)
	}

	_to(value) {
		if(this.state.from > value) {
			return Alert.alert(null, 'data tidak valid')
		}
		this.setState({to: value})
		this.find(this.state.from, value, this.state.cabang)
	}

	find(_from, _to, cabang) {
		if(_from != undefined && _to != undefined && cabang != null) {
			var data = {
				idPusat: this.props.store[0].idPusat,
				idCabang: cabang === 'Pusat' ? '' : cabang,
				from: choose[_from].split(' ')[1] + '-' + ((bulan.indexOf(choose[_from].split(' ')[0]) + 1).toString().length === 1 ? '0' + (bulan.indexOf(choose[_from].split(' ')[0]) + 1) : (bulan.indexOf(choose[_from].split(' ')[0]) + 1)) + '-01',
				to: choose[_to].split(' ')[1] + '-' + ((bulan.indexOf(choose[_to].split(' ')[0]) + 1).toString().length === 1 ? '0' + (bulan.indexOf(choose[_to].split(' ')[0]) + 1) : (bulan.indexOf(choose[_to].split(' ')[0]) + 1)) + '-31'
			}

			// this.props.dispatchLabaRugi(data)
			// this.props.dispatchPengeluaran(data)
			console.log(data)
			fetch(server + '/report/getBebanUsaha', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					token: this.props.profile.token
				},
				body: JSON.stringify(data)
			})
			.then(response => response.json())
			.then(res => {
				if(res.headers.statusCode === 200) {
					console.log(res)
				}
			})
			.catch(err => console.log(err))
		}
	}

	render() {
		return (
			<View style={{flex: 1, padding: 5, backgroundColor: 'white'}}>
				<View style={{flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.5}}>
					<Text style={{fontSize: 10}}>Dari</Text>
					<View style={{flex: 1}}>
						<Picker
							mode = 'dropdown'
							selectedValue = { this.state.from }
							onValueChange = { this._from.bind(this) }>
							<Picker.Item label = 'Select' value = {null} />
							{choose.map((content, index) => {
								return (
									<Picker.Item key={index} label={content} value={index} />
								)
							})}
						</Picker>
					</View>

					<Text style={{fontSize: 10}}>Hingga</Text>
					<View style={{flex: 1}}>
						<Picker
							mode = 'dropdown'
							selectedValue = { this.state.to }
							onValueChange = { this._to.bind(this) }>
							<Picker.Item label = 'Select' value = {null} />
							{choose.map((content, index) => {
								return (
									<Picker.Item key={index} label={content} value={index} />
								)
							})}
						</Picker>
					</View>
				</View>
				
				<View style={{flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.5}}>
					<Text style={{fontSize: 10}}>Cabang</Text>
					<View style={{flex: 0.5}}>
						<Picker
							mode = 'dropdown'
							selectedValue = { this.state.cabang }
							onValueChange = { this._cabang.bind(this) }>
							<Picker.Item label='Pilih Cabang' value={null} />
							<Picker.Item label={this.props.store[0].name} value='Pusat' />
							{this.props.store[0].cabang.map((content, index) => {
								return (
									<Picker.Item key={index} label={content.name} value={content.idCabang} />
								)
							})}
						</Picker>
					</View>
				</View>

				<View style={{flex: 1}}>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 1, justifyContent: 'center'}}>
							<Text>Beban Upah</Text>
						</View>

						<View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
							<Text>
								{rupiah(this.props.reportPengeluaran.upah)}
							</Text>
						</View>
					</View>

					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 1, justifyContent: 'center'}}>
							<Text>Beban Sewa</Text>
						</View>

						<View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
							<Text>
								{rupiah(this.props.reportPengeluaran.sewa)}
							</Text>
						</View>
					</View>

					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 1, justifyContent: 'center'}}>
							<Text>Beban Listrik</Text>
						</View>

						<View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
							<Text>
								{rupiah(this.props.reportPengeluaran.listrik)}
							</Text>
						</View>
					</View>

					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 1, justifyContent: 'center'}}>
							<Text>Beban Promosi</Text>
						</View>

						<View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
							<Text>
								{rupiah(this.props.reportPengeluaran.promosi)}
							</Text>
						</View>
					</View>

					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 1, justifyContent: 'center'}}>
							<Text>Beban Lain</Text>
						</View>

						<View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
							<Text>
								{rupiah(this.props.reportPengeluaran.lain)}
							</Text>
						</View>
					</View>

					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 1, justifyContent: 'center'}}>
							<Text>Total</Text>
						</View>

						<View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
							<Text>
								{rupiah(
									this.props.reportPengeluaran.upah +
									this.props.reportPengeluaran.sewa +
									this.props.reportPengeluaran.listrik +
									this.props.reportPengeluaran.promosi +
									this.props.reportPengeluaran.lain
								)}
							</Text>
						</View>
					</View>
				</View>

				<View style={{flex: 1}}/>
			</View>
		)
	}

	componentWillMount() {
		this.props.dispatchResetReportPengeluaran()
	}
}

function mapStateToProps (state) {
	return {
		profile: state.user.data,
		store: state.user.store,
		pengeluaran: state.sale.pengeluaran,
		reportPengeluaran: state.sale.reportPengeluaran
	}
}

function mapDispatchToProps (dispatch) {
	return {
		dispatchPengeluaran: (data) => dispatch(pengeluaran(data)),
		dispatchResetReportPengeluaran: (data) => dispatch(resetReportPengeluaran(data))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Pengeluaran)