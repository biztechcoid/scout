import React from 'react'
import {
	View,
	RefreshControl,
	ScrollView,
	StyleSheet,
	Text,
	TextInput
} from 'react-native'

import { connect } from 'react-redux'
import { collapse, refreshing } from '../../redux/actions'

import {
	Button,
	ButtonIcons,
	Touchable
} from '../../components'


class SaleScreen extends React.Component {
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
		view: [],
		sale: []
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

	_addSale(product) {
		const stateCopy = this.state

		stateCopy.sale.splice(0, 0, product)

		console.log(stateCopy.product)
		this.setState(stateCopy)
	}

	render() {
		return(
			<View style = { styles.container }>
				<View style = { styles.row }>
					<View style = {{ flex: 0.5 }}>
						<Button
							onPress = { this._scanQR.bind(this) }
							name = 'Scan' />
					</View>

					<View style = {{ flex: 2 }}>
						<TextInput />
					</View>
				</View>

				<ScrollView
					style = {{ flex: 1 }}>
					{this.state.sale.map((content, index) => {
						return <Text key = { index} > {content} </Text>
					})}
				</ScrollView>

				<View style = { styles.row }>
					<View style = {{ flex: 1 }}>
						<Text> Total </Text>
					</View>

					<View style = {{ flex: 2, alignItems: 'flex-end' }}>
						<Text> 0.00 </Text>
					</View>
				</View>

				<ScrollView
					style = {{ flex: 1 }}
					refreshControl = { this._renderRefresh() }>
					{this.props.category.map((content, index) => {
						return (
							<View
								key = { index }
								style = {{ flex: 1, flexDirection: 'column' }}>
								<View style = { styles.category }>
									<Touchable
										style = {{ flex: 1, flexDirection: 'row' }}
										onPress = { this._collapse.bind(this, index) }>
										<Text> {index + 1}. </Text>
										<Text> {content.category} </Text>
									</Touchable>
								</View>

								{content.product.map((product, idx) => {
									return (
										<View
											key = { idx }>
											{this.state.view[index] ?
												<View
													style = {[ styles.category, { marginLeft: 10 }]}>
													<Touchable
														style = {{ flex: 1, flexDirection: 'row' }}
														onPress = { this._addSale.bind(this, product.name) }>
														<Text> {idx + 1}. </Text>
														<Text> {product.name} </Text>
													</Touchable>
												</View>
												:
												null
											}
										</View>
									)
								})}
							</View>
						)
					})}
				</ScrollView>

				<View style = {{height: 45 }}/>

				<View style = { styles.stickyBottom }>
					<View style = { styles.row }>
						<Button
							onPress = { () => console.log('clear') }
							name = 'Clear' />

						<Button
							onPress = { () => console.log('done') }
							name = 'Done' />
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
		flexDirection: 'row',
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
		category: state.category.data,
		refreshing: state.category.refreshing
	}
}

function mapDispatchToProps (dispatch) {
	return {
		dispatchCollapse: (data) => dispatch(collapse(data)),
		dispatchRefreshing: (data) => dispatch(refreshing(data))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SaleScreen)