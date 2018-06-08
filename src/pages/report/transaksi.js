import React from 'react'
import {
	Alert,
	Dimensions,
	ListView,
	Picker,
	RefreshControl,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View
} from 'react-native'
const { width, height } = Dimensions.get('window')
const Json2csvParser = require('json2csv').Parser
import RNFS from 'react-native-fs'
import RNHTMLtoPDF from 'react-native-html-to-pdf'
import FileOpener from 'react-native-file-opener'

import { connect } from 'react-redux'
import { 
	options,
	back,
	next,
	updateFilter
} from '../../redux/actions'

import {
	Button,
	ButtonIcons,
	Online,
	Touchable
} from '../../components'

import {
	checkFolder,
	ddmmyyyy,
	mmyyyy,
	yyyy,
	online,
	rupiah
} from '../../modules'

const first = new Date().getDate() - new Date().getDay()
const total = 0
const customer = 0
const no = 0
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
const _print = []


class ReportScreen extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		headerStyle: {
			backgroundColor: '#6ecbe0'
		},
		/*headerLeft: (
			<ButtonIcons
				onPress = { () => { navigation.navigate('DrawerOpen') }}
				name = 'md-menu'
				color = 'white'
				size = { 30 }/>
		),*/
		headerRight: (
			<Online/>
		)
	})

	state = {
		value: 'daily',
		date: new Date(),
		view: [],
		print: [],

		// connection: null
	}

	_onRefresh() {
		this.props.dispatchRefreshing(true)
		setTimeout(() => {
			this.props.dispatchRefreshing(false)
		}, 3000)
	}

	_renderRefresh() {
		return (
			<RefreshControl
				refreshing = { this.props.refreshing }
				onRefresh = { this._onRefresh.bind(this) }
				colors = {[ 'red', 'green', 'blue' ]}
			/>
		)
	}

	_back() {
		this.props.dispatchBack()
		/*switch(this.state.value) {
			case 'daily':
				this.setState({
					date: new Date(new Date(this.state.date).setDate(new Date(this.state.date).getDate() - 1))
				})
				total = 0
				customer = 0
				no = 0
				break

			case 'weekly':
				this.setState({
					date: new Date(new Date(this.state.date).setDate(new Date(this.state.date).getDate() - 7))
				})
				total = 0
				customer = 0
				no = 0
				break

			case 'monthly':
				this.setState({
					date: new Date(new Date(this.state.date).setMonth(new Date(this.state.date).getMonth() - 1))
				})
				total = 0
				customer = 0
				no = 0
				break

			case 'yearly':
				this.setState({
					date: new Date(new Date(this.state.date).setYear(new Date(this.state.date).getFullYear() - 1))
				})
				total = 0
				customer = 0
				no = 0
				break
		}*/
	}

	_next() {
		this.props.dispatchNext()
		/*switch(this.state.value) {
			case 'daily':
				this.setState({
					date: new Date(new Date(this.state.date).setDate(new Date(this.state.date).getDate() + 1))
				})
				total = 0
				customer = 0
				no = 0
				break

			case 'weekly':
				this.setState({
					date: new Date(new Date(this.state.date).setDate(new Date(this.state.date).getDate() + 7))
				})
				total = 0
				customer = 0
				no = 0
				break

			case 'monthly':
				this.setState({
					date: new Date(new Date(this.state.date).setMonth(new Date(this.state.date).getMonth() + 1))
				})
				total = 0
				customer = 0
				no = 0
				break

			case 'yearly':
				this.setState({
					date: new Date(new Date(this.state.date).setYear(new Date(this.state.date).getFullYear() + 1))
				})
				total = 0
				customer = 0
				no = 0
				break
		}*/
	}

	_value(item) {
		this.props.dispatchOptions(item)
		/*switch(item) {
			case 'daily':
				this.setState({
					value: item,
					date: new Date()
				})
				total = 0
				customer = 0
				no = 0
				break

			case 'weekly':
				this.setState({
					value: item,
					date: new Date(new Date().setDate(first))
				})
				total = 0
				customer = 0
				no = 0
				break

			case 'monthly':
				this.setState({
					value: item,
					date: new Date()
				})
				total = 0
				customer = 0
				no = 0
				break

			case 'yearly':
				this.setState({
					value: item,
					date: new Date()
				})
				total = 0
				customer = 0
				no = 0
				break
		}*/
	}

	_collapse(index) {
		const stateCopy = this.state

		stateCopy.view[index] = !stateCopy.view[index]

		this.setState(stateCopy)
	}

	_renderValue(content, index) {
		var print = []
		const stateCopy = this.state
		// total = 0
		// customer = 0
		// no = 0
		switch(this.state.value) {
			case 'daily':
				if(new Date(new Date(content.date).getFullYear(), new Date(content.date).getMonth(), new Date(content.date).getDate()).getTime() == new Date(this.state.date.getFullYear(), this.state.date.getMonth(), this.state.date.getDate()).getTime()) {
					total += content.total
					customer += content.customer
					no += 1
					print.push(content.data[index])
					_print = print
					return true
				} else {
					_print = print
					return false
				}
				break

			case 'weekly':
				if(new Date(new Date(content.date).getFullYear(), new Date(content.date).getMonth(), new Date(content.date).getDate()).getTime() >= new Date(this.state.date.getFullYear(), this.state.date.getMonth(), this.state.date.getDate()).getTime() && new Date(new Date(content.date).getFullYear(), new Date(content.date).getMonth(), new Date(content.date).getDate()).getTime() <= new Date(this.state.date.getFullYear(), this.state.date.getMonth(), this.state.date.getDate() + 6).getTime()) {
					total += content.total
					customer += content.customer
					no += 1
					print.push(content.data[index])
					_print = print
					return true
				} else {
					_print = print
					return false
				}
				break

			case 'monthly':
				if(new Date(new Date(content.date).getFullYear(), new Date(content.date).getMonth()).getTime() == new Date(this.state.date.getFullYear(), this.state.date.getMonth()).getTime()) {
					total += content.total
					customer += content.customer
					no += 1
					print.push(content.data[index])
					_print = print
					return true
				} else {
					_print = print
					return false
				}
				break

			case 'yearly':
				if(new Date(new Date(content.date).getFullYear()).getTime() == new Date(this.state.date.getFullYear()).getTime()) {
					total += content.total
					customer += content.customer
					no += 1
					print.push(content.data[index])
					_print = print
					return true
				} else {
					_print = print
					return false
				}
				break
		}
	}

	async _htmlPdf(HTML, tanggal, csv) {
		let options = {
			html: HTML,
			fileName: 'penjualan ' + tanggal,
			directory: 'docs',
		}

		try {
			let file = await RNHTMLtoPDF.convert(options)
			this._moveFile(tanggal, csv)
		} catch (err) {
			Alert.alert(null, 'laporan penjualan gagal disimpan')
		}
	}

	_moveFile(tanggal) {
		checkFolder('/storage/emulated/0/Scout/Laporan', value => {
			RNFS.moveFile('/storage/emulated/0/Documents/penjualan ' + tanggal + '.pdf',
				'/storage/emulated/0/Scout/Laporan/penjualan ' + tanggal + '.pdf')
				.then(success => {
					Alert.alert(null, 'Laporan penjualan berhasil disimpan di Storage/Scout/Penjualan. Apakah file ini ingin dibuka?',
						[
							{text: 'OK', onPress: () => this._openFile(tanggal)},
							{text: 'Cancel'}
						])
					// this._openFile(tanggal)
				})
				.catch(err => console.log('err', err))
		})
	}

	_openFile(tanggal) {
		FileOpener.open('/storage/emulated/0/Scout/Laporan/penjualan ' + tanggal + '.pdf', 'application/pdf')
			.then(() => {
				console.log('success!!');
			},(e) => {
				console.log('error!!');
			})
	}

	createPDF() {
		var table = ''
		var tanggal = this.props.options == 'daily' ?
				ddmmyyyy(this.props.date)
				:
				this.props.options == 'weekly' ?
					ddmmyyyy(this.props.date) + " - " + ddmmyyyy(new Date(new Date(this.props.date).setDate(new Date(this.props.date).getDate() + 6)))
					:
					this.props.options == 'monthly' ?
						mmyyyy(this.props.date)
						:
						yyyy(this.props.date)

		var id = 0
		for(var a in this.props.filter) {
			for(var b in this.props.filter[a].data) {
				id++

				if(id % 2 == 0) {
					table += "<tr><td style='border: 1px solid black'>" + this.props.filter[a].idTransaction + "</td>" +
					"<td style='border: 1px solid black'>" + this.props.filter[a].data[b].name + "</td>" +
					"<td style='border: 1px solid black'>" + this.props.filter[a].data[b].price + "</td>" +
					"<td style='border: 1px solid black'>" + this.props.filter[a].data[b].cost + "</td>" +
					"<td style='border: 1px solid black'>" + this.props.filter[a].data[b].quantity + "</td>" +
					"<td style='border: 1px solid black'>" + this.props.filter[a].data[b].disc + "</td>" +
					"<td style='border: 1px solid black'>" + this.props.filter[a].data[b].subTotal + "</td></tr>"
				} else {
					table += "<tr style='background-color: #dddddd'><td style='border: 1px solid black'>" + this.props.filter[a].idTransaction + "</td>" +
					"<td style='border: 1px solid black'>" + this.props.filter[a].data[b].name + "</td>" +
					"<td style='border: 1px solid black'>" + this.props.filter[a].data[b].price + "</td>" +
					"<td style='border: 1px solid black'>" + this.props.filter[a].data[b].cost + "</td>" +
					"<td style='border: 1px solid black'>" + this.props.filter[a].data[b].quantity + "</td>" +
					"<td style='border: 1px solid black'>" + this.props.filter[a].data[b].disc + "</td>" +
					"<td style='border: 1px solid black'>" + this.props.filter[a].data[b].subTotal + "</td></tr>"
				}
			}
		}

		var HTML = "<h1> Penjualan " +
			tanggal +
			"</h1>" +
			"<table style='width: 100%;border-collapse: collapse'>" +
				"<tr>" +
					"<th style='border: 1px solid black'>ID</th>" +
					"<th style='border: 1px solid black'>Produk</th>" +
					"<th style='border: 1px solid black'>Harga</th>" +
					"<th style='border: 1px solid black'>Biaya</th>" +
					"<th style='border: 1px solid black'>Kuantitas</th>" +
					"<th style='border: 1px solid black'>Diskon</th>" +
					"<th style='border: 1px solid black'>Sub Total</th>" +
				"</tr>" +
				table +
			"</table>"

		if(this.props.filter.length > 0) {
			checkFolder('/storage/emulated/0/Documents', value => {
				if(value) {
					this._htmlPdf(HTML, tanggal)
				}
			})
		} else {
			Alert.alert(null, 'Tidak ada data')
		}
	}

	_saveCSV(csv, tanggal) {
		checkFolder('/storage/emulated/0/Scout/Laporan', value => {
			if(value) {
				RNFS.writeFile('/storage/emulated/0/Scout/Laporan/penjualan ' + tanggal + '.csv', csv, 'utf8')
					.then(success => {
						Alert.alert(null, 'laporan penjualan berhasil disimpan di Storage/Scout/Laporan')
						// this._moveFileCSV(tanggal)
					})
					.catch(err => {
						Alert.alert(null, 'export file gagal')
						// console.log('err', err)
					})
			}
		})
	}

	/*_moveFileCSV(tanggal) {
		checkFolder('/storage/emulated/0/Scout/Laporan', value => {
			RNFS.moveFile('/storage/emulated/0/Documents/penjualan ' + tanggal + '.csv',
				'/storage/emulated/0/Scout/Laporan/penjualan ' + tanggal + '.csv')
				.then(success => {
					Alert.alert(null, 'laporan penjualan berhasil disimpan')
				})
				.catch(err => {
					Alert.alert(null, 'export file gagal')
				})
		})
	}*/

	createCSV() {
		var newData = []
		var tanggal = this.props.options == 'daily' ?
				ddmmyyyy(this.props.date)
				:
				this.props.options == 'weekly' ?
					ddmmyyyy(this.props.date) + " - " + ddmmyyyy(new Date(new Date(this.props.date).setDate(new Date(this.props.date).getDate() + 6)))
					:
					this.props.options == 'monthly' ?
						mmyyyy(this.props.date)
						:
						yyyy(this.props.date)

		for(var a in this.props.filter) {
			for(var b in this.props.filter[a].data) {
				/*
				*
				json to csv
				*
				*/
				var	data = {
					idTransaction: this.props.filter[a].idTransaction,
					name: this.props.filter[a].data[b].name,
					price: this.props.filter[a].data[b].price,
					cost: this.props.filter[a].data[b].cost,
					quantity: this.props.filter[a].data[b].quantity,
					disc: this.props.filter[a].data[b].disc,
					subTotal: this.props.filter[a].data[b].subTotal,
					grandTotal: this.props.filter[a].total,
					date: new Date(this.props.filter[a].date),
				}
				newData.push(data)
			}
		}

		/*
		*
		json to csv
		*
		*/
		if(newData.length > 0) {
			var fields = ['idTransaction', 'name', 'price', 'cost', 'quantity', 'disc', 'subTotal', 'grandTotal', 'date']
			const json2csvParser = new Json2csvParser({ fields })
			const csv = json2csvParser.parse(newData)

			this._saveCSV(csv, tanggal)
		} else {
			Alert.alert(null, 'Tidak ada data')
		}
	}

	render() {
		return(
			<View style = { styles.container }>
				<View style = { styles.row }>
					<View style = {{ flex: 1.5 }}>
						<Picker
							mode = 'dropdown'
							selectedValue = { this.props.options }
							onValueChange = { this._value.bind(this) }>
							<Picker.Item label = 'Hari' value = 'daily' />
							<Picker.Item label = 'Minggu' value = 'weekly' />
							<Picker.Item label = 'Bulan' value = 'monthly' />
							<Picker.Item label = 'Tahun' value = 'yearly' />
						</Picker>
					</View>

					<View style = {{ flex: 0.5 }}>
						<Button
							onPress = { this._back.bind(this) }
							name = '<' />
					</View>

					<View style = {{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
						{this.props.options == 'daily' ?
							<Text> { ddmmyyyy(this.props.date) } </Text>
							:
							this.props.options == 'weekly' ?
								<View style = {{ flex: 1, justifyContent: 'center' }}>
									<Text> { ddmmyyyy(this.props.date) } - </Text>
									<Text> { ddmmyyyy(new Date(new Date(this.props.date).setDate(new Date(this.props.date).getDate() + 6))) } </Text>
								</View>
								:
								this.props.options == 'monthly' ?
									<Text> { mmyyyy(this.props.date) } </Text>
									:
									<Text> { yyyy(this.props.date) } </Text>
						}
					</View>

					<View style = {{ flex: 0.5 }}>
						<Button
							onPress = { this._next.bind(this) }
							name = '>' />
					</View>
				</View>

				<ScrollView
					style = {{ flex: 1 }}
					/*refreshControl = { this._renderRefresh() }*/>
					{this.props.sale == null ?
						<View style = {{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
							<Text> tidak ada data </Text>
						</View>
						:
						<ListView
							dataSource = {ds.cloneWithRows(this.props.filter)}
							enableEmptySections = {true}
							renderRow = {(content, section, index) => 
							<View>
								{/*this._renderValue(content, Number(index)) ?*/
									<View style = {{ flex: 1, flexDirection: 'column' }}>
										<View style = { styles.category }>
											<Touchable
												style = {{ flexDirection: 'row' }}
												onPress = { this._collapse.bind(this, Number(index)) }>
												<View style = {{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
													<Text> {Number(index) + 1}. </Text>
													<Text> {ddmmyyyy(content.date)} {new Date(content.date).getHours()}:{new Date(content.date).getMinutes()}:{new Date(content.date).getSeconds()} </Text>
												</View>

												<View style = {{ height: 40, justifyContent: 'center' }}>
													<Text> {rupiah(content.total)} </Text>
												</View>
											</Touchable>
										</View>

										{content.data == undefined ? null : <ListView
											dataSource = {ds.cloneWithRows(content.data)}
											enableEmptySections = {true}
											renderRow = {(product, section, idx) =>
												<View>
													{this.state.view[Number(index)] ?
														<View
															style = {[ styles.category, { marginLeft: 10 }]}>
															<View style = {{ flexDirection: 'row' }}>
																<View>
																	<Text> {Number(idx) + 1}. </Text>
																</View>

																<View>
																	<Text> {product.name} </Text>

																	<View style = {{ flexDirection: 'row' }}>
																		<Text> {product.quantity} </Text>
																		<Text> x </Text>
																		<Text> {rupiah(product.price)} </Text>
																		<Text> - </Text>
																		<Text> {product.disc} % </Text>
																		<Text> = </Text>
																		<Text> {rupiah(product.subTotal)} </Text>
																	</View>
																</View>
															</View>
														</View>
														:
														null
													}
												</View>
										}/>}
									</View>
									/*:
									null*/
								}
							</View>
						}/>
					}
				</ScrollView>

				<View style = {{height: 75 }}/>

				<View style = { styles.stickyBottom }>
					<View style = { styles.row }>
						<View style = {{ flex: 1, flexDirection: 'row' }}>
							<View style = {{ flex: 1 }}>
								<Text> Konsumen </Text>
							</View>

							<View style = {{ flex: 1, alignItems: 'center' }}>
								<Text> {this.props.detail.konsumen} </Text>
							</View>	
						</View>

						<View style = {{ flex: 1, flexDirection: 'row' }}>
							<View style = {{ flex: 1 }}>
								<Text> Total Transaksi </Text>
							</View>

							<View style = {{ flex: 0.5, alignItems: 'flex-end' }}>
								<Text> {this.props.detail.transaksi} </Text>
							</View>	
						</View>
					</View>

					<View style = {{ flex: 1, flexDirection: 'row', borderBottomWidth:0.5,borderColor:'#ededed' }}>
						<View style = {{ flex: 1 }}>
							<Text> Total </Text>
						</View>

						<View style = {{ flex: 1, alignItems: 'flex-end' }}>
							<Text> {rupiah(this.props.detail.total)} </Text>
						</View>	
					</View>

					<View style = {{flexDirection: 'row'}}>
						<Button
							onPress = {this.createPDF.bind(this)}
							name = 'Save to PDF'/>

						<Text>&nbsp;</Text>

						<Button
							onPress = {this.createCSV.bind(this)}
							name = 'Save to CSV'/>
					</View>
				</View>
			</View>
		)
	}

	componentWillMount() {
		this.props.dispatchUpdateFilter()
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 5,
		backgroundColor: 'white'
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
		// flex: 1,
		padding: 5,
		marginTop: 2.5,
		marginBottom: 2.5,
		borderRadius: 5,
		borderWidth: 0.5,
		borderColor: '#e4e5e5',
		backgroundColor: '#f2f2f2'
	}
})


function mapStateToProps (state) {
	return {
		sale: state.sale.data,
		options: state.sale.options,
		date: state.sale.date,
		filter: state.sale.filter,
		detail: state.sale.detail
	}
}

function mapDispatchToProps (dispatch) {
	return {
		dispatchOptions: (data) => dispatch(options(data)),
		dispatchBack: (data) => dispatch(back(data)),
		dispatchNext: (data) => dispatch(next(data)),
		dispatchUpdateFilter: (data) => dispatch(updateFilter(data))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ReportScreen)