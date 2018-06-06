import React from 'react'
import {
	FlatList,
	StyleSheet,
	Text,
	View
} from 'react-native'
import { connect } from 'react-redux'

import {
	Button
} from '../../components'


class ListUsersScreen extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Daftar User'
	})

	render() {
		return (
			<View style = {{flex: 1, backgroundColor: 'white', padding: 5}}>
				<FlatList
					data = {this.props.users}
					extraData = {this.state}
					keyExtractor = {(item, index) => index}
					renderItem = {({item, index}) =>
						<View style = {styles.category}>
							<View>
								<Text> Name </Text>
								<Text> Cabang </Text>
								<Text> Email </Text>
								<Text> Phone </Text>
							</View>

							<View>
								<Text> : {item.name} </Text>
								<Text> : {item.cabangName} </Text>
								<Text> : {item.email} </Text>
								<Text> : {item.phone} </Text>
							</View>
						</View>
					}
				/>

				<View style={styles.stickyBottom}>
					<View>
						<Button
							onPress = {() => this.props.navigation.navigate('Register', {type: 'Tambah User'})}
							name = 'TAMBAH USER'/>
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	category: {
		flex: 1,
		flexDirection: 'row',
		paddingLeft: 10,
		padding:5,
		marginTop: 2.5,
		marginBottom: 2.5,
		borderRadius: 5,
		borderWidth: 0.5,
		borderColor: '#f2c9a0',
		backgroundColor: '#fcecc2'
	},
	stickyBottom: {
		position: 'absolute',
		left: 5,
		right: 5,
		bottom: 5
	}
})

function mapStateToProps (state) {
	return {
		users: state.user.users,
		store: state.user.sotre
	}
}

function mapDispatchToProps (dispatch) {
	return {
		
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ListUsersScreen)