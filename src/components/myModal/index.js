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

/*
*
example
*
*/
/*
<MyModal
	visible = { this.state.visible }
	top = {0.5}
	left = {0.5}
	contentStyle = {{ flex: 3 }}
	onRequestClose = { this._setModalVisible.bind(this, false) }>
	<View style = {{ flex: 1, width: width - 20, height: height - 100, padding: 5, borderRadius: 5, backgroundColor: 'white' }}>
		<View style = { styles.stickyBottom }>
			<View style = { styles.row }>
				<Button
					onPress = { () => this.setState({ idProduct: null,
						barcode: null,
						product: null,
						cost: null,
						price: null,
						quantity: null })}
					name = 'Clear'/>

				<Button
					onPress = { this._addProduct.bind(this) }
					name = 'Add'/>
			</View>
		</View>
	</View>
</MyModal>
*/
/**/

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