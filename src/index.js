import React from 'react'
import PropsTypes from 'prop-types'
import { connect } from 'react-redux'
import {
	addNavigationHelpers,
	StackNavigator
} from 'react-navigation'

import SplashScreen from './pages/splash'
import LoginScreen from './pages/login'
import HomeManagerScreen from './routes/homeManager'
import HomeAdminScreen from './routes/homeAdmin'
import HomeScreen from './routes/home'
import ScanQRScreen from './pages/scanQR'
import CategoryScreen from './pages/category'
import SearchScreen from './pages/search'


const StackNavigatorConfig = {
	// headerMode: 'none'
}


export const AppNavigator = StackNavigator({
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
	HomeAdmin: {
		screen: HomeAdminScreen,
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
	},
	Search: {
		screen: SearchScreen,
		navigationOptions: {
			header: null,
			headerTintColor: 'white',
			headerStyle: {
				backgroundColor: '#6ecbe0'
			}
		}
	}
}, StackNavigatorConfig)


// module.exports = MobilePos

const AppWithNavigationState = ({ dispatch, nav }) => (
	<AppNavigator navigation = { addNavigationHelpers({ dispatch, state: nav })}/>
)

/*AppWithNavigationState.propsTypes = {
	dispatch: PropsTypes.func.isRequired,
	nav: PropsTypes.object.isRequired
}*/

const mapStateToProps = state => ({
	nav: state.nav
})

export default connect(mapStateToProps)(AppWithNavigationState)