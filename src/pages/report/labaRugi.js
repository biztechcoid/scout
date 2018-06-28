import React from 'react'
import {
	Alert,
	View,
	Picker,
	Text
} from 'react-native'
import { connect } from 'react-redux'

import {
	labaRugi
} from '../../redux/actions'

import {
	rupiah
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
	state = {
		bulan: null,
		tahun: null,
		from: null,
		to: null
	}
	
	_bulan(bulan) {
		this.setState({bulan: bulan})
		this.find(bulan, this.state.tahun)
	}

	_tahun(tahun) {
		this.setState({tahun: tahun})
		this.find(this.state.bulan, tahun)
	}

	_from(value) {
		if(value > this.state.to) {
			return Alert.alert(null, 'data tidak valid')
		}
		this.setState({from: value})
		this.find(choose[value], choose[this.state.to])
	}

	_to(value) {
		if(this.state.from > value) {
			return Alert.alert(null, 'data tidak valid')
		}
		this.setState({to: value})
		this.find(choose[this.state.from], choose[value])
	}

	find(_from, _to) {
		if(_from != undefined && _to != undefined) {
			var data = {
				category: this.props.category,
				from: _from,
				to: _to
			}
			this.props.dispatchLabaRugi(data)
		}
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
				
				{<View style={{flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.5}}>
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
				</View>}

				<View style={{flex: 1, padding: 5}}>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 1, justifyContent: 'center'}}>
							<Text>Penjualan</Text>
						</View>

						<View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
							<Text>{rupiah(this.props.labarugi.penjualan)}</Text>
						</View>
					</View>

					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 1, justifyContent: 'center'}}>
							<Text>Harga Pokok</Text>
						</View>

						<View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center', borderBottomWidth: 0.5}}>
							<Text style={{color: 'red'}}>({rupiah(this.props.labarugi.hargaPokok)})</Text>
						</View>
					</View>

					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 1, justifyContent: 'center'}}>
							<Text>Laba Kotor</Text>
						</View>

						<View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
							<Text>{rupiah(Number(this.props.labarugi.penjualan) - Number(this.props.labarugi.hargaPokok))}</Text>
						</View>
					</View>

					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 1, justifyContent: 'center'}}>
							<Text>Beban Usaha</Text>
						</View>

						<View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center', borderBottomWidth: 0.5}}>
							<Text style={{color: 'red'}}>
								({
									this.props.pengeluaran[this.state.bulan + '_' + this.state.tahun] === undefined ?
										rupiah(0)
										:
										rupiah(Number(this.props.pengeluaran[this.state.bulan + '_' + this.state.tahun].upah) +
																				Number(this.props.pengeluaran[this.state.bulan + '_' + this.state.tahun].sewa) +
																				Number(this.props.pengeluaran[this.state.bulan + '_' + this.state.tahun].listrik) +
																				Number(this.props.pengeluaran[this.state.bulan + '_' + this.state.tahun].promosi) +
																				Number(this.props.pengeluaran[this.state.bulan + '_' + this.state.tahun].lain))
								})
							</Text>
						</View>
					</View>

					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 1, justifyContent: 'center'}}>
							<Text>{this.props.labarugi.penjualan - this.props.labarugi.hargaPokok > 0 ? 'Laba' : 'Rugi'}</Text>
						</View>

						<View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
							<Text style={{color: this.props.labarugi.penjualan - this.props.labarugi.hargaPokok > 0 ? null : 'red'}}>
								{
									rupiah(Number(this.props.labarugi.penjualan - this.props.labarugi.hargaPokok) -
																		(this.props.pengeluaran[this.state.bulan + '_' + this.state.tahun] === undefined ?
																			0
																			:
																			Number(this.props.pengeluaran[this.state.bulan + '_' + this.state.tahun].upah) +
																			Number(this.props.pengeluaran[this.state.bulan + '_' + this.state.tahun].sewa) +
																			Number(this.props.pengeluaran[this.state.bulan + '_' + this.state.tahun].listrik) +
																			Number(this.props.pengeluaran[this.state.bulan + '_' + this.state.tahun].promosi) +
																			Number(this.props.pengeluaran[this.state.bulan + '_' + this.state.tahun].lain)))
								}
							</Text>
						</View>
					</View>
				</View>

				<View style={{flex: 1}}/>
			</View>
		)
	}

	componentDidMount() {
		this.find(this.state.bulan, this.state.tahun)
	}
}

function mapStateToProps (state) {
	return {
		category: state.category.data,
		labarugi: state.sale.labarugi,
		pengeluaran: state.sale.pengeluaran
	}
}

function mapDispatchToProps (dispatch) {
	return {
		dispatchLabaRugi: (data) => dispatch(labaRugi(data))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LabaRugi)