import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	Text,
	TouchableNativeFeedback,
	TouchableOpacity,
	Platform
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const defaultProps = {
	color: 'black',
	pressColor: 'blue',
	icons: 'Button',
	style: {}
}


class ButtonIcons extends Component {
	_icons(fontIcons, name, size, color) {
		switch(fontIcons) {
			case 'MaterialCommunityIcons':
				return <MaterialCommunityIcons
					name = { name }
					size = { size }
					color = { color } />

			default:
				return <Ionicons
					name = { name }
					size = { size }
					color = { color } />
		}
	}

	render() {
		if(Platform.OS == 'android' && Platform.Version >= 21) {
			return (
				<View style = {[ this.props.style, styles.button ]}>
					<TouchableNativeFeedback
						background = { TouchableNativeFeedback.Ripple(this.props.pressColor, true) }
						onPress = { this.props.onPress }>
						<View style = { styles.container }>
							{ this._icons(this.props.fontIcons, this.props.name, this.props.size, this.props.color) }
						</View>
					</TouchableNativeFeedback>
				</View>
			)
		}

		return (
			<View style = {[ this.props.style, styles.button ]}>
				<TouchableOpacity
					style = { styles.container }
					onPress = { this.props.onPress }>
					{ this._icons(this.props.fontIcons, this.props.name, this.props.size, this.props.color) }
				</TouchableOpacity>
			</View>
		)
	}
}

const styles =  StyleSheet.create({
	button: {
		width: 50,
		height: 50
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
})

ButtonIcons.defaultProps = defaultProps

module.exports = ButtonIcons