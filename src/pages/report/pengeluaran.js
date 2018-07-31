import React from 'react'
import {
	Alert,
	View,
	Picker,
	processColor,
	ScrollView,
	Text
} from 'react-native'
import {LineChart} from 'react-native-charts-wrapper'
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
	constructor() {
    super()
		this.state = {
			bulan: null,
			tahun: null,
			cabang: null,

			data: [],
			upah: 0,
			sewa: 0,
			listrik: 0,
			promosi: 0,
			lain: 0,
			total: 0,

			dataChart: {},
	    legend: {
	      enabled: true,
	      textColor: processColor('blue'),
	      textSize: 12,
	      position: 'BELOW_CHART_RIGHT',
	      form: 'SQUARE',
	      formSize: 14,
	      xEntrySpace: 10,
	      yEntrySpace: 5,
	      formToTextSpace: 5,
	      wordWrapEnabled: true,
	      maxSizePercent: 0.5,
	      /*custom: {
	        colors: [processColor('red'), processColor('blue'), processColor('green')],
	        labels: ['Company X', 'Company Y', 'Company Dashed']
	      }*/
	    },
	    marker: {
	      enabled: true,
	      digits: 2,
	      backgroundTint: processColor('teal'),
	      markerColor: processColor('#F0C0FF8C'),
	      textColor: processColor('white'),
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
					var totalUpah = 0,
						totalSewa = 0,
						totalListrik = 0,
						totalPromosi = 0,
						totalLain = 0,
						totalTotal = 0
						totalChart = [{y: 0}],
						dateChart = ['']
					for(var a in res.data) {
						totalUpah = totalUpah + res.data[a].upah
						totalSewa = totalSewa + res.data[a].sewa
						totalListrik = totalListrik + res.data[a].listrik
						totalPromosi = totalPromosi + res.data[a].promosi
						totalLain = totalLain + res.data[a].lain
						totalTotal = totalTotal + res.data[a].total
						totalChart.push({y: res.data[a].total})
						dateChart.push(res.data[a].date)
					}
					this.setState({
						data: res.data,
						upah: totalUpah,
						sewa: totalSewa,
						listrik: totalListrik,
						promosi: totalPromosi,
						lain: totalLain,
						total: totalTotal
					})

					// if(res.data.length >= 4) {
						this.setState({
			        dataChart: {
	            dataSets: [{
	              values: totalChart,
	              label: 'Pengeluaran',
	              config: {
	              //   lineWidth: 2,
	              //   drawCircles: false,
	              //   highlightColor: processColor('red'),
	              //   color: processColor('red'),
	              //   // drawFilled: true,
	              //   fillColor: processColor('red'),
	              //   fillAlpha: 60,
			            // valueTextSize: 15,
	              //   valueFormatter: "##.000",
	              //   dashedLine: {
	              //     lineLength: 20,
	              //     spaceLength: 20
	              //   }
	                color: processColor('red'),
	                // drawFilled: true,
	                fillColor: processColor('red'),
	                fillAlpha: 50,
	                circleColor: processColor('red')
	              }
	            }],
			        },
			        xAxis: {
			          // $set: {
			            fontFamily:"HelveticaNeue-Medium",
			            fontWeight:"bold",
			            fontStyle:"italic",
			            fontColor: 'white',
			            valueFormatter: dateChart,
			            position: 'BOTTOM'
			          // }
			        },
			        yAxis: {
			          left: {
			            enabled: false
			          },
			          right: {
			            enabled: false
			          }
			        }
				    })
					// }
				}
			})
			.catch(err => console.log(err))
		}
	}

	handleSelect(event) {
    let entry = event.nativeEvent
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null})
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
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

				<ScrollView
					contentContainerStyle={{flexGrow: 1}}
					style={{flex: 1, marginTop: 5}}>
					<View style={{flex: 1}}>
					<ScrollView
						horizontal={true}
						style={{flex: 1, flexDirection: 'row'}}>
						{this.state.data.length === 0 ?
							null
							:
							<View style={{flex: 1}}>
								<View style={{borderWidth: 0.25, padding: 5}}>
									<Text style={{fontWeight: 'bold'}}>Date</Text>
								</View>
								<View style={{borderWidth: 0.25, padding: 5}}>
									<Text style={{fontWeight: 'bold'}}>Upah</Text>
								</View>
								<View style={{borderWidth: 0.25, padding: 5}}>
									<Text style={{fontWeight: 'bold'}}>Sewa</Text>
								</View>
								<View style={{borderWidth: 0.25, padding: 5}}>
									<Text style={{fontWeight: 'bold'}}>Listrik</Text>
								</View>
								<View style={{borderWidth: 0.25, padding: 5}}>
									<Text style={{fontWeight: 'bold'}}>Promosi</Text>
								</View>
								<View style={{borderWidth: 0.25, padding: 5}}>
									<Text style={{fontWeight: 'bold'}}>Lain</Text>
								</View>
								<View style={{borderWidth: 0.25, padding: 5}}>
									<Text style={{fontWeight: 'bold'}}>Total</Text>
								</View>
							</View>
						}

						{this.state.data.map((content, index) => {
							return (
								<View key={index} style={{flex: 1}}>
									<View style={{borderWidth: 0.25, padding: 5}}>
										<Text style={{fontWeight: 'bold'}}>{content.date}</Text>
									</View>
									<View style={{borderWidth: 0.25, padding: 5, alignItems: 'flex-end'}}>
										<Text>{rupiah(content.upah)}</Text>
									</View>
									<View style={{borderWidth: 0.25, padding: 5, alignItems: 'flex-end'}}>
										<Text>{rupiah(content.sewa)}</Text>
									</View>
									<View style={{borderWidth: 0.25, padding: 5, alignItems: 'flex-end'}}>
										<Text>{rupiah(content.listrik)}</Text>
									</View>
									<View style={{borderWidth: 0.25, padding: 5, alignItems: 'flex-end'}}>
										<Text>{rupiah(content.promosi)}</Text>
									</View>
									<View style={{borderWidth: 0.25, padding: 5, alignItems: 'flex-end'}}>
										<Text>{rupiah(content.lain)}</Text>
									</View>
									<View style={{borderWidth: 0.25, padding: 5, alignItems: 'flex-end'}}>
										<Text style={{fontWeight: 'bold'}}>{rupiah(content.total)}</Text>
									</View>
								</View>
							)
						})}

						{this.state.data.length > 1 ?
							<View style={{flex: 1}}>
								<View style={{borderWidth: 0.25, padding: 5}}>
									<Text style={{fontWeight: 'bold'}}>Total</Text>
								</View>
								<View style={{borderWidth: 0.25, padding: 5, alignItems: 'flex-end'}}>
									<Text style={{fontWeight: 'bold'}}>{rupiah(this.state.upah)}</Text>
								</View>
								<View style={{borderWidth: 0.25, padding: 5, alignItems: 'flex-end'}}>
									<Text style={{fontWeight: 'bold'}}>{rupiah(this.state.sewa)}</Text>
								</View>
								<View style={{borderWidth: 0.25, padding: 5, alignItems: 'flex-end'}}>
									<Text style={{fontWeight: 'bold'}}>{rupiah(this.state.listrik)}</Text>
								</View>
								<View style={{borderWidth: 0.25, padding: 5, alignItems: 'flex-end'}}>
									<Text style={{fontWeight: 'bold'}}>{rupiah(this.state.promosi)}</Text>
								</View>
								<View style={{borderWidth: 0.25, padding: 5, alignItems: 'flex-end'}}>
									<Text style={{fontWeight: 'bold'}}>{rupiah(this.state.lain)}</Text>
								</View>
								<View style={{borderWidth: 0.25, padding: 5, alignItems: 'flex-end'}}>
									<Text style={{fontWeight: 'bold'}}>{rupiah(this.state.total)}</Text>
								</View>
							</View>
							:
							null
						}
					</ScrollView>

					<View style={{flex: 1}}>
						<LineChart
	            style={{flex: 1, height: 300}}
	            data={this.state.dataChart}
	            chartDescription={{text: ''}}
	            // legend={this.state.legend}
	            marker={this.state.marker}
	            xAxis={this.state.xAxis}
	            yAxis={this.state.yAxis}
	            drawGridBackground={true}
	            borderColor={processColor('teal')}
	            borderWidth={1}
	            drawBorders={true}

	            touchEnabled={true}
	            dragEnabled={true}
	            scaleEnabled={true}
	            scaleXEnabled={true}
	            scaleYEnabled={true}
	            pinchZoom={true}
	            doubleTapToZoomEnabled={true}

	            dragDecelerationEnabled={true}
	            dragDecelerationFrictionCoef={0.99}

	            keepPositionOnRotation={false}
	            // onSelect={this.handleSelect.bind(this)}
	            onChange={(event) => console.log(event.nativeEvent)}
	          />
					</View>
					</View>
				</ScrollView>

				{/*<View style={{flex: 1}}>
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

				<View style={{flex: 1}}/>*/}
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