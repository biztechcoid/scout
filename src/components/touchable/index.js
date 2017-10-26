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

/*
*
example
*
*/
/*
<Touchable
	onPress = { this._deleteCategory.bind(this, content) }>
	<Text> X </Text>
</Touchable>
*/
/**/

class Touchable extends React.Component {
	render() {
		if(Platform.OS == 'android' && Platform.Version >= 21) {
			return (
				<TouchableNativeFeedback
					ref = { this.props.ref }
					background = { TouchableNativeFeedback.Ripple(this.props.pressColor, true) }
					onPress = { this.props.onPress == null ? null : this.props.onPress.bind(this) } >
					<View style = {[ this.props.style, { flex: 1 }]}>
						{ this.props.children }
					</View>
				</TouchableNativeFeedback>
			)
		}

		return (
			<TouchableOpacity
				ref = { this.props.ref }
				style = {[ this.props.style, { flex: 1 }]}
				onPress = { this.props.onPress == null ? null : this.props.onPress.bind(this) } >
				{ this.props.children }
			</TouchableOpacity>
		)
	}
}

Touchable.defaultProps = defaultProps

module.exports = Touchable