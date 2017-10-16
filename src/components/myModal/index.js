import React from 'react'
import {
	Modal,
	View,
	TouchableOpacity,
} from 'react-native'

const defaultProps = {
	animationType: 'fade',
	top: 1,
	left: 1
}

class MyModal extends React.Component {
	render() {
		return (
			<Modal
				animationType = { this.props.animationType }
				transparent = { true }
				visible = { this.props.visible }
				onRequestClose = { this.props.onRequestClose }>
				<TouchableOpacity
					activeOpacity = { 1 }
					onPress = { this.props.onRequestClose }
					style = {{ flex: this.props.top, backgroundColor: 'rgba(0, 0, 0, .5)' }}/>
					
				<View style = {[{ flex: 1, flexDirection: 'row' }, this.props.contentStyle ]}>
					<TouchableOpacity
						activeOpacity = { 1 }
						onPress = { this.props.onRequestClose }
						style = {{ flex: this.props.left, backgroundColor: 'rgba(0, 0, 0, .5)' }}/>

					<View style = {{ backgroundColor: 'rgba(0, 0, 0, .5)' }}>
						{ this.props.children }
					</View>

					<TouchableOpacity
						activeOpacity = { 1 }
						onPress = { this.props.onRequestClose }
						style = {{ flex: this.props.left, backgroundColor: 'rgba(0, 0, 0, .5)' }}/>
				</View>

				<TouchableOpacity
					activeOpacity = { 1 }
					onPress = { this.props.onRequestClose }
					style = {{ flex: this.props.top, backgroundColor: 'rgba(0, 0, 0, .5)' }}/>
			</Modal>
		)
	}
}

MyModal.defaultProps = defaultProps

module.exports = MyModal