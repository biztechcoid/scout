import React from 'react'
import {
	TouchableNativeFeedback,
	TouchableOpacity,
	Platform,
	View
} from 'react-native'

const defaultProps = {
	pressColor: '#1e8da5',
	style: {}
}

class Touchable extends React.Component {
	render() {
		if(Platform.OS == 'android' && Platform.Version >= 21) {
			return (
				<TouchableNativeFeedback
					ref = { this.props.ref }
					background = { TouchableNativeFeedback.Ripple(this.props.pressColor, true) }
					onPress = { this.props.onPress == null ? null : this.props.onPress.bind(this) } >
					<View style = { this.props.style }>
						{ this.props.children }
					</View>
				</TouchableNativeFeedback>
			)
		}

		return (
			<TouchableOpacity
				ref = { this.props.ref }
				style = { this.props.style }
				onPress = { this.props.onPress == null ? null : this.props.onPress.bind(this) } >
				{ this.props.children }
			</TouchableOpacity>
		)
	}
}

Touchable.defaultProps = defaultProps

module.exports = Touchable