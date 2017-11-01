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
import { barcodeProduct } from '../../redux/actions/category'


class ScanQRScreen extends React.Component {
	onSuccess(e) {
		switch(this.props.navigation.state.params.type) {
			case 'barcodeProduct':
				this.props.dispatchBarcodeProduct(e.data)
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
					topContent = {null}
					bottomContent = {
						<TouchableOpacity>
							<Text onPress = { () => this.props.navigation.dispatch(back) }> back </Text>
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
		dispatchBarcodeProduct: (data) => dispatch(barcodeProduct(data))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ScanQRScreen)