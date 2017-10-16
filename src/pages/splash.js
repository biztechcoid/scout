import React from 'react'
import {
	AsyncStorage,
	Text,
	View
} from 'react-native'

import { connect } from 'react-redux'
import { setUser } from '../redux/actions'

class SplashScreen extends React.Component {
	render() {
		return(
			<View style = {{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#61b5c7' }}>
				<Text> Splash </Text>
			</View>
		)
	}

	next(pages) {
		setTimeout(() => {
			this.props.navigation.dispatch({
				type: 'Navigation/RESET',
				index: 0,
				actions: [{ type: 'Navigation/NAVIGATE', routeName: pages }]
			})
		}, 3000)
	}

	componentDidMount() {
		AsyncStorage.getItem('@User', (err, res) => {
			if(err) {
				return true
			}

			if(res == null) {
				/*
				tidak ada token
				*/
				this.next('Login')
				/**/
			} else {
				/*
				ada token
				*/
				const newRes = JSON.parse(res)
				this.props.dispatchSetUser(newRes)
				switch(newRes.level) {
					case 'manager':
						return this.next('HomeManager')

					case 'sales':
						return this.next('HomeSales')

					default:
						return this.next('Home')
				}
				/**/
			}
		})
	}
}


function mapStateToProps (state) {
	return {

	}
}

function mapDispatchToProps (dispatch) {
	return {
		dispatchSetUser: (data) => dispatch(setUser(data))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SplashScreen)