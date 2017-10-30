import React from 'react'
import {
	RefreshControl,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
	Platform
} from 'react-native'

import { connect } from 'react-redux'
import {
	
} from '../redux/actions'

import {
	ButtonIcons,
	Touchable
} from '../components'

import {
	rupiah
} from '../modules'


class SearchScreen extends React.Component {
	state = {
		/* collapse */
		view: [],

		/* list search */
		search: [],

		/* search in list product */
		_search: false
	}

	/*
	*
	search
	*
	*/
	_search(text) {
		const stateCopy = this.state
		stateCopy.search = []

		for(var i in this.props.category) {
			for(var j in this.props.category[i].product) {
				if(this.props.category[i].product[j].name.toUpperCase().indexOf(text.toUpperCase()) > -1) {
					stateCopy.search.push(this.props.category[i].product[j])
				}
			}
		}

		this.setState(stateCopy)
	}

	_getSearch(content) {
		this.props.navigation.goBack()
	}
	/**/

	/*
	*
	refresh
	*
	*/
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
	/**/

	/*
	*collapse
	*
	*/
	_collapse(index) {
		const stateCopy = this.state

		stateCopy.view[index] = !stateCopy.view[index]

		this.setState(stateCopy)
	}
	/**/

	render() {
		return(
			<View style = {{ flex: 1 }}>
				<View style = {{ height: 55, flexDirection: 'row', backgroundColor: '#6ecbe0' }}>
					<ButtonIcons
						onPress = { () => { this.props.navigation.goBack() }}
						name = 'md-menu'
						color = 'white'
						size = { 30 }/>

					{this.props.navigation.state.params.type == 'search' ?
						<TextInput
							ref = { (c) => this._barcode = c }
							style = {{ flex: 1 }}
							returnKeyType = 'search'
							onChangeText = { (text) => this._search(text) }/>
						:
						this.state._search ?
							<TextInput
								ref = { (c) => this._barcode = c }
								style = {{ flex: 1 }}
								returnKeyType = 'search'
								onChangeText = { (text) => this._search(text) }/>
							:
							<View style = {{ flex: 1, flexDirection: 'row' }}>
								<View style = {{ flex: 1, justifyContent: 'center' }}>
									<Text style = { styles.title }> List Produk </Text>
								</View>

								<ButtonIcons
									onPress = { () => { this.setState({_search: true}) }}
									name = 'md-search'
									color = 'white'
									size = { 30 }/>
							</View>
					}
				</View>

				{this.props.navigation.state.params.type == 'search' ?
					<ScrollView
						keyboardShouldPersistTaps = 'always'>
						{this.state.search.map((content, index) => {
							return (
								<View
									key = { index }
									style = {{ height: 50, backgroundColor: index%2 == 0 ? '#ccc' : 'white' }}>
									<Touchable
										style = {{ justifyContent: 'center' }}
										onPress = { this._getSearch.bind(this, content) }>
										<Text> {content.name} </Text>
									</Touchable>
								</View>
							)
						})}
					</ScrollView>
					:
					this.state._search ?
						<ScrollView
							keyboardShouldPersistTaps = 'always'>
							{this.state.search.map((content, index) => {
								return (
									<View
										key = { index }
										style = {{ height: 50, backgroundColor: index%2 == 0 ? '#ccc' : 'white' }}>
										<Touchable
											style = {{ justifyContent: 'center' }}
											onPress = { this._getSearch.bind(this, content) }>
											<Text> {content.name} </Text>
										</Touchable>
									</View>
								)
							})}
						</ScrollView>
						:
						<ScrollView
							style = {{ flex: 1, margin: 5 }}
							refreshControl = { this._renderRefresh() }>
							{this.props.category.map((content, index) => {
								/*
								*
								list category
								*
								*/
								return (
									<View
										key = { index }
										style = {{ flex: 1 }}>
										<View style = { styles.category }>
											<Touchable
												style = {{ height: 40, justifyContent: 'center' }}
												onPress = { this._collapse.bind(this, index) }>
												<View style = {{ flexDirection: 'row' }}>
													<Text> {index + 1}. </Text>
													
													<View style = {{ flexDirection: 'column' }}>
														<Text> {content.name} </Text>
													</View>
												</View>
											</Touchable>
										</View>

										{content.product.map((product, idx) => {
											/*
											*
											list product
											*
											*/
											return (
												<View
													key = { idx }>
													{this.state.view[index] ?
														<View
															style = {[ styles.category, { marginLeft: 10 }]}>
															<Touchable
																onPress = { () => {} /*this._addSale.bind(this, content.idCategory, product)*/ }>
																<View style = {{ flex: 1, flexDirection: 'row' }}>
																	<Text> {idx + 1}. </Text>

																	<View style = {{ flex: 1, flexDirection: 'column' }}>
																		<View style = {{ flex: 1 }}>
																			<Text> {product.name} </Text>
																		</View>

																		<View style = {{ flex: 1, flexDirection: 'row' }}>
																			<View style = {{ flex: 1 }}>
																				<Text> qty: {product.quantity} </Text>
																			</View>

																			<View style = {{ flex: 1 }}>
																				<Text> price: {rupiah(product.price)} </Text>
																			</View>
																		</View>
																	</View>
																</View>
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
				}
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
		left: 0,
		right: 0,
		bottom: 0
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
	},
	title: {
		fontSize: Platform.OS === 'ios' ? 17 : 20,
		fontWeight: Platform.OS === 'ios' ? '600' : '500',
		color: 'white',
		textAlign: Platform.OS === 'ios' ? 'center' : 'left',
		marginHorizontal: 16,
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
		
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchScreen)