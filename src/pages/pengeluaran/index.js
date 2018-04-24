import React from 'react'
import {
	ScrollView,
	StyleSheet,
	View,
	Text,
	TextInput
} from 'react-native'

import {
	Button,
	Online
} from '../../components'


class Pengeluaran extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		headerStyle: {
			backgroundColor: '#6ecbe0'
		},
		/*headerLeft: (
			<ButtonIcons
				onPress={() => {navigation.navigate('DrawerOpen')}}
				name='md-menu'
				color='white'
				size={30}/>
		),*/
		headerRight: (
			<Online/>
		)
	})

	state = {
		beban: '',
		bebanUpah: '',
		bebanSewa: '',
		bebanListrik: '',
		bebanPromosi: '',
		bebanLain: ''
	}

	render() {
		return (
			<View style={{flex: 1, backgroundColor: 'white'}}>
				<ScrollView
					overScrollMode = {'always'}
					style = {{ flex: 3 }}
					keyboardShouldPersistTaps = 'always'>
					<View style = {{ flexDirection: 'row' }}>
						<View style = {{ flexDirection: 'column' }}>
							<View style = {{ height: 50, justifyContent: 'center' }}>
								<Text> Beban Upah/Gaji </Text>
							</View>
							<View style = {{ height: 50, justifyContent: 'center' }}>
								<Text> Beban Sewa Lokasi </Text>
							</View>
							<View style = {{ height: 50, justifyContent: 'center' }}>
								<Text> Beban Listrik, Air, Gas </Text>
							</View>
							<View style = {{ height: 50, justifyContent: 'center' }}>
								<Text> Beban Promosi </Text>
							</View>
							<View style = {{ height: 50, justifyContent: 'center' }}>
								<Text> Beban Lain-lain </Text>
							</View>
						</View>

						<View style = {{ flex: 1, flexDirection: 'column' }}>
							<View style = {{ flexDirection: 'row' }}>
								<View style = {{ height: 50, justifyContent: 'center' }}>
									<Text> : </Text>
								</View>
								
								<TextInput
									ref = { (c) => this._bebanUpah = c }
									style = {{ flex: 1, height: 50 }}
									keyboardType = 'numeric'
									underlineColorAndroid = '#ececec'
									returnKeyType = 'next'
									onChangeText = { (text) => this.setState({ bebanUpah: text })}
									onSubmitEditing = { () => this._bebanSewa.focus() }
									value = { this.state.bebanUpah }/>
							</View>

							<View style = {{ flexDirection: 'row' }}>
								<View style = {{ height: 50, justifyContent: 'center' }}>
									<Text> : </Text>
								</View>
								
								<TextInput
									ref = { (c) => this._bebanSewa = c }
									style = {{ flex: 1, height: 50 }}
									keyboardType = 'numeric'
									underlineColorAndroid = '#ececec'
									returnKeyType = 'next'
									onChangeText = { (text) => this.setState({ bebanSewa: text })}
									onSubmitEditing = { () => this._bebanListrik.focus() }
									value = { this.state.bebanSewa }/>
							</View>

							<View style = {{ flexDirection: 'row' }}>
								<View style = {{ height: 50, justifyContent: 'center' }}>
									<Text> : </Text>
								</View>
								
								<TextInput
									ref = { (c) => this._bebanListrik = c }
									style = {{ flex: 1, height: 50 }}
									keyboardType = 'numeric'
									underlineColorAndroid = '#ececec'
									returnKeyType = 'next'
									onChangeText = { (text) => this.setState({ bebanListrik: text })}
									onSubmitEditing = { () => this._bebanPromosi.focus() }
									value = { this.state.bebanListrik }/>
							</View>

							<View style = {{ flexDirection: 'row' }}>
								<View style = {{ height: 50, justifyContent: 'center' }}>
									<Text> : </Text>
								</View>
								
								<TextInput
									ref = { (c) => this._bebanPromosi = c }
									style = {{ flex: 1, height: 50 }}
									keyboardType = 'numeric'
									underlineColorAndroid = '#ececec'
									returnKeyType = 'next'
									onChangeText = { (text) => this.setState({ bebanPromosi: text })}
									onSubmitEditing = { () => this._bebanLain.focus() }
									value = { this.state.bebanPromosi }/>
							</View>

							<View style = {{ flexDirection: 'row' }}>
								<View style = {{ height: 50, justifyContent: 'center' }}>
									<Text> : </Text>
								</View>
								
								<TextInput
									ref = { (c) => this._bebanLain = c }
									style = {{ flex: 1, height: 50 }}
									keyboardType = 'numeric'
									underlineColorAndroid = '#ececec'
									returnKeyType = 'done'
									onChangeText = { (text) => this.setState({ bebanLain: text })}
									onSubmitEditing = {() => {}}
									value = { this.state.bebanLain }/>
							</View>
						</View>
					</View>
				</ScrollView>

				<View style={styles.stickyBottom}>
					<View style={{flexDirection: 'row'}}>
						<View style={{flex: 1, margin: 5}}>
							<Text style={{fontWeight: 'bold'}}>TOTAL</Text>
						</View>

						<View style={{flex: 1, margin: 5, alignItems: 'flex-end'}}>
							<Text style={{fontWeight: 'bold'}}>{
								Number(this.state.bebanUpah) + Number(this.state.bebanSewa) +
								Number(this.state.bebanListrik) + Number(this.state.bebanPromosi) +
								Number(this.state.bebanLain)
							}</Text>
						</View>
					</View>

					<View style={{flexDirection: 'row'}}>
						<Button
							onPress={() => {}}
							name='SIMPAN'/>

						<Text>&nbsp;</Text>

						<Button
							onPress = {() => {}}
							name = 'UBAH'/>
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	stickyBottom: {
		flex: 1,
		position: 'absolute',
		left: 5,
		right: 5,
		bottom: 5
	}
})

module.exports = Pengeluaran