import React from 'react'
import {
	DrawerNavigator,
	StackNavigator,
	TabNavigator
} from 'react-navigation'

import TabInventoryScreen from '../pages/inventory'
import TabSaleScreen from '../pages/sale'
import TabReportScreen from '../pages/report'
import DashboardScreen from '../pages/dashboard'
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
			marginLeft: 0,
			marginRight: 0
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


/*const HomeScreen = TabNavigator({
	Persediaan: { screen: TabInventoryScreen },
	Penjualan: { screen: TabSaleScreen },
	Laporan: { screen: TabReportScreen }
}, TabNavigatorConfig)*/

exports.DashboardScreen = DrawerNavigator({
	Home: {
		screen: StackNavigator({
			HomeScreen: {
				screen: DashboardScreen,
				navigationOptions: {
					headerTitle: 'Scout',
					headerTintColor: 'white',
					/*headerStyle: {
						backgroundColor: '#6ecbe0'
					}*/
				}
			}
		})
	}
}, {
	contentComponent: ({ navigation }) => <SideMenu screenProps = { navigation } />
})

/*
*
level 2
*
*/
const HomeScreenLevel2 = TabNavigator({
	Persediaan: { screen: TabInventoryScreen },
	Penjualan: { screen: TabSaleScreen },
	Laporan: { screen: TabReportScreen }
}, TabNavigatorConfig)

exports.MyAppLevel2 = DrawerNavigator({
	Home: {
		screen: StackNavigator({
			HomeScreen: {
				screen: HomeScreenLevel2,
				navigationOptions: {
					headerTitle: 'Scout',
					headerTintColor: 'white',
					/*headerStyle: {
						backgroundColor: '#6ecbe0'
					}*/
				}
			}
		})
	}
}, {
	contentComponent: ({ navigation }) => <SideMenu screenProps = { navigation } />
})

/*
*
level 3
*
*/
const HomeScreenLevel3 = TabNavigator({
	Persediaan: { screen: TabInventoryScreen },
	Penjualan: { screen: TabSaleScreen },
	// Laporan: { screen: TabReportScreen }
}, TabNavigatorConfig)

exports.MyAppLevel3 = DrawerNavigator({
	Home: {
		screen: StackNavigator({
			HomeScreen: {
				screen: HomeScreenLevel3,
				navigationOptions: {
					headerTitle: 'Scout',
					headerTintColor: 'white',
					/*headerStyle: {
						backgroundColor: '#6ecbe0'
					}*/
				}
			}
		})
	}
}, {
	contentComponent: ({ navigation }) => <SideMenu screenProps = { navigation } />
})

/*
*
level 4
*
*/
exports.MyAppLevel4 = DrawerNavigator({
	Home: {
		screen: StackNavigator({
			HomeScreen: {
				screen: TabInventoryScreen,
				navigationOptions: {
					headerTitle: 'Scout',
					headerTintColor: 'white',
					/*headerStyle: {
						backgroundColor: '#6ecbe0'
					}*/
				}
			}
		})
	}
}, {
	contentComponent: ({ navigation }) => <SideMenu screenProps = { navigation } />
})

/*
*
level 5
*
*/
exports.MyAppLevel5 = DrawerNavigator({
	Home: {
		screen: StackNavigator({
			HomeScreen: {
				screen: TabSaleScreen,
				navigationOptions: {
					headerTitle: 'Scout',
					headerTintColor: 'white',
					/*headerStyle: {
						backgroundColor: '#6ecbe0'
					}*/
				}
			}
		})
	}
}, {
	contentComponent: ({ navigation }) => <SideMenu screenProps = { navigation } />
})

/*
*
level 6
*
*/
exports.MyAppLevel6 = DrawerNavigator({
	Home: {
		screen: StackNavigator({
			HomeScreen: {
				screen: TabReportScreen,
				navigationOptions: {
					headerTitle: 'Scout',
					headerTintColor: 'white',
					/*headerStyle: {
						backgroundColor: '#6ecbe0'
					}*/
				}
			}
		})
	}
}, {
	contentComponent: ({ navigation }) => <SideMenu screenProps = { navigation } />
})

/*
*
level 8
*
*/
const HomeScreenLevel8 = TabNavigator({
	Persediaan: { screen: TabInventoryScreen },
	// Penjualan: { screen: TabSaleScreen },
	Laporan: { screen: TabReportScreen }
}, TabNavigatorConfig)

exports.MyAppLevel8 = DrawerNavigator({
	Home: {
		screen: StackNavigator({
			HomeScreen: {
				screen: HomeScreenLevel8,
				navigationOptions: {
					headerTitle: 'Scout',
					headerTintColor: 'white',
					/*headerStyle: {
						backgroundColor: '#6ecbe0'
					}*/
				}
			}
		})
	}
}, {
	contentComponent: ({ navigation }) => <SideMenu screenProps = { navigation } />
})

/*
*
level 10
*
*/
const HomeScreenLevel10 = TabNavigator({
	// Persediaan: { screen: TabInventoryScreen },
	Penjualan: { screen: TabSaleScreen },
	Laporan: { screen: TabReportScreen }
}, TabNavigatorConfig)

exports.MyAppLevel10 = DrawerNavigator({
	Home: {
		screen: StackNavigator({
			HomeScreen: {
				screen: HomeScreenLevel10,
				navigationOptions: {
					headerTitle: 'Scout',
					headerTintColor: 'white',
					/*headerStyle: {
						backgroundColor: '#6ecbe0'
					}*/
				}
			}
		})
	}
}, {
	contentComponent: ({ navigation }) => <SideMenu screenProps = { navigation } />
})

// module.exports = MyApp