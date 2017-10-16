import React from 'react'
import {
	View,
	Text,
	TouchableOpacity
} from 'react-native'

import QRCodeScanner from 'react-native-qrcode-scanner'
import { NavigationActions } from 'react-navigation'
var back = NavigationActions.back({key: null})

import { connect } from 'react-redux'
import { addCategory } from '../redux/actions/category'


class ScanQRScreen extends React.Component {
	onSuccess(e) {
		switch(this.props.navigation.state.params.type) {
			case 'addCategory':
				this.props.dispatchAddCategory(e.data)
				this.props.navigation.dispatch(back)
				break

			default:
				this.props.navigation.dispatch(back)
				break
		}
	}

	render() {
		return(
			<View style={{flex: 1}}>
				<QRCodeScanner
					style={{flex: 1}}
					title = 'Scan Code'
					onRead = { this.onSuccess.bind(this) }
					topContent = {
						<Text>
							Go to <Text>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
						</Text>
					}
					bottomContent = {
						<TouchableOpacity>
							<Text onPress = { () => this.props.navigation.dispatch(back) }>OK. Got it! </Text>
						</TouchableOpacity>
					} />
			</View>
		)
	}
}


function mapStateToProps (state) {
	return {
		
	}
}

function mapDispatchToProps (dispatch) {
	return {
		dispatchAddCategory: (data) => dispatch(addCategory(data))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ScanQRScreen)