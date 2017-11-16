import React from 'react'
import {
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

import { connect } from 'react-redux'
import { 
} from '../../redux/actions'

import {
	Button,
	ButtonIcons,
	Touchable
} from '../../components'

import {
	ddmmyyyy,
	mmyyyy,
	yyyy,
	rupiah
} from '../../modules'

const first = new Date().getDate() - new Date().getDay()
const total = 0
const customer = 0
const no = 0
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})


class ReportScreen extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		headerStyle: {
			backgroundColor: '#6ecbe0'
		},
		headerLeft: (
			<ButtonIcons
				onPress = { () => { navigation.navigate('DrawerOpen') }}
				name = 'md-menu'
				color = 'white'
				size = { 30 }/>
		)
	})

	state = {
		value: 'daily',
		date: new Date(),
		view: []
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
		switch(this.state.value) {
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
		}
	}

	_next() {
		switch(this.state.value) {
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
		}
	}

	_value(item) {
		switch(item) {
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
		}
	}

	_collapse(index) {
		const stateCopy = this.state

		stateCopy.view[index] = !stateCopy.view[index]

		this.setState(stateCopy)
	}

	_renderValue(content, index) {
		total = 0
		customer = 0
		no = 0
		switch(this.state.value) {
			case 'daily':
				if(new Date(new Date(content.date).getFullYear(), new Date(content.date).getMonth(), new Date(content.date).getDate()).getTime() == new Date(this.state.date.getFullYear(), this.state.date.getMonth(), this.state.date.getDate()).getTime()) {
					total +=content.total
					customer +=content.customer
					no += 1
					return true
				} else {
					return false
				}
				break

			case 'weekly':
				if(new Date(new Date(content.date).getFullYear(), new Date(content.date).getMonth(), new Date(content.date).getDate()).getTime() >= new Date(this.state.date.getFullYear(), this.state.date.getMonth(), this.state.date.getDate()).getTime() && new Date(new Date(content.date).getFullYear(), new Date(content.date).getMonth(), new Date(content.date).getDate()).getTime() <= new Date(this.state.date.getFullYear(), this.state.date.getMonth(), this.state.date.getDate() + 6).getTime()) {
					total +=content.total
					customer +=content.customer
					no += 1
					return true
				} else {
					return false
				}
				break

			case 'monthly':
				if(new Date(new Date(content.date).getFullYear(), new Date(content.date).getMonth()).getTime() == new Date(this.state.date.getFullYear(), this.state.date.getMonth()).getTime()) {
					total +=content.total
					customer +=content.customer
					no += 1
					return true
				} else {
					return false
				}
				break

			case 'yearly':
				if(new Date(new Date(content.date).getFullYear()).getTime() == new Date(this.state.date.getFullYear()).getTime()) {
					total +=content.total
					customer +=content.customer
					no += 1
					return true
				} else {
					return false
				}
				break
		}
	}

	render() {
		return(
			<View style = { styles.container }>
				<View style = { styles.row }>
					<View style = {{ flex: 1 }}>
						<Picker
							mode = 'dropdown'
							selectedValue = { this.state.value }
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
						{this.state.value == 'daily' ?
							<Text> { ddmmyyyy(this.state.date) } </Text>
							:
							this.state.value == 'weekly' ?
								<View style = {{ flex: 1, justifyContent: 'center' }}>
									<Text> { ddmmyyyy(this.state.date) } - </Text>
									<Text> { ddmmyyyy(new Date(new Date(this.state.date).setDate(new Date(this.state.date).getDate() + 6))) } </Text>
								</View>
								:
								this.state.value == 'monthly' ?
									<Text> { mmyyyy(this.state.date) } </Text>
									:
									<Text> { yyyy(this.state.date) } </Text>
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
							dataSource = {ds.cloneWithRows(this.props.sale)}
							enableEmptySections = {true}
							renderRow = {(content, section, index) => 
							<View>
								{this._renderValue(content, Number(index)) ?
									<View style = {{ flex: 1, flexDirection: 'column' }}>
										<View style = { styles.category }>
											<Touchable
												style = {{ flexDirection: 'row' }}
												onPress = { this._collapse.bind(this, Number(index)) }>
												<View style = {{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
													<Text> {no}. </Text>
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
									:
									null
								}
							</View>
						}/>
					}
				</ScrollView>

				<View style = {{height: 35 }}/>

				<View style = { styles.stickyBottom }>
					<View style = { styles.row }>
						<View style = {{ flex: 1, flexDirection: 'row' }}>
							<View style = {{ flex: 1 }}>
								<Text> Konsumen </Text>
							</View>

							<View style = {{ flex: 1, alignItems: 'center' }}>
								<Text> {customer} </Text>
							</View>	
						</View>

						<View style = {{ flex: 1, flexDirection: 'row' }}>
							<View style = {{ flex: 1 }}>
								<Text> Total Transaksi </Text>
							</View>

							<View style = {{ flex: 0.5, alignItems: 'flex-end' }}>
								<Text> {no} </Text>
							</View>	
						</View>
					</View>

					<View style = {{ flex: 1, flexDirection: 'row', borderBottomWidth:0.5,borderColor:'#ededed' }}>
						<View style = {{ flex: 1 }}>
							<Text> Total </Text>
						</View>

						<View style = {{ flex: 1, alignItems: 'flex-end' }}>
							<Text> {rupiah(total)} </Text>
						</View>	
					</View>
				</View>
			</View>
		)
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
		sale: state.sale.data
	}
}

function mapDispatchToProps (dispatch) {
	return {
		
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ReportScreen)