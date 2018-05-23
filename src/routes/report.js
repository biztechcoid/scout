import React from 'react'
import {
	TabNavigator
} from 'react-navigation'

import TabTransaksiScreen from '../pages/report/transaksi'
import TabPemasukanScreen from '../pages/report/pemasukan'
import TabPengeluaranScreen from '../pages/report/pengeluaran'
import TabLabaRugiScreen from '../pages/report/labaRugi'


const TabNavigatorConfig = {
	tabBarPosition: 'top',
	swipeEnabled: true,
	animationEnabled: true,
	lazy: false,
	tabBarOptions: {
		showIcon: false,
		showLabel: true,
		activeTintColor: '#6ecbe0',
		inactiveTintColor: 'black',
		iconStyle: {
			// margin: 0
		},
		labelStyle: {
			marginLeft: 0,
			marginRight: 0,
			fontSize: 10
		},
		tabSyle: {
			// backgroundColor: '#6ecbe0'
		},
		indicatorStyle: {
			backgroundColor: '#6ecbe0'
		},
		style: {
			backgroundColor: 'white'
		}
	}
}


const HomeScreen = TabNavigator({
	Transaksi: { screen: TabTransaksiScreen },
	Pemasukan: { screen: TabPemasukanScreen },
	Pengeluaran: { screen: TabPengeluaranScreen },
	LabaRugi: {
		screen: TabLabaRugiScreen,
		navigationOptions: {
			tabBarLabel: 'LABA RUGI'
		}
	}
}, TabNavigatorConfig)

module.exports = HomeScreen