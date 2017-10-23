import React from 'react'
import {
	Dimensions,
	View,
	RefreshControl,
	Picker,
	ScrollView,
	StyleSheet,
	Text,
	TextInput
} from 'react-native'
const { width, height } = Dimensions.get('window')

import { connect } from 'react-redux'
import { 
} from '../../redux/actions'

import {
	Button,
	ButtonIcons
} from '../../components'

import {
	ddmmyyyy,
	mmyyyy,
	yyyy
} from '../../modules'

const first = new Date().getDate() - new Date().getDay()


class ReportScreen extends React.Component {
	static navigationOptions = ({ navigation }) => ({
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
		date: new Date()
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
				break

			case 'weekly':
				this.setState({
					date: new Date(new Date(this.state.date).setDate(new Date(this.state.date).getDate() - 7))
				})
				break

			case 'monthly':
				this.setState({
					date: new Date(new Date(this.state.date).setMonth(new Date(this.state.date).getMonth() - 1))
				})
				break

			case 'yearly':
				this.setState({
					date: new Date(new Date(this.state.date).setYear(new Date(this.state.date).getFullYear() - 1))
				})
				break
		}
	}

	_next() {
		switch(this.state.value) {
			case 'daily':
				this.setState({
					date: new Date(new Date(this.state.date).setDate(new Date(this.state.date).getDate() + 1))
				})
				break

			case 'weekly':
				this.setState({
					date: new Date(new Date(this.state.date).setDate(new Date(this.state.date).getDate() + 7))
				})
				break

			case 'monthly':
				this.setState({
					date: new Date(new Date(this.state.date).setMonth(new Date(this.state.date).getMonth() + 1))
				})
				break

			case 'yearly':
				this.setState({
					date: new Date(new Date(this.state.date).setYear(new Date(this.state.date).getFullYear() + 1))
				})
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
				break

			case 'weekly':
				this.setState({
					value: item,
					date: new Date(new Date().setDate(first))
				})
				break

			case 'monthly':
				this.setState({
					value: item,
					date: new Date()
				})
				break

			case 'yearly':
				this.setState({
					value: item,
					date: new Date()
				})
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
							<Picker.Item label = 'Daily' value = 'daily' />
							<Picker.Item label = 'Weekly' value = 'weekly' />
							<Picker.Item label = 'Monthly' value = 'monthly' />
							<Picker.Item label = 'Yearly' value = 'yearly' />
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
					{this.props.sale.map((content, index) => {
						return (
							<View
								key = { index }
								style = {{ flex: 1, flexDirection: 'column' }}>
								<View
									style = { styles.category }>
									<View style = {{ flexDirection: 'row' }}>
										<Text> {index + 1}. </Text>
										<Text> {content.idTransaction} </Text>
									</View>

									<Text> {new Date(content.date).getDate()}-{new Date(content.date).getMonth()}-{new Date(content.date).getFullYear()} {new Date(content.date).getHours()}:{new Date(content.date).getMinutes()}:{new Date(content.date).getSeconds()} </Text>
								</View>

								{content.data == undefined ? null : content.data.map((product, idx) => {
									return (
										<View
											key = { idx }
											style = {[ styles.category, { marginLeft: 10 }]}>
											<View style = {{ flexDirection: 'row' }}>
												<Text> {idx + 1}. </Text>
												<Text> {product.name} </Text>
											</View>

											<View style = {{ flexDirection: 'row' }}>
												<Text> {product.quantity} </Text>
												<Text> {product.price} </Text>
												<Text> {product.disc} % </Text>
												<Text> {product.subTotal} </Text>
											</View>
										</View>
									)
								})}
							</View>
						)
					})}
				</ScrollView>

				<View style = {{height: 20 }}/>

				<View style = { styles.stickyBottom }>
					<View style = { styles.row }>
						<View style = {{ flex: 1 }}>
							<Text> Total </Text>
						</View>

						<View style = {{ flex: 2, alignItems: 'flex-end' }}>
							<Text> 0.00 </Text>
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
		flex: 1,
		padding: 5,
		marginTop: 2.5,
		marginBottom: 2.5,
		borderRadius: 5,
		borderWidth: 0.5,
		borderColor: 'darkgrey',
		backgroundColor: '#ccc'
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