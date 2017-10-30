import React from 'react'
import {
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View
} from 'react-native'

import { connect } from 'react-redux'
import {
	
} from '../redux/actions'

import {
	ButtonIcons,
	Touchable
} from '../components'

import {
	
} from '../modules'


class ListProductScreen extends React.Component {
	state = {
		search: []
	}

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

	render() {
		return(
			<View style = {{ flex: 1 }}>
				<View style = {{ height: 55, flexDirection: 'row', backgroundColor: '#6ecbe0' }}>
					<ButtonIcons
						onPress = { () => { this.props.navigation.goBack() }}
						name = 'md-menu'
						color = 'white'
						size = { 30 }/>

					<TextInput
						ref = { (c) => this._barcode = c }
						style = {{ flex: 1 }}
						returnKeyType = 'search'
						onChangeText = { (text) => this._search(text) }/>
				</View>

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
			</View>
		)
	}
}

const styles = StyleSheet.create({
	
})


function mapStateToProps (state) {
	return {
		category: state.category.data
	}
}

function mapDispatchToProps (dispatch) {
	return {
		
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ListProductScreen)