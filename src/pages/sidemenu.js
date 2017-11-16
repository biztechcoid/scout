import React from 'react'
import {
	AsyncStorage,
	Text,
	View,
	Image
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
			<View style={{ backgroundColor:'#353535' }}>
				<View style = {{ height: 40,marginTop:20,marginBottom:20, borderWidth: 0, borderBottomWidth: 0, borderColor: '#f7f7f7',width:'90%',marginLeft:'5%',marginRight:'5%' }}>
                    <View style = {{ flex: 1, alignItems: 'center', justifyContent: 'center',width:'100%'}}>
                        <View  style={{justifyContent: 'center',width:'80%',flex: 1,}}>
                            <Image  style={{flex: 1,width: null,height: null,resizeMode: 'contain'}} source={require('./login/img/logo-500px.png')} />
                        </View>
                    </View>
				</View>
			</View>
			<View>
				{this.props.user ?
					<View style = {{ width:'90%',marginLeft:'5%',marginRight:'5%', marginTop:20 }}>
						<View style = {{ flexDirection: 'row' }}>
							<View>
								<Text> Email </Text>
								<Text> Name </Text>
								<Text> Terakhir Masuk </Text>
							</View>

							<View>
								<Text> : { this.props.user.email } </Text>
								<Text> : { this.props.user.name } </Text>
								<Text> : { date(this.props.user.lastLogin) } </Text>
							</View>
						</View>
					</View>
					:
					null
				}

				<View style = {{ height: 40,marginTop:20, borderWidth: 0, borderBottomWidth: 1, borderColor: '#f7f7f7',width:'90%',marginLeft:'5%',marginRight:'5%' }}>
					<Touchable
						style = {{ justifyContent: 'center' }}
						onPress = { () => this.props.screenProps.navigate('Register', {type: 'Tambah User'}) }>
						<Text> Tambah User </Text>
					</Touchable>
				</View>

				<View style = {{ height: 40, borderWidth: 0, borderBottomWidth: 1, borderColor: '#f7f7f7',width:'90%',marginLeft:'5%',marginRight:'5%' }}>
					<Touchable
						style = {{ justifyContent: 'center' }}
						onPress = { this._logout.bind(this) }>
						<Text> Keluar </Text>
					</Touchable>
				</View>
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