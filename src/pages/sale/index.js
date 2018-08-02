import React from 'react'
import {
	Alert,
	Dimensions,
	Keyboard,
	ListView,
	Platform,
	RefreshControl,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native'
const { width, height } = Dimensions.get('window')
this.width = width
this.height = height
import Ionicons from 'react-native-vector-icons/Ionicons'
import RNFS from 'react-native-fs'
import RNHTMLtoPDF from 'react-native-html-to-pdf'
import FileOpener from 'react-native-file-opener'

import { connect } from 'react-redux'
import {
	refreshing,
	updateStock,
	penjualan,
	updateFilter
} from '../../redux/actions'

import {
	Button,
	ButtonIcons,
	Online,
	MyModal,
	Touchable
} from '../../components'

import {
	checkFolder,
	date,
	makeId,
	online,
	rupiah
} from '../../modules'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})


class SaleScreen extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		headerStyle: {
			paddingTop: navigation.state.params ? navigation.state.params.width > navigation.state.params.height && navigation.state.params.keyboard == false ? 0 : Platform.OS == 'ios' ? 20 : 0 : 20,
			height: navigation.state.params ? navigation.state.params.width > navigation.state.params.height && navigation.state.params.keyboard == false ? 0 : Platform.OS == 'ios' ? 64 : 56 : Platform.OS == 'ios' ? 64 : 56,
			backgroundColor: '#6ecbe0'
		},
		tabBarVisible: navigation.state.params ? navigation.state.params.width > navigation.state.params.height && navigation.state.params.keyboard == false ? false : true : true,
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
		keyboard: false,
		view: [],
		viewSubProduct: [],
		sale: {
			data: [],
			total: 0.00,
			customer: 1
		},
		width: width,
		height: height,

		// search textbox
		search: '',
		// search value

		searchValue: [],
		searchVisible: false,

		discount: 0,
		change: 0,

		modal: false,

		// connection: null
	}

	_scanQR() {
		this.props.navigation.navigate('ScanQR', { type: 'addCategory' })
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

	_collapse(index) {
		const stateCopy = this.state

		stateCopy.view[index] = !stateCopy.view[index]

		this.setState(stateCopy)
	}

	_collapseSubProduct(index) {
		const stateCopy = this.state

		stateCopy.viewSubProduct[index] = !stateCopy.viewSubProduct[index]

		this.setState(stateCopy)
	}

	_addSale(idCategory, product, subProduct) {
		for(var i in this.props.category) {
			if(this.props.category[i].idCategory === idCategory) {
				for(var j in this.props.category[i].product) {
					if(this.props.category[i].product[j].idProduct === product.idProduct) {
						/*
						*
						cek quantity product
						*
						*/
						if(this.props.category[i].product[j].quantity > 0) {
							/*
							*
							ada stock
							*
							*/
							if(this.props.category[i].product[j].quantity <= 5) {
								/*
								*
								stock menipis
								*
								*/
								// Alert.alert(null, 'stock product ' + this.props.category[i].product[j].name + ' tersisa ' + this.props.category[i].product[j].quantity)
							}

							/*
							*
							tambah ke pembelian
							*
							*/
							const stateCopy = this.state

							if(stateCopy.sale.data.length === 0) {
								/*
								*
								input pembelian baru
								*
								*/
								stateCopy.sale['idTransaction'] = makeId()
								var data = {
									idCategory: idCategory,
									idProduct: product.idProduct,
									name: product.name,
									price: product.price,
									cost: product.cost,
									quantity: 1,
									disc: 0,
									subTotal: (1 * product.price) - ((1 * product.price) * (0 / 100))
								}
								stateCopy.sale.total = data.subTotal
							} else {
								/*
								*
								tambah pembelian
								*
								*/
								for(var i in stateCopy.sale.data) {
									/*
									*
									tambah quantity pembelian
									*
									*/
									if(stateCopy.sale.data[i].idProduct === product.idProduct) {
										// stateCopy.sale.data[i].quantity = stateCopy.sale.data[i].quantity + 1
										// stateCopy.sale.data[i].subTotal = (product.price * stateCopy.sale.data[i].quantity) - (0 / 100)

										/*
										*
										sum total
										*
										*/
										// var total = 0
										// for(var j in stateCopy.sale.data) {
											// total += stateCopy.sale.data[j].subTotal
										// }
										// stateCopy.sale.total = total

										// return this.setState(stateCopy)

										return Alert.alert(null, product.name + ' sudah ada di pembelian')
									}
								}

								/*
								*
								tambah item pembelian
								*
								*/
								var data = {
									idCategory: idCategory,
									idProduct: product.idProduct,
									name: product.name,
									price: product.price,
									cost: product.cost,
									quantity: 1,
									disc: 0,
									subTotal: (1 * product.price) - ((1 * product.price) * (0 / 100))
								}
							}

							/*
							*
							sum total
							*
							*/
							var total = 0
							for(var i in stateCopy.sale.data) {
								total += stateCopy.sale.data[i].subTotal
							}

							stateCopy.sale.total = total + data.subTotal
							stateCopy.sale.data.push(data)

							return this.setState(stateCopy)
						} else {
							/*
							*
							tidak ada stock
							*
							*/
							// Alert.alert(null, 'stock product ' + this.props.category[i].product[j].name + ' kosong')
						}
					}
				}
			}
		}
		this._scrollSell.scrollToEnd({animated: true})
	}

	_addSaleSubProduct(idCategory, idProduct, subProduct) {
		const stateCopy = this.state
		if(stateCopy.sale.data.length === 0) {
			return Alert.alert(null, 'silahkan pilih product terlebih dahulu')
		} else {
			for(var i in stateCopy.sale.data) {
				if(stateCopy.sale.data.map((a) => {return a.idCategory}).indexOf(idCategory) !== -1) {
				// if(stateCopy.sale.data[i].idCategory === idCategory) {
					if(stateCopy.sale.data.map((a) => {return a.idProduct}).indexOf(idProduct) !== -1) {
					// if(stateCopy.sale.data[i].idProduct === idProduct) {
						if(stateCopy.sale.data.map((a) => {return a.idSubProduct}).indexOf(subProduct.idSubProduct) !== -1) {
						// if(stateCopy.sale.data[i].idSubProduct === subProduct.idSubProduct) {
							/*
							*
							sub product sudah ada
							*
							*/
							return Alert.alert(null, subProduct.name + ' sudah ada di pembelian')
						} else {
							var data = {
								idCategory: idCategory,
								idProduct: idProduct,
								idSubProduct: subProduct.idSubProduct,
								name: subProduct.name,
								price: subProduct.price,
								cost: subProduct.cost,
								quantity: 1,
								disc: 0,
								subTotal: (1 * subProduct.price) - ((1 * subProduct.price) * (0 / 100))
							}
						}
					} else {
						return Alert.alert(null, 'silahkan pilih product terlebih dahulu')
					}
				} else {
					return Alert.alert(null, 'silahkan pilih product terlebih dahulu')
				}
			}
			/*
			*
			sum total
			*
			*/
			var total = 0
			for(var j in stateCopy.sale.data) {
				total += stateCopy.sale.data[j].subTotal
			}

			stateCopy.sale.total = total + data.subTotal
			stateCopy.sale.data.splice(i + 1, 0, data)

			this.setState(stateCopy)
		}
	}

	// _removeSale(product) {
	// 	const stateCopy = this.state
	// 	var total = 0
	// 	for(var i in stateCopy.sale.data) {
	// 		if(stateCopy.sale.data[i].idProduct === product.idProduct) {
	// 			if(stateCopy.sale.data[i].quantity === 1) {
	// 				/*
	// 				*
	// 				hapus item pembelian
	// 				*
	// 				*/
	// 				stateCopy.sale.data.splice(i, 1)
	// 			} else {
	// 				/*
	// 				*
	// 				kurangi quantity pembelian
	// 				*
	// 				*/
	// 				stateCopy.sale.data[i].quantity = stateCopy.sale.data[i].quantity - 1
	// 				stateCopy.sale.data[i].subTotal = (product.price * stateCopy.sale.data[i].quantity) - (0 / 100)
	// 			}
	// 		}

	// 		if(stateCopy.sale.data.length === 0) {
	// 			total = 0
	// 		} else {
	// 			total += stateCopy.sale.data[i].subTotal
	// 		}
	// 	}
	// 	stateCopy.sale.total = total

	// 	this.setState(stateCopy)
	// }

	_editQuantity(idx, content, text) {
		const stateCopy = this.state

		for(var i in this.props.category) {
			if(this.props.category[i].idCategory === content.idCategory) {
				for(var j in this.props.category[i].product) {
					if(this.props.category[i].product[j].idProduct === content.idProduct) {
						/*
						*
						stock tidak cukup
						*
						*/
						if(Number(text) > this.props.category[i].product[j].quantity) {
							// return Alert.alert(null, 'stock tidak cukup')
						}
						/**/

						stateCopy.sale.data[idx].quantity = Number(text)
					}
				}
			}
		}

		this.setState(stateCopy)
	}

	_editDisc(idx, content, text) {
		const stateCopy = this.state

		stateCopy.sale.data[idx].disc = Number(text)

		this.setState(stateCopy)
	}

	_updatePrice() {
		const stateCopy = this.state
		var total = 0

		for(var i in stateCopy.sale.data) {
			stateCopy.sale.data[i].subTotal = (stateCopy.sale.data[i].quantity * stateCopy.sale.data[i].price) - ((stateCopy.sale.data[i].quantity * stateCopy.sale.data[i].price) * (stateCopy.sale.data[i].disc / 100))

			total += stateCopy.sale.data[i].subTotal
		}
		stateCopy.sale.total = total

		this.setState(stateCopy)
	}

	_editCustomer(text) {
		const stateCopy = this.state

		stateCopy.sale.customer = Number(text)

		this.setState(stateCopy)
	}

	_clear() {
		const stateCopy = this.state

		if(stateCopy.sale.data.length > 0) {
			Alert.alert(null, 'Anda yakin ingin menghapus pembelian?',
				[
					{ text: 'Yakin', onPress: () => this.setState({sale: { data: [], total: 0.00, customer: 1 }})},
					{ text: 'Batal' }
				])
		}
	}

	_done() {
		const stateCopy = this.state

		/*
		*
		belum ada list pembelian
		*
		*/
		if(stateCopy.sale.data.length === 0) {
			return Alert.alert(null, 'Belum ada daftar pembelian')
		}
		/**/

		/*
		*
		total belanja 0
		*
		*/
		if(stateCopy.sale.total == 0) {
			return Alert.alert(null, 'Pembelian anda tidak valid')
		}
		/**/

		// Alert.alert(null, 'Anda yakin transaksi valid ?',
			// [
				// { text: 'Yakin', onPress: () => {
					// stateCopy.sale['date'] = new Date()
					// this.props.dispatchUpdateStock(stateCopy.sale)
					// this.props.dispatchPenjualan(stateCopy.sale)
					this._modal()
					// this.setState({sale: { data: [], total: 0.00, customer: 1 }})
				// }},
				// { text: 'Tidak' }
			// ])
	}

	async _htmlPdf(HTML) {
		let options = {
			html: HTML,
			fileName: 'struk' + this.state.sale.idTransaction,
			directory: 'docs',
		}

		try {
			let file = await RNHTMLtoPDF.convert(options)
			this._moveFile()
		} catch (err) {
			Alert.alert(null, 'struk ' + this.state.sale.idTransaction + ' gagal disimpan')
		}
	}

	_moveFile() {
		checkFolder('/storage/emulated/0/Scout/Penjualan', value => {
			RNFS.moveFile('/storage/emulated/0/Documents/struk' + this.state.sale.idTransaction + '.pdf',
				'/storage/emulated/0/Scout/Penjualan/struk' + this.state.sale.idTransaction + '.pdf')
				.then(success => {
					Alert.alert(null, 'struk penjualan berhasil disimpan di Storage/Scout/Penjualan. Apakah file ini ingin dibuka?',
						[
							{text: 'OK', onPress: () => this._openFile()},
							{text: 'Cancel', onPress: () => {
								this.setState({
									sale: { data: [], total: 0.00, customer: 1 },
									discount: 0,
									change: 0
								})
							}}
						], { cancelable: false })
				})
				.catch(err => console.log('err', err))
		})
	}

	_openFile() {
		FileOpener.open('/storage/emulated/0/Scout/Penjualan/struk' + this.state.sale.idTransaction + '.pdf', 'application/pdf')
			.then(() => {
				console.log('success!!')
				this.setState({
					sale: { data: [], total: 0.00, customer: 1 },
					discount: 0,
					change: 0
				})
			},(e) => {
				console.log('error!!')
			})
	}

	async _print(stateCopy) {
		/*
		*
		print to pdf
		*
		*/
		var table = ''
		for(var a in stateCopy.sale.data) {
			if(a % 2 == 0) {
				table += "<tr>" +
					"<td>" + stateCopy.sale.data[a].name + "</td>" +
				"</tr>" +
				"<tr>" +
					"<td>" +
						"<table>" +
							"<tr>" +
								"<td>" + stateCopy.sale.data[a].quantity + "</td>" +
								"<td> X " + stateCopy.sale.data[a].price + "</td>" +
								"<td>- " + stateCopy.sale.data[a].disc + "%</td>" +
								"<td>= " + stateCopy.sale.data[a].subTotal + "</td>" +
							"</tr>" +
						"</table>" +
					"</td>" +
				"</tr>"
			} else {
				table += "<tr style='background-color: #dddddd'>" +
					"<td>" + stateCopy.sale.data[a].name + "</td>" +
				"</tr>" +
				"<tr style='background-color: #dddddd'>" +
					"<td>" +
						"<table>" +
							"<tr>" +
								"<td>" + stateCopy.sale.data[a].quantity + "</td>" +
								"<td> X " + stateCopy.sale.data[a].price + "</td>" +
								"<td>- " + stateCopy.sale.data[a].disc + "%</td>" +
								"<td>= " + stateCopy.sale.data[a].subTotal + "</td>" +
							"</tr>" +
						"</table>" +
					"</td>" +
				"</tr>"
			}
		}
		var HTML = "<div style='width: 250px'><h1>Scout</h1>" + 
			"<h3>" + stateCopy.sale.idTransaction + "</h3>" +
			"<h3>" + date(stateCopy.sale.date) + "</h3>" +
			"<table style='width: 100%;border-collapse: collapse'>" +
				table +
			"</table>" +
			"<table>" +
				"<tr>" +
					"<td>Total</td>" +
					"<td>" + stateCopy.sale.total + "</td>" +
				"</tr>" +
				"<tr>" +
					"<td>Diskon</td>" +
					"<td>" + stateCopy.sale.discount + "</td>" +
				"</tr>" +
				"<tr>" +
					"<td>Pembayaran</td>" +
					"<td>" + stateCopy.sale.pembayaran + "</td>" +
				"</tr>" +
				"<tr>" +
					"<td>Kembali</td>" +
					"<td>" + (stateCopy.sale.pembayaran - (stateCopy.sale.total - stateCopy.sale.discount)) + "</td>" +
				"</tr>" +
			"</table></div>"

		checkFolder('/storage/emulated/0/Documents', value => {
			if(value) {
				this._htmlPdf(HTML)
			}
		})
	}

	_bayar() {
		const stateCopy = this.state
		Alert.alert(null, 'Anda yakin transaksi valid ?',
			[
				{ text: 'Yakin', onPress: () => {
					stateCopy.sale['date'] = new Date()
					stateCopy.sale['discount'] = this.state.discount
					stateCopy.sale['pembayaran'] = this.state.change
					var data = Object.assign({}, stateCopy.sale, {
						idPusat: this.props.profile.idPusat,
						idCabang: this.props.profile.idCabang
					})
					
					this.props.dispatchUpdateStock(data)
					this.props.dispatchPenjualan(data)
					this.props.dispatchUpdateFilter()
					
					this._print(stateCopy)
					this._modal()
				}},
				{ text: 'Tidak' }
			])
	}

	_modal() {
		this.setState({modal: !this.state.modal})
	}

	_search(text) {
		const stateCopy = this.state
		stateCopy.search = text
		stateCopy.searchValue = []
		this.setState(stateCopy)

		for(var i in this.props.category) {
			for(var j in this.props.category[i].product) {
				if(this.props.category[i].product[j].name.toUpperCase().indexOf(stateCopy.search.toUpperCase()) > -1) {
					stateCopy.searchValue.push({ product: this.props.category[i].product[j], category: this.props.category[i] })
					stateCopy.searchVisible = true
				}
			}
		}

		this.setState(stateCopy)
	}

	render() {
		return(
			<View
				onLayout = { this._onLayout.bind(this) }
				style = { styles.container }>

				<MyModal
					top = {this.state.keyboard || this.state.width > this.state.height ? 0 : 0.5}
					left = {0.5}
					cancelable = {false}
					visible = { this.state.modal }
					onRequestClose = { this._modal.bind(this) }>
					<View style = {{ flex: 1, width: width - 20, height: height / 4, padding: 15, borderRadius: 5, backgroundColor: 'white' }}>
						<View style = {{ padding: 5, alignItems: 'center', justifyContent: 'center' }}>
							<Text style = {{ fontWeight: 'bold' }}> Pembayaran </Text>
						</View>

						<ScrollView>
							<View style = {{ flexDirection: 'row', height: 30, justifyContent: 'center' }}>
								<View style = {{ flex: 1 }}>
									<Text> Sub Total </Text>
								</View>

								<View style = {{ flex: 1, width: width / 2, alignItems: 'flex-end' }}>
									<Text> {this.state.sale.total} </Text>
								</View>
							</View>

							<View style = {{ flexDirection: 'row', height: 30, justifyContent: 'center' }}>
								<View style = {{ flex: 1 }}>
									<Text> Disc </Text>
								</View>

								<View style = {{ flex: 1, width: width / 2, alignItems: 'flex-end' }}>
									<TextInput
										ref = { (c) => this._subTotal = c }
										keyboardType = 'numeric'
										returnKeyType = 'done'
										underlineColorAndroid = 'transparent'
										onChangeText = { (text) => this.setState({discount: Number(text)}) }
										// onEndEditing = { this._updatePrice.bind(this) }
										// onSubmitEditing = { this._updatePrice.bind(this) }
										style = {{ flex: 1, padding: 0, margin: 0, width: width / 2, height: 20, color: 'gray', borderBottomWidth: 0.5, borderColor:'#ececec' }}
										value = { this.state.discount.toString() }/>
								</View>
							</View>
							
							<View style = {{ flexDirection: 'row', height: 30, justifyContent: 'center' }}>
								<View style = {{ flex: 1 }}>
									<Text> Total </Text>
								</View>
								
								<View style = {{ flex: 1, width: width / 2, alignItems: 'flex-end' }}>
									<Text> {this.state.sale.total - this.state.discount} </Text>
								</View>
							</View>
							
							<View style = {{ flexDirection: 'row', height: 30, justifyContent: 'center' }}>
								<View style = {{ flex: 1 }}>
									<Text> Tunai </Text>
								</View>

								<View style = {{ flex: 1, width: width / 2, alignItems: 'flex-end' }}>
									<TextInput
										ref = { (c) => this._change = c }
										keyboardType = 'numeric'
										returnKeyType = 'done'
										underlineColorAndroid = 'transparent'
										onChangeText = { (text) => this.setState({change: Number(text)}) }
										// onEndEditing = { this._updatePrice.bind(this) }
										// onSubmitEditing = { this._updatePrice.bind(this) }
										style = {{ flex: 1, padding: 0, margin: 0, width: width / 2, height: 20, color: 'gray', borderBottomWidth: 0.5, borderColor:'#ececec' }}
										value = { this.state.change.toString() }/>
								</View>
							</View>
							
							<View style = {{ flexDirection: 'row', height: 30, justifyContent: 'center' }}>
								<View style = {{ flex: 1 }}>
									<Text> Kembali </Text>
								</View>

								<View style = {{ flex: 1, width: width / 2, alignItems: 'flex-end' }}>
									<Text> {this.state.change - (this.state.sale.total - this.state.discount)} </Text>
								</View>
							</View>
						</ScrollView>

						<View style = {[ styles.stickyBottom, {padding: 5}]}>
							<View style = { styles.row }>
								<Button
									onPress = { this._modal.bind(this) }
									name = 'Kembali' />
								<Text>&nbsp;</Text>
								<Button
									onPress = { this._bayar.bind(this) }
									name = 'Selesai' />
							</View>
						</View>
					</View>
				</MyModal>

				<View style = {{ flex: 1, flexDirection: this.state.width > this.state.height && this.state.keyboard == false ? 'row' : 'column' }}>
					<View style = {{ flex: 1 }}>
						{/*
						*
						scan barcode
						*
						*/}
						{/*<View style = { styles.row }>
							<View style = {{ flex: 0.5 }}>
								<Button
									onPress = { this._scanQR.bind(this) }
									name = 'Scan' />
							</View>

							<View style = {{ flex: 2 }}>
								<TextInput
									ref = { (c) => this._barcode = c }
									returnKeyType = 'search'
									onChangeText = { (text) => this._search(text) }/>
							</View>
						</View>*/}

						{/*
						*
						list pembelian
						*
						*/}
						<ScrollView
							ref = { (c) => this._scrollSell = c }
							keyboardShouldPersistTaps = 'always'
							style = {{ flex: 1, marginTop: 3 }}>
							<ListView
								dataSource = {ds.cloneWithRows(this.state.sale.data)}
								enableEmptySections = {true}
								renderRow = {(content, section, index) =>
									<View style = {{ flex: 1, flexDirection: 'column', borderBottomWidth: 0.5, borderColor: '#ececec', /*backgroundColor: Number(index)%2 == 0 ? '#ccc' : 'white' */ }}>
										<View
											style = {{ flex: 1 }}>
											<View style = {{ flex: 1,flexDirection:'row' }}>
												<Text> {content.name} </Text>
												<Text>@ {rupiah(content.price)} </Text>
											</View>

											<View style = {{ flex: 1, flexDirection: 'row' }}>
												<View style = {{ flex: 0.5,flexDirection:'row',paddingLeft:5,paddingRight:5 }}>
												    <Text style={{ fontSize:11, }}>Qty :</Text>
													<TextInput
														ref = { (c) => this._quantity = c }
														keyboardType = 'numeric'
														returnKeyType = 'done'
														underlineColorAndroid = 'transparent'
														onChangeText = { (text) => this._editQuantity(Number(index), content, text) }
														onEndEditing = { this._updatePrice.bind(this) }
														onSubmitEditing = { this._updatePrice.bind(this) }
														style = {{ flex: 1, padding: 0, margin: 0, height: 20, color: 'gray', borderBottomWidth: 0.5, borderColor:'#ececec' }}
														value = { content.quantity.toString() }/>
												</View>

												<View style = {{ flex: 0.8,flexDirection:'row',paddingLeft:5 }}>
													<View style = {{ flex: 0.5, flexDirection: 'row' }}>
													<Text style={{ fontSize:11, }}>Disc :</Text>
														<TextInput
															ref = { (c) => this._disc = c }
															keyboardType = 'numeric'
															returnKeyType = 'done'
															underlineColorAndroid = 'transparent'
															onChangeText = { (text) => this._editDisc(Number(index), content, text) }
															onEndEditing = { this._updatePrice.bind(this) }
															onSubmitEditing = { this._updatePrice.bind(this) }
															style = {{ flex: 1, padding: 0, margin: 0, height: 20, color: 'gray', borderBottomWidth: 0.5, borderColor:'#ececec' }}
															value = { content.disc.toString() }/>
													</View>
													
													<View style = {{ padding: 5 }}>
														<Text> % </Text>
													</View>
												</View>

												<View style = {{ flex: 0.7, padding: 5, alignItems: 'flex-end' }}>
													<Text> {rupiah(content.subTotal)} </Text>
												</View>
											</View>
										</View>
									</View>
							}/>

							{/*<View style = {{ flex: 1, height: 50, flexDirection: 'column', borderWidth: 0.5, borderColor: 'transparent', backgroundColor: this.state.sale.data.length%2 == 0 ? '#ccc' : 'white' }}>
								<Touchable
									style = {{ justifyContent: 'center' }}
									onPress = { () => { this.props.navigation.navigate('Search', {type: 'list'}) }}>
									<Text> Pilih Produk . . . </Text>
								</Touchable>
							</View>*/}
						</ScrollView>

						{this.width > this.height && this.state.keyboard == false ?
							<View style = {{ height: 65 }} />
							:
							null
						}

						{this.width > this.height && this.state.keyboard == false ?
							<View style = { styles.stickyBottom }>
								<View style = { styles.row }>
									<View style = {{ flex: 1, flexDirection: 'row' }}>
										<View style = {{ flex: 2 }}>
											<Text> Konsumen </Text>
										</View>

										<View style = {{ flex: 1 }}>
											<TextInput
												ref = { (c) => this._disc = c }
												keyboardType = 'numeric'
												returnKeyType = 'done'
												underlineColorAndroid = 'transparent'
												onChangeText = { (text) => this._editCustomer(text) }
												onEndEditing = { () => { }}
												onSubmitEditing = { () => { }}
												style = {{ flex: 1, padding: 0, margin: 0, height: 20, color: 'gray', borderWidth: 0, borderBottomWidth:0.5, borderColor:'#ededed' }}
												value = { this.state.sale.customer.toString() }/>
										</View>
									</View>
									
									<View style = {{ flex: 1, flexDirection: 'row' }}>
										<View style = {{ flex: 1 }}>
											<Text> Total </Text>
										</View>

										<View style = {{ flex: 2, alignItems: 'flex-end' }}>
											<Text> {rupiah(this.state.sale.total)} </Text>
										</View>
									</View>
								</View>

								<View style = { styles.row }>
									<Button
										onPress = { this._clear.bind(this) }
										name = 'Hapus' />
                                    <Text>&nbsp;</Text>
									<Button
										onPress = { this._done.bind(this) }
										name = 'Bayar' />
								</View>
							</View>
							:
							<View style = { styles.row }>
								<View style = {{ flex: 1, flexDirection: 'row' }}>
									<View style = {{ flex: 2 }}>
										<Text> Konsumen </Text>
									</View>

									<View style = {{ flex: 1 }}>
										<TextInput
											ref = { (c) => this._disc = c }
											keyboardType = 'numeric'
											returnKeyType = 'done'
											underlineColorAndroid = 'transparent'
											onChangeText = { (text) => this._editCustomer(text) }
											onEndEditing = { () => { }}
											onSubmitEditing = { () => { }}
											style = {{ flex: 1, padding: 0, margin: 0, height: 20, color: 'gray', borderWidth: 0, borderBottomWidth:0.5, borderColor:'#ededed' }}
											value = { this.state.sale.customer.toString() }/>
									</View>
								</View>
								
								<View style = {{ flex: 1, flexDirection: 'row' }}>
									<View style = {{ flex: 1 }}>
										<Text> Total </Text>
									</View>

									<View style = {{ flex: 2, alignItems: 'flex-end' }}>
										<Text> {rupiah(this.state.sale.total)} </Text>
									</View>
								</View>
							</View>
						}
					</View>

					{this.state.keyboard ?
						null
						:
						<View style = {{ flex: 1, marginLeft:this.state.width > this.state.height && this.state.keyboard == false ? 2 : 0 }}>
							{/*
							*
							list inventory
							*
							*/}
							{this.width > this.height && this.state.keyboard == false ?
								<View style = { styles.row }>
									<View style = {{ flex: 2 }}>
										<TextInput
											ref = { (c) => this.__search = c }
											returnKeyType = 'search'
											placeholder = 'Search'
											value = {this.state.search}
											onChangeText = { (text) => this._search(text) }
											onSubmitEditing = { this._search.bind(this, this.state.search) }/>
									</View>

									<View style = {{ flex: 0.5 }}>
										{this.state.searchValue.length == 0 ?
											<ButtonIcons
												onPress = { this._scanQR.bind(this) }
												fontIcons = 'MaterialCommunityIcons'
												name = 'barcode-scan'
												size = { 25 }
												color = 'grey'/>
											:
											<ButtonIcons
												onPress = { () => this.setState({ searchVisible: false, searchValue: [], search: '' })}
												name = 'md-close'
												size = { 25 }
												color = 'grey'/>
										}
										{/*<Touchable
											style = {{ justifyContent: 'center', alignItems: 'center'}}
											onPress = { this._search.bind(this, this.state.search) }>
											<Ionicons
												name = 'barcode-scan'
												size = { 25 }
												color = 'grey'/>
										</Touchable>*/}
										{/*<Button
											onPress = { this._scanQR.bind(this) }
											name = 'Scan' />*/}
									</View>
								</View>
								:
								null
							}

							{this.width > this.height && this.state.keyboard == false ?
								this.state.searchVisible ?
									<View style = {{ flex: 1 }}>
										<ScrollView style = {{ flex: 1 }}>

											<ListView
												dataSource = {ds.cloneWithRows(this.state.searchValue)}
												enableEmptySections = {true}
												renderRow = {(content, section, index) =>
												<View style = { styles.category }>
													<Touchable
														onPress = { () => {
															this._addSale(content.category.idCategory, content.product)
															this.setState({ searchVisible: false }) 
														}}>
														<Text> {content.product.name} </Text>
													</Touchable>
												</View>
											}/>
										</ScrollView>
										
										{/*<View style = { styles.stickyBottom }>
											<View style = {{ flex: 1 }} >
												<View style = { styles.category }>
													<Touchable
														onPress = { () => this.setState({ searchVisible: false })}>
														<Text> Cancel </Text>
													</Touchable>
												</View>
											</View>
										</View>*/}
									</View>
									:
									null
								:
								null
							}

							{this.state.searchVisible ?
								null
								:
								<ScrollView
									style = {{ flex: 1 }}
									refreshControl = { this._renderRefresh() }>
									{this.props.category == null ?
										<View style = {{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
											<Text> Tidak ada data </Text>
										</View>
										:
										<ListView
											contentContainerStyle = {{ flex: 1, /*flexDirection: 'row', flexWrap: 'wrap'*/ }}
											dataSource = {ds.cloneWithRows(this.props.category)}
											enableEmptySections = {true}
											renderRow = {(content, section, index) =>
											/*
											*
											list category
											*
											*/
											<View>
												{	/*
													*
													offline
													*
													*/
													/*this.props.profile ?
													content.idCabang === this.props.profile.idCabang ?*/
														<View style = {{ flex: 1, /*width: (width / 3) - 10,*/ marginLeft: 2, marginRight: 2 }}>
															<View 
																// onLayout = {(evt) => this.height1 = evt.nativeEvent.layout.width}
																style = {[ styles.category, {/*height: this.height1*/}]}>
																<Touchable
																	style = {{ /*height: this.height1,*/ alignItems: 'center', justifyContent: 'center' }}
																	onPress = { this._collapse.bind(this, Number(index)) }>
																	<View style = {{ flexDirection: 'row' }}>
																		<View style = {{ flexDirection: 'column' }}>
																			<Text> {content.name} </Text>
																		</View>
																	</View>
																</Touchable>
															</View>

															{this.state.view[Number(index)] ?
																/*
																*
																list product
																*
																*/
																<ListView
																	contentContainerStyle = {{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}
																	dataSource = {ds.cloneWithRows(content.product)}
																	enableEmptySections = {true}
																	renderRow = {(product, section, idx) =>
																		<View style = {{ /*flex: 1,*/ width: (width / 3) - 10, marginLeft: 2, marginRight: 2 }}>
																			<View
																				style = {[ styles.category, { /*marginLeft: 10,*/ /*flexDirection:'row', width:'20%', */height: (width / 3) - 10, alignItems: 'center'}]}>
																				<Touchable
																	        // style = {{ height: this.height1 - 10 }}
																					onPress = { this._addSale.bind(this, content.idCategory, product) }>
																					<View style = {{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
																						<Text> {product.name} </Text>
																					</View>
																				</Touchable>

																				<ButtonIcons
																					onPress = { this._collapseSubProduct.bind(this, Number(index) + Number(idx)) }
																					name = { this.state.viewSubProduct[Number(index) + Number(idx)] ? 'ios-arrow-up' : 'ios-arrow-down' }
																					color = 'grey'
																					size = { 20 }/>
																			</View>

																			{this.state.viewSubProduct[Number(index) + Number(idx)] ?
																				/*
																				*
																				list sub product
																				*
																				*/
																				<ListView
																					contentContainerStyle = {{alignItems: 'center'}}
																					dataSource = {ds.cloneWithRows(product.subProduct)}
																					enableEmptySections = {true}
																					renderRow = {(subProduct, section, row) =>
																					<View style = {[ styles.category, {width: (width / 3) - 20, height: (width / 3) - 20 /*this.height1 - 20*/ }]}>
																						<Touchable
																							// style = {{height: this.height1 - 20 }}
																							onPress = { this._addSaleSubProduct.bind(this, content.idCategory, product.idProduct, subProduct) }>
																							<View style = {{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
																								<Text> {subProduct.name} </Text>
																							</View>
																						</Touchable>
																					</View>
																				}/>
																				:
																				null
																			}
																		</View>
																}/>
																:
																null
															}
														</View>
														/*:
														null
													:
													null*/
												}
											</View>
										}/>
									}
								</ScrollView>
							}

							{this.width > this.height && this.state.keyboard == false ?
								null
								:
								<View>
									<View style = {{height: 45 }}/>

									<View style = { styles.stickyBottom }>
										<View style = { styles.row }>
											<Button
												onPress = { this._clear.bind(this) }
												name = 'Hapus' />
								            <Text>&nbsp;</Text>
											<Button
												onPress = { this._done.bind(this) }
												name = 'Bayar' />
										</View>
									</View>
								</View>
							}
						</View>
					}
				</View>
			</View>
		)
	}

	_onLayout(evt) {
		this.props.navigation.setParams({
			width: evt.nativeEvent.layout.width,
			height: evt.nativeEvent.layout.height,
			keyboard: this.state.keyboard
		})

		this.width = evt.nativeEvent.layout.width
		this.height = evt.nativeEvent.layout.height

		this.setState({
			width: evt.nativeEvent.layout.width,
			height: evt.nativeEvent.layout.height
		})
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
		padding: 5,
		backgroundColor: 'white'
	},
	row: {
		flexDirection: 'row'
	},
	stickyBottom: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0
	},
	category: {
		// paddingLeft: 10,
		marginTop: 2.5,
		marginBottom: 2.5,
		borderRadius: 5,
		minHeight:50,
		borderWidth: 0.5,
		borderColor: '#f2c9a0',
		backgroundColor: '#fcecc2',
		justifyContent: 'center'
	}
})


function mapStateToProps (state) {
	return {
		category: state.category.data,
		refreshing: state.category.refreshing,
		profile: state.user.data,
		device: state.user.device
	}
}

function mapDispatchToProps (dispatch) {
	return {
		dispatchRefreshing: (data) => dispatch(refreshing(data)),
		dispatchUpdateStock: (data) => dispatch(updateStock(data)),
		dispatchPenjualan: (data) => dispatch(penjualan(data)),
		dispatchUpdateFilter: (data) => dispatch(updateFilter(data))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SaleScreen)