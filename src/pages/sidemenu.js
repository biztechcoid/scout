import React from 'react'
import {
	AsyncStorage,
	Text,
	View
} from 'react-native'

import { connect } from 'react-redux'
import { logout } from '../redux/actions'

import {
	Touchable
} from '../components'

import {
	date
} from '../modules'


class SideMenuScreen extends React.Component {
	_logout() {
		this.props.dispatchLogout(this.props.screenProps)
	}

	render() {
		return (
			<View>
				{this.props.user ?
					<View style = {{ padding: 5 }}>
						<View style = {{ flexDirection: 'row' }}>
							<View>
								<Text> Email </Text>
								<Text> Name </Text>
								<Text> Level </Text>
								<Text> Last Login </Text>
							</View>

							<View>
								<Text> : { this.props.user.email } </Text>
								<Text> : { this.props.user.name } </Text>
								<Text> : { this.props.user.level } </Text>
								<Text> : { date(this.props.user.lastLogin) } </Text>
							</View>
						</View>
					</View>
					:
					null
				}

				<View style = {{ height: 40, borderWidth: 0.5, borderColor: '#ccc' }}>
					<Touchable
						style = {{ justifyContent: 'center' }}
						onPress = { this._logout.bind(this) }>
						<Text> Logout </Text>
					</Touchable>
				</View>
			</View>
		)
	}
}


function mapStateToProps (state) {
	return {
		user: state.user.data
	}
}

function mapDispatchToProps (dispatch) {
	return {
		dispatchLogout: (data) => dispatch(logout(data))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SideMenuScreen)