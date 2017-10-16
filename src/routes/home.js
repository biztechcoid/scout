import React from 'react'
import {
	DrawerNavigator,
	StackNavigator,
	TabNavigator
} from 'react-navigation'

import TabInventoryScreen from '../pages/inventory'
import TabSaleScreen from '../pages/sale'
import TabReportScreen from '../pages/report'
import SideMenu from '../pages/sidemenu'


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
			// margin: 0
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
	Inventory: { screen: TabInventoryScreen },
	Sale: { screen: TabSaleScreen },
	Report: { screen: TabReportScreen }
}, TabNavigatorConfig)

const MyApp = DrawerNavigator({
	Home: {
		screen: StackNavigator({
			HomeScreen: {
				screen: TabReportScreen,
				navigationOptions: {
					headerTitle: 'Title',
					headerTintColor: 'white',
					headerStyle: {
						backgroundColor: '#6ecbe0'
					}
				}
			}
		})
	}
}, {
	contentComponent: ({ navigation }) => <SideMenu screenProps = { navigation } />
})

module.exports = MyApp