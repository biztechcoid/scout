import React from 'react'
import {
	View,
	Picker,
	Text
} from 'react-native'
import { connect } from 'react-redux'

import {
	rupiah
} from '../../modules'

var bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

var tahun = []

for(var i = 2018; i <= new Date().getFullYear() + 1; i++) {
	tahun.push(i.toString())
}


class Pengeluaran extends React.Component {
	state = {
		bulan: null,
		tahun: null
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
			
		}
	}

	render() {
		return (
			<View style={{flex: 1, padding: 5, backgroundColor: 'white'}}>
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

				<View style={{flex: 1}}>
					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 1, justifyContent: 'center'}}>
							<Text>Beban Upah</Text>
						</View>

						<View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
							<Text>
								{
									this.props.pengeluaran[this.state.bulan + '_' + this.state.tahun] === undefined ?
									rupiah(0)
									:
									rupiah(this.props.pengeluaran[this.state.bulan + '_' + this.state.tahun].upah)
								}
							</Text>
						</View>
					</View>

					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 1, justifyContent: 'center'}}>
							<Text>Beban Sewa</Text>
						</View>

						<View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
							<Text>
								{
									this.props.pengeluaran[this.state.bulan + '_' + this.state.tahun] === undefined ?
									rupiah(0)
									:
									rupiah(this.props.pengeluaran[this.state.bulan + '_' + this.state.tahun].sewa)
								}
							</Text>
						</View>
					</View>

					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 1, justifyContent: 'center'}}>
							<Text>Beban Listrik</Text>
						</View>

						<View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
							<Text>
								{
									this.props.pengeluaran[this.state.bulan + '_' + this.state.tahun] === undefined ?
									rupiah(0)
									:
									rupiah(this.props.pengeluaran[this.state.bulan + '_' + this.state.tahun].listrik)
								}
							</Text>
						</View>
					</View>

					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 1, justifyContent: 'center'}}>
							<Text>Beban Promosi</Text>
						</View>

						<View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
							<Text>
								{
									this.props.pengeluaran[this.state.bulan + '_' + this.state.tahun] === undefined ?
									rupiah(0)
									:
									rupiah(this.props.pengeluaran[this.state.bulan + '_' + this.state.tahun].promosi)
								}
							</Text>
						</View>
					</View>

					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 1, justifyContent: 'center'}}>
							<Text>Beban Lain</Text>
						</View>

						<View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
							<Text>
								{
									this.props.pengeluaran[this.state.bulan + '_' + this.state.tahun] === undefined ?
									rupiah(0)
									:
									rupiah(this.props.pengeluaran[this.state.bulan + '_' + this.state.tahun].lain)
								}
							</Text>
						</View>
					</View>

					<View style={{flex: 1, flexDirection: 'row'}}>
						<View style={{flex: 1, justifyContent: 'center'}}>
							<Text>Total</Text>
						</View>

						<View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
							<Text>
								{
									this.props.pengeluaran[this.state.bulan + '_' + this.state.tahun] === undefined ?
									rupiah(0)
									:
									rupiah(Number(this.props.pengeluaran[this.state.bulan + '_' + this.state.tahun].upah) +
																		Number(this.props.pengeluaran[this.state.bulan + '_' + this.state.tahun].sewa) +
																		Number(this.props.pengeluaran[this.state.bulan + '_' + this.state.tahun].listrik) +
																		Number(this.props.pengeluaran[this.state.bulan + '_' + this.state.tahun].promosi) +
																		Number(this.props.pengeluaran[this.state.bulan + '_' + this.state.tahun].lain))
								}
							</Text>
						</View>
					</View>
				</View>

				<View style={{flex: 1}}/>
			</View>
		)
	}
}

function mapStateToProps (state) {
	return {
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
)(Pengeluaran)