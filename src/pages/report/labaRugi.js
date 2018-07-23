import React from 'react'
import {
	Alert,
	View,
	Picker,
	Text
} from 'react-native'
import { connect } from 'react-redux'

import {
	labaRugi,
	pengeluaran,
	resetReportPengeluaran
} from '../../redux/actions'

import {
	rupiah,
	server
} from '../../modules'

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


class LabaRugi extends React.Component {
	constructor() {
    super()
		this.state = {
			// from: null,
			// to: null,
			cabang: null,
			report: {
				penjualan: 0,
				hargaPokok: 0,
				labaKotor: 0,
				pengeluaran: 0,
				labaRugi: 0
			}
		}
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
			fetch(server + '/report/getLabaRugi', {
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
					this.setState({report: {
						penjualan: res.data.penjualan,
						hargaPokok: res.data.hargaPokok,
						labaKotor: res.data.labaKotor,
						pengeluaran: res.data.pengeluaran,
						labaRugi: res.data.labaRugi
					}})
				}
			})
			.catch(err => console.log(err))
		}
	}

	render() {
		return (
			<View style={{flex: 1, backgroundColor: 'white'}}>
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

				<View style={{flex: 1, padding: 5}}>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 1, justifyContent: 'center'}}>
							<Text>Penjualan</Text>
						</View>

						<View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
							<Text>{rupiah(Number(this.state.report.penjualan))}</Text>
						</View>
					</View>

					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 1, justifyContent: 'center'}}>
							<Text>Harga Pokok</Text>
						</View>

						<View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center', borderBottomWidth: 0.5}}>
							<Text style={{color: 'red'}}>({rupiah(Number(this.state.report.hargaPokok))})</Text>
						</View>
					</View>

					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 1, justifyContent: 'center'}}>
							<Text>Laba Kotor</Text>
						</View>

						<View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
							<Text>{rupiah(Number(this.state.report.labaKotor))}</Text>
						</View>
					</View>

					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 1, justifyContent: 'center'}}>
							<Text>Beban Usaha</Text>
						</View>

						<View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center', borderBottomWidth: 0.5}}>
							<Text style={{color: 'red'}}>
								{rupiah(Number(this.state.report.pengeluaran))}
							</Text>
						</View>
					</View>

					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 1, justifyContent: 'center'}}>
							<Text>{this.state.report.labaRugi > 0 ? 'Laba' : 'Rugi'}</Text>
						</View>

						<View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
							<Text style={{color: this.state.report.labaRugi > 0 ? null : 'red'}}>
								{rupiah(Number(this.state.report.labaRugi))}
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

	componentDidMount() {
		this.find(this.state.from, this.state.to)
	}
}

function mapStateToProps (state) {
	return {
		profile: state.user.data,
		store: state.user.store,
		category: state.category.data,
		labarugi: state.sale.labarugi,
		pengeluaran: state.sale.pengeluaran,
		reportPengeluaran: state.sale.reportPengeluaran
	}
}

function mapDispatchToProps (dispatch) {
	return {
		dispatchLabaRugi: (data) => dispatch(labaRugi(data)),
		dispatchPengeluaran: (data) => dispatch(pengeluaran(data)),
		dispatchResetReportPengeluaran: (data) => dispatch(resetReportPengeluaran(data))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LabaRugi)