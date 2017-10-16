import {
	StackNavigator
} from 'react-navigation'

import SplashScreen from './pages/splash'
import LoginScreen from './pages/login'
import HomeManagerScreen from './routes/homeManager'
import HomeSalesScreen from './routes/homeSales'
import HomeScreen from './routes/home'
import ScanQRScreen from './pages/scanQR'
import CategoryScreen from './pages/category'


const StackNavigatorConfig = {
	// headerMode: 'none'
}


const MobilePos = StackNavigator({
	Splash: {
		screen: SplashScreen,
		navigationOptions: {
			header: null
		}
	},
	Login: {
		screen: LoginScreen,
		navigationOptions: {
			header: null
		}
	},
	HomeManager: {
		screen: HomeManagerScreen,
		navigationOptions: {
			header: null
		}
	},
	HomeSales: {
		screen: HomeSalesScreen,
		navigationOptions: {
			header: null
		}
	},
	Home: {
		screen: HomeScreen,
		navigationOptions: {
			header: null
		}
	},
	ScanQR: {
		screen: ScanQRScreen,
		navigationOptions: {
			header: null
		}
	},
	Category: {
		screen: CategoryScreen,
		navigationOptions: {
			// header: null
			headerTintColor: 'white',
			headerStyle: {
				backgroundColor: '#6ecbe0'
			}
		}
	}
}, StackNavigatorConfig)


module.exports = MobilePos