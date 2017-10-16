import React from 'react'
import {
	StyleSheet,
	View,
	Text,
	TouchableNativeFeedback,
	TouchableOpacity,
	Platform
} from 'react-native'

const defaultProps = {
	color: '#1e8da5',
	pressColor: 'white',
	name: 'Button',
	textStyle: {}
}

class Button extends React.Component {
	render() {
		if(Platform.OS == 'android' && Platform.Version >= 21) {
			return (
				<View style = { styles.container }>
					<View style = {[ styles.button, { backgroundColor: this.props.color }]}>
						<TouchableNativeFeedback
							background = { TouchableNativeFeedback.Ripple(this.props.pressColor, true) }
							onPress = { this.props.onPress.bind(this) }>
							<View style = { styles.opacity }>
								<Text style = {[ styles.textStyle, this.props.textStyle ]}> { this.props.name } </Text>
							</View>
						</TouchableNativeFeedback>
					</View>
				</View>
			)
		}

		return (
			<View style = { styles.container }>
				<TouchableOpacity
					activeOpacity = {0.8}
					style = {[ styles.button, { backgroundColor: this.props.color }]}
					onPress = { this.props.onPress.bind(this) }>
					<View style = { styles.opacity }>
						<Text style = {[ styles.textStyle, this.props.textStyle ]}> { this.props.name } </Text>
					</View>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles =  StyleSheet.create({
	container: {
		flex: 1
	},
	button: {
		height: 40,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#ccc'
	},
	opacity: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold'
	}
})

Button.defaultProps = defaultProps

module.exports = Button